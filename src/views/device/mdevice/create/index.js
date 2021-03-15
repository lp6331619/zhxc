/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 15:59:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-19 11:58:53
 */
import { getDeviceShow, getEquipmentSaveEdit, selectPartitionType,getTotalDevice } from '@/api/device'
import upload from '../dialog/upload.vue'
import formDia from '../dialog/form.vue'
import { Canvas } from '@/components'
import AMap from 'AMap'
export default {
    components: {
        upload,
        Canvas,
        formDia
    },
    data() {
        return {
            data: undefined, // 列表数据
            loading: false,
            prepare: {},
            disabled: false,
            fileName: '',
            form: {
                contorl_name: '',
                partition_type: '',
                is_back: 1,
                back_img: '',
                unique_code: null,
                longitude: '', // 经度
                latitude: '', // 维度
                start_code: '',
                end_code: '',
                is_var: 1,
                // partition: '',
                back_mtl: '',
                point_list: [],
                receive_id:null,
                remark:''
            },
            formRules: {
                contorl_name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                partition_type: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                unique_code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                start_code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                end_code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                longitude: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                latitude: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                is_back: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                back_img: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                back_mtl: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            statusType: 'create',
            upLoadStatus: false,
            formStatus: false,
            type: '',
            file: {},
            mesh: undefined,
            point_list: {},
            // 地图相关
            address: '',
            tips: [],
            map: undefined,
            geocoder: undefined,
            marker: undefined,
            camera: undefined
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    created() {
        this.getPrepare()
        if (this.id !== 'undefined') {
            this.getDetail()
        } else {
            this.mapInit()
        }
    },
    mounted() {
    },
    methods: {
        // 获取数据
        async getDetail() {
            this.loading = true
            const res = await getDeviceShow({ id: this.id })
            if (res.code === 1) {
                this.data = res.data
                const form_data = this.data.form_data
                this.form = {
                    contorl_name: form_data.contorl_name,
                    partition_type: form_data.partition_type,
                    is_back: form_data.is_back,
                    back_img: form_data.back_img,
                    unique_code: form_data.unique_code,
                    start_code: form_data.start_code,
                    latitude: form_data.latitude,
                    longitude: form_data.longitude,
                    end_code: form_data.end_code,
                    is_var: form_data.is_var,
                    // partition: form_data.partition_type,
                    cid: form_data.cid,
                    id: form_data.id,
                    back_mtl: form_data.back_mtl,
                    receive_id: form_data.receive_id,
                    point_list: this.data.point_list,
                    remark: form_data.remark
                }

                this.camera = {
                    x: form_data.camera_x && Number(form_data.camera_x),
                    y: form_data.camera_y && Number(form_data.camera_y),
                    z: form_data.camera_z && Number(form_data.camera_z)
                }
                if (this.form.back_img) {
                    this.init({
                        file: this.form.back_img
                    })
                }
                this.mapInit()
            }
            this.loading = false
        },
        mapInit() {
            // 地图
            this.$nextTick(() => {
                this.map = new AMap.Map('map', {
                    // center: [this.form.longitude || null, this.form.latitude || null],
                    rotateEnable: true,
                    zoom: 14
                })
                const _this = this
                // 为地图注册click事件获取鼠标点击出的经纬度坐标
                this.map.on('click', function (e) {
                    const lng = e.lnglat.getLng()
                    const lat = e.lnglat.getLat()
                    _this.form.longitude = lng
                    _this.form.latitude = lat
                    _this.address = lng + ',' + lat
                    _this.regeoCode([lng, lat])
                })
                this.remoteMethod(' ')
                if (this.id !== 'undefined') {
                    _this.geocoder = new AMap.Geocoder({})
                    _this.geocoder.getAddress([this.form.longitude, this.form.latitude], function (status, result) {
                        if (result.info === 'OK') {
                            var address = result.regeocode.formattedAddress
                            _this.tips.push({
                                address: address,
                                value: _this.address
                            })
                        }
                    })
                    this.regeoCode([this.form.longitude, this.form.latitude])
                }
            })
        },
        // 搜索
        regeoCode(lnglat) {
            if (!this.geocoder) {
                this.geocoder = new AMap.Geocoder({
                    city: '010', // 城市设为北京，默认：“全国”
                    radius: 1000 // 范围，默认：500
                })
            }
            if (!this.marker) {
                this.marker = new AMap.Marker()
                this.map.add(this.marker)
            }
            this.marker.setPosition(lnglat)
            this.map.setCenter(lnglat)
        },
        // 地址
        handleSelect(e) {
            const l = e.split(',')
            this.form.longitude = l[0]
            this.form.latitude = l[1]
            this.regeoCode(l)
        },
        // 搜索
        remoteMethod(query) {
            const _this = this
            var placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                city: '010'
            })
            placeSearch.search(query, function (status, result) {
                // 查询成功时，result即对应匹配的POI信息
                if (result.info === 'OK') {
                    _this.tips = []
                    result.poiList.pois.forEach(item => {
                        _this.tips.push({
                            value: item.location.lng + ',' + item.location.lat,
                            address: item.name
                        })
                    })
                }
            })
        },
        emitOut(e, data) {
            this.upLoadStatus = e
            this.form.point_list = []
            data && this.init(data)
        },
        openUpload() {
            this.upLoadStatus = true
            /* if (this.form.unique_code) {
                this.upLoadStatus = true
            } else {
                this.$message.error('请先填写设备标识符!')
            } */
        },
        init(e) {
            this.file = undefined
            setTimeout(() => {
                this.file = e
                this.form.back_img = this.file.file
                this.loading = true
            }, 100)
        },
        async getPrepare() {
            const res = await selectPartitionType({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'list', list)
            }
            const res1 = await getTotalDevice({id:this.id})
            if (res1.code === 1) {
                const list1 = []
                for (const i in res1.data) {
                    list1.push(res1.data[i])
                }
                this.$set(this.prepare, 'mdevices', list1)
            }
        },
        addForm() {
            this.formStatus = true
            this.mesh && this.mesh.children.forEach(item => {
                const obj = this.form.point_list.filter(me => item.name === me.mesh_name)
                item.disabled = obj.length > 0
            })
            this.statusType = 'create'
        },
        /**
         * @name: canvas返回的数据
         * @param {*} e
         * @return {*}
         */
        canvasBack(e) {
            this.loading = false
            this.mesh = e
            const mesh = []
            this.form.point_list.forEach(item => {
                const m = this.mesh.children.filter(me => me.name === item.mesh_name)
                if (m.length > 0) {
                    mesh.push(...m)
                }
            })
            this.$refs.canvas.addDIan(mesh, this.form.point_list)
        },
        /**
         * @name: form组件返回数据
         * @param {*} e
         * @return {*}
         */
        outForm(status, data) {
            this.formStatus = status
            if (!data) return
            const obj = this.form.point_list.filter(item => item.mesh_name === data.mesh_name)
            if (obj.length > 0) {
                this.pointListPush(data.mesh_id)
            }
            this.form.point_list.push(data)
            const mesh = []
            this.form.point_list.forEach(item => {
                const m = this.mesh.children.filter(me => me.name === item.mesh_name)
                if (m.length > 0) {
                    mesh.push(...m)
                }
            })
            this.$refs.canvas.addDIan(mesh, this.form.point_list, 'pointFlag')
        },
        /**
         * @name: 删除重复的那条数据
         * @param {*} mesh_name
         * @return {*}
         */
        pointListPush(mesh_name) {
            const index = this.form.point_list.findIndex(item => item.mesh_name === mesh_name)
            this.form.point_list.splice(index, 1)
        },
        /**
         * @name: 修改监控点信息
         * @param {*} data
         * @return {*}
         */
        canvaspointlist(data) {
            const index = this.form.point_list.findIndex(item => item.mesh_name === data.mesh_name)
            if (index > -1) {
                this.form.point_list[index] = data
            }
        },
        /**
         * @name: 删除点
         * @param {*} e
         * @return {*}
         */
        delpointlist(e) {
            this.pointListPush(e.name)
        },
        submit() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    this.subFun()
                }
            })
        },
        async subFun() {
            const params = Object.assign({}, this.form, {})
            const camera = this.$refs.canvas.returnCamera()
            params.camera_x = camera.x
            params.camera_y = camera.y
            params.camera_z = camera.z
            const res = await getEquipmentSaveEdit(params)
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.$router.push('/mdevice')
            }
        }
    }
}
