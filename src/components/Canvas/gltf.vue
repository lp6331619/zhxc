<template>
    <div class="title">
        <div
            :id="id"
            :ref="id"
            class="three"
        ></div>
    </div>
</template>
<script>
import * as THREE from 'three'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlagCtrl } from '@/public/js/flagctrl'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default {
    name: 'Title',
    props: {
        row: {
            type: Object,
            default: () => {
                return {}
            }
        },
        id: {
            type: String,
            default: 'three'
        }
    },
    data() {
        return {
            // 场景构建
            camera: undefined,
            scene: undefined,
            renderer: undefined,
            controls: undefined,
            objects: [],
            dragControls: undefined,
            container: undefined,
            mouse: undefined,
            transformControl: undefined,
            light: undefined,
            raycaster: undefined,
            INTERSECTED: undefined,
            radius: 100,
            theta: 0,
            flagCtrl: undefined,
            listMesh: [],
            composer: undefined,
            effectFXAA: undefined,
            objs: []
        }
    },
    computed: {
    },
    mounted() {
        this.container = document.getElementById(this.id)
        this.init(this.row)
        this.UpdateRender()
    },
    beforeDestroy() {
    },
    methods: {
        init(e) {
            // 场景
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera(
                45,
                this.container.offsetWidth / this.container.offsetHeight,
                0.1,
                100000000
            )
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.raycaster = new THREE.Raycaster()
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
            this.composer = new EffectComposer(this.renderer)
            var renderPass = new RenderPass(this.scene, this.camera)
            this.composer.addPass(renderPass)
            this.renderer.setClearColor(0x000000, 1)
            this.container.appendChild(this.renderer.domElement)
            this.flagCtrl = new FlagCtrl(this.scene, this.camera, (uuid) => {
                // 删除回调
                const mesh = this.getMeshByUUID(uuid)
                console.log('删除回调')
                console.log(mesh)
            }, (uuid) => {
                // 编辑回调
                const mesh = this.getMeshByUUID(uuid)
                console.log('编辑回调')
                console.log(mesh)
            }, this.id)
            this.ambientLight()
            this.initControls()
            this.initStats()
            this.add(e)
        },
        /* *
        * 初始化灯光
        * */
        ambientLight() {
            const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6)
            this.scene.add(ambientLight)
            const a = 1
            const b = 0.6
            const c = 10
            const directionalLight1 = new THREE.DirectionalLight(0xffffff, b)
            directionalLight1.position.set(-a, -a, a * c).normalize()
            const directionalLight2 = new THREE.DirectionalLight(0xffffff, b)
            directionalLight2.position.set(a, -a, -a * c).normalize()
            const directionalLight3 = new THREE.DirectionalLight(0xffffff, b)
            directionalLight3.position.set(-a, a, -a * c).normalize()
            const directionalLight4 = new THREE.DirectionalLight(0xffffff, b)
            directionalLight4.position.set(a, a, a * c).normalize()
            this.scene.add(directionalLight1)
            this.scene.add(directionalLight2)
            this.scene.add(directionalLight3)
            this.scene.add(directionalLight4)
        },
        /* *
        * 初始化性能检测插件
        * */
        initStats() {
            this.stats = new Stats()
            this.stats.dom.style.position = 'absolute'
            this.stats.dom.style.left = '0px'
            this.stats.dom.style.top = '0px'
            this.container.appendChild(this.stats.dom)
        },
        /* *
        * 用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
        * */
        initControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement) // , this.renderer.domElement
            // 如果使用animate方法时，将此函数删除
            // this.controls.addEventListener('change', this.render)
            // 使动画循环使用时阻尼或自转 意思是否有惯性
            this.controls.enableDamping = true
            // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
            // controls.dampingFactor = 0.25;
            // 是否可以缩放
            this.controls.enableZoom = true
            // 是否自动旋转
            this.controls.autoRotate = false
            // 设置相机距离原点的最近距离
            this.controls.minDistance = 1
            // 设置相机距离原点的最远距离
            this.controls.maxDistance = 1000
            // 是否开启右键拖拽
            this.controls.enablePan = true
        },
        add(e) {
            const gltfLoader = new GLTFLoader()
            gltfLoader.load('http://127.0.0.1:5500/src/assets/zpt.gltf', (gltf) => {
                this.scene.add(gltf.scene)
                // gltf.scene.traverse((item) => {
                //     // 获取中心点位置
                //     const boxSize = this.GetGroupSize(item)
                //     const centerPos = new THREE.Vector3((boxSize.max.x + boxSize.min.x) / 2, (boxSize.max.y + boxSize.min.y) / 2, (boxSize.max.z + boxSize.min.z) / 2)

                //     // 添加标签
                //     this.flagCtrl.addTipsFlag(item.uuid, centerPos)
                //     this.listMesh.push(item)
                //     this.objs = []
                //     this.objs.push(item)
                //     const c = this.getRandomColor()
                //     const outlinePass = new THREE.OutlinePass(new THREE.Vector2(this.container.offsetWidth, this.container.offsetHeight), this.scene, this.camera)
                //     this.composer.addPass(outlinePass)
                //     // /*outlinePass.edgeStrength = 2
                //     // outlinePass.edgeGlow = 0
                //     // outlinePass.edgeThickness = 1
                //     // outlinePass.pulsePeriod = 0*/
                //     outlinePass.visibleEdgeColor.set(c)
                //     outlinePass.selectedObjects = this.objs
                // })
                // this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
                // this.effectFXAA.uniforms['resolution'].value.set(1 / this.container.offsetWidth, 1 / this.container.offsetHeight)
                // this.effectFXAA.renderToScreen = true
                // this.composer.addPass(this.effectFXAA)
            })
        },
        /**
         * @name: 返回坐标系
         * @param {*} x
         * @param {*} y
         *  * @param {*} z
         * @param {*} matrixWorld
         * @return {*}
         */
        backPosition(x, y, z, matrixWorld) {
            const centroid = new THREE.Vector3(x, y, z)
            // centroid.addVectors()
            centroid.multiplyScalar(1)
            centroid.applyMatrix4(matrixWorld)
            return centroid
        },
        // 改变屏幕
        onWindowResize() {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
            this.composer.setSize(this.container.offsetWidth, this.container.offsetHeight)
        },
        // 帧循环
        UpdateRender() {
            this.controls.update()
            // this.flagCtrl.update()
            this.stats.update()
            this.composer.render()
            requestAnimationFrame(this.UpdateRender)
        },
        /**
         * @name: 父组件添加点
         * @param {*}
         * @return {*}
         */
        addDIan(e) {
            e.children.forEach(item => {
                this.addb(item)
            })
        },
        addb(item) {
            // 获取中心点位置
            // const boxSize = this.GetGroupSize(item)
            // const centerPos = new THREE.Vector3((boxSize.max.x + boxSize.min.x) / 2, (boxSize.max.y + boxSize.min.y) / 2, (boxSize.max.z + boxSize.min.z) / 2)
            // // 添加标签
            // this.flagCtrl.addTipsFlag(item.uuid, centerPos)
            // this.listMesh.push(item)
        },
        // 获取包围盒大小
        GetGroupSize(obj) {
            var box = new THREE.Box3()
            box.expandByObject(obj)
            return box
        },
        // 返回随机颜色
        getRandomColor() {
            var color = '#'
            // for循环中，如果后面仅有一条语句，{}可省略不写
            // 随机生成6位0-15之间的数字，再用toString(16)将数字转成16进制
            for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16).toString(16)
            return color
        },
        // 获取mesh
        getMeshByUUID(uuid) {
            for (let i = 0; i < this.listMesh.length; i++) {
                if (this.listMesh[i].uuid === uuid) {
                    return this.listMesh[i]
                }
            }
        },
        // 获取日期
        GetDateDiff(valueTime) {
            var endDate = this.getNowFormatDate()
            var startTime = new Date(Date.parse(valueTime.replace(/-/g, '/'))).getTime()
            var endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime()
            var dates = ((startTime - endTime)) / (1000 * 60 * 60 * 24)
            return dates
        },
        getNowFormatDate() {
            var date = new Date()
            var seperator1 = '/'
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var strDate = date.getDate()
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate
            return currentdate
        }
    }
}
</script>

<style lang="scss" scoped>
.three {
    position: relative;
    width: 100%;
    height: 600px;
    margin-bottom: 40px;
    overflow: hidden;
}
</style>
