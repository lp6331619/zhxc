/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 15:59:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-01 21:20:13
 */
import { getEquipmentSiteList } from '@/api/site'
import { videoMonitorAdd, videoMonitorEdit, classifyList, VideoDetail } from '@/api/information'
import { totalDevice } from '@/api/event'
import { getTotalDevice } from '@/api/device'
import AMap from 'AMap'
export default {
    components: {
    },
    data() {
        return {
        searchData: [], // 视频分类回填的数据
        optionProps: {
          value: 'id',
          label: 'label',
          children: 'children'
        },
            data: undefined, // 列表数据
            loading: false,
            prepare: {},
            disabled: false,
            files: [], // 图片
            form: {
                name: '', // string必填，示例：监控名称
                site_id: null, // int必填，站点ID，示例：2
                device_id: null, // int 关联设备ID，示例：0
                pic: '', // string 示例：/upload/sys/image/2d/bfc2eb35fb532aaa7595772f64ca04.jpeg
                app_key: '', // string 必填，示例：5f0c198c3cd14da78259f159a89a5b87
                app_secret: '', // string 必填，示例：170d2fca3df74acf1c5abe1bbdc6d5dd
                device_serial: '', // string 必填，序列号，示例：E09119409
                device_code: '', // string 必填，验证码示例：E09119409
                channel_no: null, // int 设备通道，示例：1
                class_id: null, // int 必填，分类ID
                longitude: '', // double 经度
                latitude: '' // double 纬度
            },
            formRules: {
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                site_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                device_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                app_key: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                pic: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                device_serial: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                device_code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                class_id: [
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
                longitude: [
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
            type: 0,
            limit: 1,

            // 地图相关
            address: '',
            tips: [],
            map: undefined,
            geocoder: undefined,
            marker: undefined
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
            const res = await VideoDetail({ id: this.id })
            if (res.code === 1) {
                this.data = res.data
                const info = this.data.info
                this.form = {
                    id: info.id,
                    name: info.name, // string必填，示例：监控名称
                    site_id: info.site_id, // int必填，站点ID，示例：2
                    device_id: info.device_id, // int 关联设备ID，示例：0
                    pic: info.pic, // string 示例：/upload/sys/image/2d/bfc2eb35fb532aaa7595772f64ca04.jpeg
                    app_key: info.app_key, // string 必填，示例：5f0c198c3cd14da78259f159a89a5b87
                    app_secret: info.app_secret, // string 必填，示例：170d2fca3df74acf1c5abe1bbdc6d5dd
                    device_serial: info.device_serial, // string 必填，序列号，示例：E09119409
                    device_code: info.device_code, // string 必填，验证码示例：E09119409
                    channel_no: info.channel_no, // int 设备通道，示例：1
                    class_id: info.class_id, // int 必填，分类ID
                    longitude: info.longitude, // double 经度
                    latitude: info.latitude // double 纬度
                }
                //视频分类回填,给this.searchData赋值
                if(this.prepare.class_id){
                  this.searchData = []
                  this.prepare.class_id.forEach(item => {
                      if(item.id == this.form.class_id){
                        this.searchData.push(item.id)
                        console.log(this.searchData,'getdetail')
                      }else if(item.children.length > 0){
                        item.children.forEach(val => { //做两级
                          if(val.id == this.form.class_id){
                            this.searchData.push(item.id)
                            this.searchData.push(val.id)
                            console.log(this.searchData,'getdetail')
                          }
                        });
                      }
                  })
                }
                this.files = [{
                    url: this.imgUrl + this.form.pic
                }]
                this.mapInit()
            }
            this.loading = false
        },
        mapInit() {
            // 地图
            this.$nextTick(() => {
                this.map = new AMap.Map('map', {
                    // center: [this.form.longitude, this.form.latitude],
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
            data && this.init(data)
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
            const res = await getEquipmentSiteList({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'list', list)
            }
            const class_id = await classifyList({})
            if (class_id.code === 1) {
                this.$set(this.prepare, 'class_id', class_id.data.list)
                if(this.form.class_id){//
                  this.searchData = []
                  this.prepare.class_id.forEach(item => {
                      if(item.id == this.form.class_id){
                        this.searchData.push(item.id)
                        console.log(this.searchData,'getdetail')
                      }else if(item.children.length > 0){
                        item.children.forEach(val => { //做两级
                          if(val.id == this.form.class_id){
                            this.searchData.push(item.id)
                            this.searchData.push(val.id)
                            console.log(this.searchData,'getdetail')
                          }
                        });
                      }
                  })
                }
            }
            // const device_id = await totalDevice({})
            const device_id = await getTotalDevice({})
            if (device_id.code === 1) {
                const l = []
                for (const i in device_id.data) {
                    l.push(device_id.data[i])
                }
                this.$set(this.prepare, 'device_id', l)
            }
        },
        // 超过图片大小
        oversize(file) {
            this.$message.error('图片大小不能超过2M')
        },
        // 上传前
        beforeRead(files) {
            for (let i = 0, len = files.length; i < len; i++) {
                const file = files[i]
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    alert('只能上传jpg和png格式的图片')
                    return false
                }
            }
            return true
        },
        // logo获取
        afterLicense(e) {
            this.form.pic = e[0].url
        },
        submit() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    this.subFun()
                }
            })
        },
        async subFun() {
            const params = Object.assign({}, this.form, {class_id:this.searchData})
            if (this.id !== 'undefined') {
                const res = await videoMonitorEdit(params)
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$router.push('/video')
                }
            } else {
                const res = await videoMonitorAdd(params)
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$router.push('/video')
                }
            }
        }
    }
}
