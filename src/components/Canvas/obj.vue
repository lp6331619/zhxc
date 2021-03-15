<template>
    <div class="title">
        <div
            :id="id"
            :ref="id"
            class="three"
        ></div>
        <formdian
            v-if="formdianStatus"
            :status="formdianStatus"
            :scene="scenece"
            :point="pointDetail"
            @emitOut="emitOut"
        />
    </div>
</template>
<script>
import * as THREE from 'three'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlagCtrl } from '@/public/js/flagctrl'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import formdian from '@/views/event/equipment/dialog/formDian'
export default {
    name: 'Title',
    components: {
        formdian
    },
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
            formdianStatus: false,
            scenece: 'create',
            pointlist: [],
            pointDetail: {},
            // 场景构建
            camera: undefined,
            scene: undefined,
            renderer: undefined,
            controls: undefined,
            objects: [],
            group: undefined,
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
            this.mouse = new THREE.Vector2()
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.raycaster = new THREE.Raycaster()
            this.group = new THREE.Group()
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
                this.pointDetail = this.pointlist.filter(item => item.mesh_id === mesh.id)

            }, this.id)
            this.ambientLight()
            this.initControls()
            this.initStats()
            this.add(e)
            this.container.addEventListener('click', this.onMouseClick, false)
            this.container.addEventListener('touchstart', this.onMouseClick, false)
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
            const objLoader = new OBJLoader()
            const mtlLoader = new MTLLoader()
            // const mtl = process.env.VUE_APP_BASE_URL + e['mtl'].file
            // const obj = process.env.VUE_APP_BASE_URL + e['obj'].file
            const mtl = 'http://127.0.0.1:5500/src/assets/star-wars-vader-tie-fighter.mtl'
            const obj = 'http://127.0.0.1:5500/src/assets/star-wars-vader-tie-fighter.obj'
            // const mtl = 'http://127.0.0.1:5500/src/assets/obj/suofang1.mtl'
            // const obj = 'http://127.0.0.1:5500/src/assets/obj/suofang1.obj'
            mtlLoader.load(mtl, (materials) => {
                materials.preload()
                objLoader.setMaterials(materials)
                objLoader.load(obj, (object) => {
                    // this.group.add(object)
                    this.scene.add(object)
                    this.$emit('canvasBack', object)
                })
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
            this.effectFXAA.uniforms && this.effectFXAA.uniforms['resolution'].value.set(1 / this.container.offsetWidth, 1 / this.container.offsetHeight)
        },
        // 帧循环
        UpdateRender() {
            this.controls.update()
            this.flagCtrl.update()
            this.stats.update()
            this.composer.render()
            requestAnimationFrame(this.UpdateRender)
        },
        /**
         * @name: 父组件添加点
         * @param {*}
         * @return {*}
         */
        addDIan(e, pointlist) {
            e.forEach(item => {
                this.addb(item)
            })
            this.pointlist = pointlist
            this.effectFXAA = new ShaderPass(FXAAShader)
            this.effectFXAA.uniforms && this.effectFXAA.uniforms['resolution'].value.set(1 / this.container.offsetWidth, 1 / this.container.offsetHeight)
            this.effectFXAA.renderToScreen = true
            this.composer.addPass(this.effectFXAA)
        },
        addb(item) {
            // if (item.isMesh) {
            // 获取中心点位置
            const boxSize = this.GetGroupSize(item)
            const centerPos = new THREE.Vector3((boxSize.max.x + boxSize.min.x) / 2, (boxSize.max.y + boxSize.min.y) / 2, (boxSize.max.z + boxSize.min.z) / 2)
            // 添加标签
            this.flagCtrl.addTipsFlag(item.uuid, centerPos)
            this.listMesh.push(item)
            this.objs = []
            this.objs.push(item)
            const c = this.getRandomColor()
            const outlinePass = new OutlinePass(new THREE.Vector2(this.container.offsetWidth, this.container.offsetHeight), this.scene, this.camera)
            this.composer.addPass(outlinePass)
            outlinePass.edgeStrength = 10
            // outlinePass.edgeGlow = 3
            // outlinePass.edgeThickness = 3
            // outlinePass.pulsePeriod = 0
            outlinePass.visibleEdgeColor.set(c)
            // outlinePass.hiddenEdgeColor.set('#ffffff')
            outlinePass.selectedObjects = this.objs
        },
        onMouseClick(e) {
            // 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
            this.mouse.x = (e.clientX / this.container.offsetWidth) * 2 - 1
            this.mouse.y = -(e.clientY / this.container.offsetHeight) * 2 + 1
            // 新建一个三维单位向量 假设z方向就是0.5
            // 根据照相机，把这个向量转换到视点坐标系
            const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5).unproject(this.camera)
            // 在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
            const raycaster = new THREE.Raycaster(
                this.camera.position,
                vector.sub(this.camera.position).normalize()
            )
            // 射线和模型求交，选中一系列直线
            if (this.scene && this.scene.children) {
                const intersects = raycaster.intersectObjects(this.scene.children[5].children)
                if (intersects && intersects.length > 0) {
                    // 选中第一个射线相交的物体
                    const intersected = intersects[0].object
                    // intersected.material.color.set('#ff0000')
                    console.log(intersected)
                    this.addDIan([intersected])
                }
            }
        },
        /**
         * @name: 获取位置
         * @param {*} min
         * @param {*} max
         * @param {*} matrixWorld
         * @return {*}
         */
        getPosition(min, max, matrixWorld) {
            var centroid = new THREE.Vector3()
            centroid.addVectors(min, max)
            centroid.multiplyScalar(0.5)
            centroid.applyMatrix4(matrixWorld)
            return centroid
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
            return this.listMesh.filter(item => item.uuid === uuid)
        },
        emitOut(e) {

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
