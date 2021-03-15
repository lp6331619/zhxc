/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 15:59:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-19 11:58:53
 */
import { VidelDetail,VideoAdd,VideoEdit } from '@/api/village'
import AMap from 'AMap'
export default {

    data() {
        return {
            //视频设置
            uploadVideoUrl: `${process.env.VUE_APP_BASE_API}/system/Annex/upload`,
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //图片设置
            files: [],
            maxSize: 1024 * 1024 * 2, // 2mb
            limit: 1,
            type: 0, // 0 预览模式 1 列表模式 2 预览模式 + 上传按钮
              // 修改密码表单
              setStatusStatus: false,
              title: '创建站点',
              form: {
                  name: null,
                  url: '',
                  image_url: '',
                  remark: '',
                  longitude: undefined,
                  latitude: undefined
              },
              formRules: {
                  username: [
                      {
                          required: true,
                          trigger: 'change',
                          message: '不能为空!'
                      }
                  ],
                  image_url: [
                      {
                          required: true,
                          trigger: 'change',
                          message: '不能为空!'
                      }
                  ],
                  url: [
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
                  ]
              },
              loading: false,
              prepare: undefined,
              disabled: false,
              address: '',
              tips: [],
              map: undefined,
              geocoder: undefined,
              marker: undefined,
              lnglat: undefined,
              statusType: 'create',
              formStatus: false,
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    created() {
        this.getPrepare()
        if (this.id !== 'undefined' && this.id) {
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
            const res = await VidelDetail({ id: this.id })
            if (res.code === 1) {
                this.data = res.data
                const form_data = this.data.form_data
                this.form = {
                  name: form_data.name,
                  url: form_data.url,
                  image_url: form_data.image_url,
                  remark: form_data.remark,
                  latitude: form_data.latitude,
                  longitude: form_data.longitude,
                }
                this.files = [{
                                  url: this.imgUrl + form_data.image_url
                              }]
                this.mapInit()
            }
            this.loading = false
        },
        //上传前回调
        beforeUploadVideo(file) {
            var fileSize = file.size / 1024 / 1024 < 50;
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                this.$message({
                    type: 'error',
                    message: "请上传正确的视频格式"
                })
                return false;
            }
            if (!fileSize) {
                this.$message({
                    type: 'error',
                    message: "视频大小不能超过50MB"
                })
                return false;
            }
            this.isShowUploadVideo = false;
        },
        //进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        //上传成功回调
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;

            //后台上传地址
            if (res.code == 1) {
                this.form.url = res.data.file;
            } else {
                this.$message({
                    type: 'error',
                    message: res.msg
                })
            }
        },
        //图片处理
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
        // 超过图片大小
        oversize(file) {
            this.$message.error('图片大小不能超过2M')
        },
        // logo获取
        afterLogo(e) {
            this.form.image_url = e[0].url
        },
        mapInit() {
            // 地图
            this.$nextTick(() => {
                this.map = new AMap.Map('map', {
                    // center: [this.form.longitude || null, this.form.latitude || null],
                    viewMode:'3D',
                    rotateEnable: true,
                    zoom: 14
                })
                this.map.addControl(new AMap.MapType());
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
                if (this.id !== 'undefined' && this.id != '') {
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

        init(e) {
            this.file = undefined
            setTimeout(() => {
                this.file = e
                this.form.back_img = this.file.file
                this.loading = true
            }, 100)
        },
        async getPrepare() {

        },
        addForm() {
            this.formStatus = true

            this.statusType = 'create'
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
            this.$refs.canvas.addDIan(mesh, this.form.point_list)
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
            if(this.id){
              params.id = this.id
              const res = await VideoEdit(params)
              console.log(res)
              if (res.code === 1) {
                  this.$message({
                      type: 'success',
                      message: res.msg
                  })
                  this.$router.push('/vvideo')
              }else{
                this.$message({
                    type: 'error',
                    message: res.msg
                })
              }
            }else{
              const res = await VideoAdd(params)
              if (res.code === 1) {
                  this.$message({
                      type: 'success',
                      message: res.msg
                  })
                  this.$router.push('/vvideo')
              }else{
                this.$message({
                    type: 'error',
                    message: res.msg
                })
              }
            }


        }
    }
}
