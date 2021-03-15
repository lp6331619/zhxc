<template>
    <div class="box">
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
            :siteid="siteid"
            :partition_type="partition_type"
            @emitOut="emitOut"
        />
    </div>
</template>
<script>
import * as THREE from 'three'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
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
        },
        siteid: { // 站点 id
            type: Number,
            default: null
        },
        partition_type: { // 区名
            type: String,
            default: null
        },
        status: {  // 能不能点击显示名字
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        realdata: {
            type: Array,
            default: () => {
                return []
            }
        },
        detail: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 摄像机位置
        cameraposition: {
            type: Object,
            default: () => {
                return {
                    x: 0,
                    y: 20,
                    z: 0
                }
            }
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
            objs: [],
            temporary: [], // 临时点
            outlinePass: undefined,
            //test------------
            animationFrameId:null,
            renderEnabled:true,
            timeOut : null
        }
    },
    computed: {
    },
    mounted() {
        this.container = document.getElementById(this.id)
        this.init(this.row)

    },
    beforeDestroy() {
        // cancelAnimationFrame(this.UpdateRender)
        /* //删除掉所有的模型组内的mesh
        var group = this.scene.children[5]
        group.traverse(function (item) {
            if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); //删除几何体
                item.material.dispose(); //删除材质
            }
        });
        this.scene.remove(group); */
        this.closeAnimation()
    },
    methods: {
        closeAnimation(){
          this.flagCtrl.deleteRadio()
          cancelAnimationFrame(this.animationFrameId)
          this.renderer.domElement.addEventListener('dblclick',null,false); //删除侦听器来渲染
           this.scene = null
           this.camera = null
           this.flagCtrl = null
           this.composer = null
           this.controls = null
           this.empty(this.container)
        },
        empty(elem){
          while(elem.lastChild)elem.removeChild(elem.lastChild)
        },
        init(e) {
            // 场景
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera(
                45,
                this.container.offsetWidth / this.container.offsetHeight,
                0.1,
                100000000
            )
            this.camera.position.set(this.cameraposition.x, this.cameraposition.y, this.cameraposition.z)
            this.mouse = new THREE.Vector2()
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.raycaster = new THREE.Raycaster()
            this.group = new THREE.Group()
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
            this.composer = new EffectComposer(this.renderer)
            var renderPass = new RenderPass(this.scene, this.camera)
            this.composer.addPass(renderPass)
            this.renderer.setClearColor(0xffffff, 0.2)
            this.container.appendChild(this.renderer.domElement)
            this.outlinePass = new OutlinePass(new THREE.Vector2(this.container.offsetWidth, this.container.offsetHeight), this.scene, this.camera)
            this.composer.addPass(this.outlinePass)
            this.flagCtrl = new FlagCtrl(this.scene, this.camera, (uuid) => {
                // 删除回调
                const mesh = this.getMeshByUUID(uuid)
                if (mesh.length) {
                    const del = this.returnItem(mesh[0])
                    console.log(mesh, del)
                    console.log('删除回调')
                    this.$emit('delpointlist', { name: del.mesh_name })
                }
            }, (uuid) => {
                // 编辑回调
                const mesh = this.getMeshByUUID(uuid)
                console.log('编辑回调')
                console.log(mesh, this.pointlist, 999)
                if (mesh.length > 0) {
                    this.pointDetail = this.returnItem(mesh[0])
                    console.log(this.pointDetail, 'pointDetail')
                    this.formdianStatus = true
                    this.scenece = 'update'
                }
            }, this.id, this.type, this.detail, this.status)
            this.ambientLight()
            this.initControls()
            // this.initStats()
            //用detail.unique_code判断类型
            var model_type = this.detail.unique_code == '' ? 'device' : 'mdevice'
            this.add(e, model_type)
            this.container.addEventListener('click', this.onMouseClick, false)
            this.container.addEventListener('touchstart', this.onMouseClick, false)
            window.addEventListener('resize', this.onWindowResize, false)
            this.controls.addEventListener('change', this.changeControls);
            this.UpdateRender()

        },
        //模型移动缩放等变化时候的回调
        changeControls(e){
          // this.timeRender()
          this.flagCtrl.update() //弹窗窗口更新
        },
        /**
         * @name: 清空
         * @param {*}
         * @return {*}
         */
        clear(e) {
            this.flagCtrl.deleteRadio()
        },
        /**
         * @name: 返回当前数据
         * @param {*} mesh
         * @return {*}
         */
        returnItem(mesh) {
            return this.pointlist.filter(item => item.mesh_name === mesh.name)[0]
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
            this.stats.dom.style.bottom = '0px'
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
            this.controls.dampingFactor = 0.25
            // 是否可以缩放
            this.controls.enableZoom = true
            // 是否自动旋转
            this.controls.autoRotate = false
            // 设置相机距离原点的最近距离
            this.controls.minDistance = 1
            // 设置相机距离原点的最远距离
            this.controls.maxDistance = 100000
            // 是否开启右键拖拽
            this.controls.enablePan = true
        },
        add(e, model_type) {
            // console.log(e, 'add(e)')
            const gltfLoader = new GLTFLoader()
            // const gltf = 'http://127.0.0.1:5500/src/assets/suofang1.gltf'
            const gltf = process.env.VUE_APP_BASE_URL + e.file
            var dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('/js/libs/draco/gltf/')
            gltfLoader.setDRACOLoader(dracoLoader)
            gltfLoader.load(gltf, (object) => {
                // console.log(object, '返回的 gltf')
                const b = object.scene.children.filter(item => item.type !== 'Object3D' && item.name !== 'Scene')
                object.scene.children = b
                this.scene.add(object.scene)
                // this.timeRender()
                this.$emit('canvasBack', object.scene, model_type)
            })

            /* const loader = new GLTFLoader(),
                 path = process.env.VUE_APP_BASE_URL + e.file
             DRACOLoader.setDecoderPath('/js/libs/draco/gltf/') // 设置解压库文件路径
             var dracoLoader = new DRACOLoader()
             loader.setDRACOLoader(dracoLoader)
             loader.setDDSLoader(new DDSLoader());
             loader.load(
                 path,
                 (gltf) => {
                     // called when the resource is loaded
                     this.scene.add(gltf.scene)
                     this.$emit('canvasBack', gltf.scene)
                 },
                 (xhr) => {
                     // called while loading is progressing
                     console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
                 },
                 (error) => {
                     // called when loading has errors
                     console.error('An error happened', error)
                 },
             ) */
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
            // this.effectFXAA && this.effectFXAA.uniforms && this.effectFXAA.uniforms['resolution'].value.set(1 / this.container.offsetWidth, 1 / this.container.offsetHeight)

        },
        timeRender() {
        	//设置为可渲染状态
            this.renderEnabled = true;
            //清除上次的延迟器
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.timeOut = setTimeout(function () {
                this.renderEnabled = false;
                console.log(this.renderEnabled,'this.renderEnabled3')
            }, 3000);
            console.log(this.renderEnabled,'this.renderEnabled2')
        },
        // 帧循环
        UpdateRender() {
            this.controls.update()
            // this.flagCtrl.update() //弹窗窗口更新
            // this.stats.update() //性能检测窗口
            /* if (this.renderEnabled) {
                console.log(this.renderEnabled,'this.renderEnabled---')
                this.composer.render()
            } */

            this.composer.render()
            this.animationFrameId = requestAnimationFrame(this.UpdateRender)
        },
        /**
         * @name: 获取摄像机
         * @param {*}
         * @return {*}
         */
        returnCamera() {
            return this.camera.position
        },
        /**
         * @name: 父组件添加点
         * @param {*}
         * add_type:pointFlag（加编辑/删除点）realdata(定时数据)
         * @return {*}
         */
        addDIan(e, pointlist, add_type) {
            this.pointlist = pointlist
            setTimeout(() => {
                e.forEach(item => {
                    this.addb(item, false, add_type)
                })
                this.effectFXAA = new ShaderPass(FXAAShader)
                this.effectFXAA.uniforms && this.effectFXAA.uniforms['resolution'].value.set(1 / this.container.offsetWidth, 1 / this.container.offsetHeight)
                // this.effectFXAA.renderToScreen = true
                // this.composer.addPass(this.effectFXAA)
                // console.log( this.composer,' this.composer')
            }, 300)
        },
        addb(item, temporary, add_type) {
            // if (item.isMesh) {
            // 获取中心点位置
            const boxSize = this.GetGroupSize(item)
            const centerPos = new THREE.Vector3((boxSize.max.x + boxSize.min.x) / 2, (boxSize.max.y + boxSize.min.y) / 2, (boxSize.max.z + boxSize.min.z) / 2)
            // 添加标签
            this.flagCtrl.addTipsFlag(item, centerPos, temporary, this.returnItem(item), this.realdata, add_type)
            this.listMesh.push(item)
            if (temporary) { // 点击过来的
                this.temporary = []
                this.temporary.push(item)
            } else {
                this.objs.push(item)
            }
            this.outlinePass.edgeStrength = 20
            // this.outlinePass.edgeGlow = 3
            // outlinePass.edgeThickness = 3
            // outlinePass.pulsePeriod = 0
            // outlinePass.hiddenEdgeColor.set('#fff')
            this.outlinePass.visibleEdgeColor.set('#20bcfc')
            const arr = this.objs.concat(this.temporary)
            this.outlinePass.selectedObjects = arr
        },
        onMouseClick(e) {
            // 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
            this.mouse.x = (e.layerX / this.container.offsetWidth) * 2 - 1
            this.mouse.y = -(e.layerY / this.container.offsetHeight) * 2 + 1
            this.raycaster.setFromCamera(this.mouse, this.camera)
            var intersects = this.raycaster.intersectObjects([this.scene], true)
            if (intersects.length > 0) {
                var selectedObject = intersects[0].object
                this.addb(selectedObject, true)
            }
            // "416A7960-4BFC-497A-8ABB-51FF5F2E49AA"
            // 新建一个三维单位向量 假设z方向就是0.5 "6007D415-A9A0-41EC-925B-2430DEE0C6B3"  "6007D415-A9A0-41EC-925B-2430DEE0C6B3" "6007D415-A9A0-41EC-925B-2430DEE0C6B3"
            // 根据照相机，把这个向量转换到视点坐标系
            // const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5).unproject(this.camera)
            // // 在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
            // const raycaster = new THREE.Raycaster(
            //     this.camera.position,
            //     vector.sub(this.camera.position).normalize()
            // )
            // // 射线和模型求交，选中一系列直线
            // if (this.scene && this.scene.children) {
            //     const intersects = raycaster.intersectObjects(this.scene.children[5].children)
            //     if (intersects && intersects.length > 0) {
            //         // 选中第一个射线相交的物体
            //         const intersected = intersects[0].object
            //         // intersected.material.color.set('#ff0000')
            //         this.addb(intersected, true)
            //     }
            // }
        },
        // checkIntersection() {
        //     this.raycaster.setFromCamera(this.mouse, this.camera)
        //     var intersects = this.raycaster.intersectObjects([this.scene], true)
        //     if (intersects.length > 0) {
        //         var selectedObject = intersects[0].object
        //         addSelectedObject(selectedObject)
        //         outlinePass.selectedObjects = selectedObjects
        //     } else {
        //         // outlinePass.selectedObjects = [];
        //     }
        // },
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
        // getRandomColor() {
        //     var color = '#'
        //     // for循环中，如果后面仅有一条语句，{}可省略不写
        //     // 随机生成6位0-15之间的数字，再用toString(16)将数字转成16进制
        //     for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16).toString(16)
        //     return color
        // },
        // 获取mesh
        getMeshByUUID(uuid) {
            return this.listMesh.filter(item => item.uuid === uuid)
        },
        emitOut(e, data) {
          console.log(data,'canvas_emitOut')
            this.formdianStatus = false
            data && this.$emit('canvaspointlist', data)
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
}
.three {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
    overflow: hidden;
}
</style>
