<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-09 10:40:57
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-28 12:12:20
-->
<template>
    <div class="map">
        <div class="searchTop wow fadeInUp">
            <SearchInput
                search-type="type"
                search-name="搜索"
                :prepare-data="prepareData"
                :search-info="searchInfo"
                @emitData="emitData($event)"
            />
        </div>
        <div
            id="map"
            ref="map"
        ></div>
        <!-- <div class="mapTip">
            <div class="title">设备详情内容</div>
            <ul>
                <li>站点名:是打发斯蒂芬</li>
                <li>设备名: 214124</li>
                <li>设备标识符:2222</li>
                <li>监控区名: 大范甘迪发</li>
            </ul>
            <div class="bottom"></div>
        </div> -->

    </div>
</template>
<script>
// lazyAMapApiLoaderInstance
import AMap from 'AMap'
import { getPointList,getVideoUrl } from '@/api/index'
import SearchInput from '@/components/SearchBox/SearchXz'
import { WOW } from 'wowjs'
export default {
    name: 'Map',
    components: {
        SearchInput
    },
    props: {
        centent: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            map: undefined,
            equipment_list: [], // 巡检站点列表
            device_list: [], // 设备监控列表
            video_list: [], // 视频监控列表
            beekeeping_list: [], // 养蜂记录列表
            vvideo_list: [], // 视频列表
            fp_device_list: [], // 人脸设备列表
            mdevice_list: [], // 智能设备列表
            fupin_list: [], // 精准扶贫列表
            viewpoint_list: [], // 乡村景点列表
            product_list: [], // 特色农产品列表
            equipment: require('@/assets/image/10x/equipment.png'),
            device: require('@/assets/image/10x/device.png'),
            video: require('@/assets/image/10x/video.png'),
            beekeeping: require('@/assets/image/10x/bee.png'),
            vvideo: require('@/assets/image/10x/vvideo.png'),
            fp_device: require('@/assets/image/10x/fpDevice.png'),
            mdevice: require('@/assets/image/10x/mdevice.png'),
            fupin: require('@/assets/image/10x/fupin.png'),
            viewpoint: require('@/assets/image/10x/viewpoint.png'),
            product: require('@/assets/image/10x/product.png'),
            center: [],
            marker: [], // 选择的对象
            prepareData: {
                type: {
                    equipment: '巡检站点',
                    video: '视频监控',
                    device: '设备监控',
                    beekeeping: '智能养蜂',
                    vvideo: '视频列表',
                    fp_device: '人脸识别',
                    mdevice: '智能设备',
                    fupin: '精准扶贫',
                    viewpoint: '乡村景点',
                    product: '特色农产品',
                }
            },
            contourLayer: undefined,
            searchInfo: undefined,
            infoWindow: {},
            video_url: ''
        }
    },
    computed: {
    },
    mounted() {
        this.handleSelect()
        this.getPointList()
        new WOW({
            live: false,
            offset: 0
        }).init()
    },
    methods: {
        handleSelect(){ //处理下拉列表
          //设置prepareData-type
          var prives = this.$parent.prives
          var types = {}//this.prepareData.type

          for(var key in prives){
            if(this.prepareData.type[key] != undefined){
              if(prives[key]){
                types[key] = this.prepareData.type[key]
              }
            }else if(key == 'inspection'){
              if(prives[key]){
                types['equipment'] = this.prepareData.type['equipment']
              }
            }else if(key == 'facepass'){
              if(prives[key]){
                types['fp_device'] = this.prepareData.type['fp_device']
              }
            }
          }
          this.prepareData.type = types
          console.log(this.prepareData.type,'this.prepareData.type')
        },
        addType(num) {
            if (num === 2) {
                this.initLoca()
            } else {
                // this.map.addControl(new AMap.MapType({
                //     defaultType: num //0代表默认，1代表卫星
                // }))
                this.map.plugin(['AMap.MapType'], () => {
                    // 地图类型切换
                    var type = new AMap.MapType({
                        defaultType: num // 使用2D地图
                    })
                    this.map.addControl(type)
                })
            }
        },
        async getPointList() {
            const res = await getPointList({})
            if (res.code === 1) {
                this.searchInfo = res.data
                this.equipment_list = res.data.equipment_list
                this.device_list = res.data.device_list
                this.device_list.map(item => {
                    this.$set(item, 'name', item.contorl_name)
                })
                this.video_list = res.data.video_list
                this.vvideo_list = res.data.vvideo_list
                this.fp_device_list = res.data.fp_device_list
                this.beekeeping_list = res.data.beekeeping_list
                this.beekeeping_list.map(item => {
                    this.$set(item, 'name', item.username)
                })
                this.mdevice_list = res.data.mdevice_list
                this.mdevice_list.map(item => {
                    this.$set(item, 'name', item.contorl_name)
                })
                this.fupin_list = res.data.fupin_list
                this.viewpoint_list = res.data.viewpoint_list
                this.product_list = res.data.product_list
                this.init()
            }
        },

        GaodeMap() {
            // const _this = this
            // AMap.plugin('AMap.Geocoder', function () {
            //     new AMap.Geocoder({}).getLocation(_this.maps.city, (status, result) => {
            //         if (status === 'complete' && result.info === 'OK') {
            //             const d = result.geocodes[0].location
            //             // result中对应详细地理坐标信息
            //             _this.center = [d.lng, d.lat]
            //             _this.center && _this.init()
            //         }
            //     })
            // })
        },
        init() {

            this.map = new AMap.Map('map', {
                center: [this.centent.longitude, this.centent.latitude], // [116.397428, 39.90923][纬度，经度]
                resizeEnable: true,
                rotateEnable: false,
                pitchEnable: false,
                zoom: this.centent.zoom,
                pitch: 45,
                viewMode: '3D', // 开启3D视图,默认为关闭
                zooms: [2, 20],
                mapStyle: 'amap://styles/d806aaf53b5a85d9f3af671140ae84a0' // 设置地图的显示样式
            })
            this.map.on('click', (ev) => {
                // .amap-overlays .amap-info
                // console.log(this.$refs.map['.amap-overlays'])
                /* for (const i in this.infoWindow) {
                    this.infoWindow[i].close()
                } */
                this.clearInfoWindow()
            })
            AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
                // 图层切换控件
                this.map.addControl(
                    new BasicControl.LayerSwitcher({
                        position: 'rt'
                    })
                )
            })
        },
        clearInfoWindow(){
          /* 获取播放器元素 */
          var player = document.getElementById('ysOpenDevice');
          /* iframe 支持方法 */
          // player.postMessage("play", "https://open.ys7.com/ezopen/h5/iframe") /* 播放 */
          if(player){
            var parent = player.parentNode
            parent.removeChild(player);
            // player = player.contentWindow
            // player.postMessage("stop", "https://open.ys7.com/ezopen/h5/iframe") /* 结束 */
          }
          this.map.clearInfoWindow();//清理窗口
        },
        // 添加点
        addMarker(e, active_status) {
            /* for (const i in this.infoWindow) {
                this.infoWindow[i].close()
            } */
           // this.map.clearInfoWindow();//清理窗口
           this.clearInfoWindow()
            //旧逻辑：
            /* if (this.marker.length) {
              //地图
                this.map.remove(this.marker)
                this.marker = []
            }
            this[e + '_list'].forEach(item => {
              //数据
                if (item.longitude && item.latitude) {
                    this.addMark(item, e)
                }
            })
            if (this[e + '_list'][0].longitude && this[e + '_list'][0].latitude) {
                this.map.setCenter([this[e + '_list'][0].longitude, this[e + '_list'][0].latitude])
                this.map.add(this.marker)
                this.map.setFitView()
            } */
            //新逻辑：图标可叠加显示
            //getExtData( )
            if(active_status){//打点
              this[e + '_list'].forEach(item => {
                //数据
                  if (item.longitude && item.latitude) {
                      this.addMark(item, e)
                  }
              })
              if (this[e + '_list'][0].longitude && this[e + '_list'][0].latitude) {
                  this.map.setCenter([this[e + '_list'][0].longitude, this[e + '_list'][0].latitude])
                  this.map.add(this.marker)
                  this.map.setFitView()
              }
            }else if(active_status === false){
              if (this.marker.length) {
                /* this.map.remove(this.marker)
                let index =   this.marker.findIndex(item=>item.getExtData.typeRow === e)
                index && this.marker.splice(index,1)
                this.map.add(this.marker) */
                //地图
                this.map.remove(this.marker)
                var marker_index = -1;
                var marker_length = 0;
                this.marker.forEach((item,index) => {
                  var temp_data = item.getExtData( )
                  if(temp_data.typeRow === e){
                    if(marker_index < 0){
                      marker_index = index
                    }
                    marker_length++
                    // this.marker.splice(index)
                    // delete this.marker.index
                  }
                })
                marker_length && this.marker.splice(marker_index,marker_length)
                this.map.add(this.marker)
              }
            }
            if(this.marker.length == 0){
              this.marker = []
            }


        },
        addMark(item, e) {
            const row = Object.assign({}, item, { typeRow: e })
            const marker = new AMap.Marker({
                icon: this[e],
                position: [Number(item.longitude), Number(item.latitude)],
                extData: row,
                // offset: new AMap.Pixel(-30.5, -57.5),
                offset: new AMap.Pixel(0, 0),
                visible: true
            })
            marker.on('click', this.showInfoClick)
            marker.on('touchstart', this.showInfoClick)
            this.marker.push(marker)
        },
        /**
          * @name: 事件
          * @param {*} e
          * @return {*}
          */
        async showInfoClick(e) {
            const clouddata = e.lnglat
            const item = e.target.Ce.extData
            const _location = [clouddata.R, clouddata.Q]
            const html = await this.getHtml(item)
            // 信息窗口
            this.$set(this.infoWindow, item.id, new AMap.InfoWindow({
                isCustom: true,
                content: html,
                autoMove: true,
                anchor: 'bottom-left',
                avoid: true,
                // offset: [120, 120],
                offset: new AMap.Pixel(0, 0),
                retainWhenClose: true,
                closeWhenClickMap: true
            }))
            this.infoWindow[item.id].open(this.map, _location)
            setTimeout(() => {
                if (item.typeRow=='device' && item.back_img) {
                    document.getElementById('infoWindow' + item.id).onclick = null
                    document.getElementById('infoWindow' + item.id).ontouchstart = null
                    document.getElementById('infoWindow' + item.id).onclick = (e) => {
                        this.$emit('mapBack', item)
                    }
                    document.getElementById('infoWindow' + item.id).ontouchstart = (e) => {
                        this.$emit('mapBack', item)
                    }
                }else if(item.typeRow=='mdevice' && item.back_img){

                    document.getElementById('modelWindow' + item.id).onclick = null
                    document.getElementById('modelWindow' + item.id).ontouchstart = null
                    document.getElementById('modelWindow' + item.id).onclick = (e) => {
                        this.$emit('mapBack', item)
                    }
                    document.getElementById('modelWindow' + item.id).ontouchstart = (e) => {
                        this.$emit('mapBack', item)
                    }
                }else{
                  switch(item.typeRow){
                    case 'video':
                      document.getElementById('video' + item.id).onclick = (e) => {
                          this.$router.push(`/videoDetail?id=${item.id}`)
                      }
                      document.getElementById('video' + item.id).ontouchstart = (e) => {
                          this.$router.push(`/videoDetail?id=${item.id}`)
                      }
                      break;
                    case 'equipment':
                      document.getElementById('equipment' + item.id).onclick = (e) => {
                          this.$router.push(`/site?id=${item.id}`)
                      }
                      document.getElementById('equipment' + item.id).ontouchstart = (e) => {
                          this.$router.push(`/site?id=${item.id}`)
                      }
                      break;
                    case 'beekeeping':
                      document.getElementById('beekeeping' + item.id).onclick = (e) => {
                          this.$router.push(`/beekeeping?id=${item.id}`)
                      }
                      document.getElementById('beekeeping' + item.id).ontouchstart = (e) => {
                          this.$router.push(`/beekeeping?id=${item.id}`)
                      }
                      break;
                    case 'vvideo':
                      document.getElementById('vvideo' + item.id).onclick = (e) => {
                          this.$router.push(`/vvideoShow?id=${item.id}`)
                      }
                      document.getElementById('vvideo' + item.id).ontouchstart = (e) => {
                          this.$router.push(`/vvideoShow?id=${item.id}`)
                      }
                      break;
                    case 'fp_device':
                      for(var i=0;i<3;i++){
                        document.getElementById('fp_device' + item.id+'_'+i).onclick = (e) => {
                            var url = e.target.getAttribute('data-url');
                            console.log(url)
                            this.$router.push(`${url}"${item.id}"`)
                        }
                        document.getElementById('fp_device' + item.id+'_'+i).ontouchstart = (e) => {
                            var url = e.target.getAttribute('data-url');
                            this.$router.push(`${url}"${item.id}"`)
                        }
                      }
                      break;
                    default:
                      document.getElementById(item.typeRow + item.id).onclick = (e) => {
                          var url = e.target.getAttribute('data-url');
                          console.log(url)
                          this.$router.push(`${url}"${item.id}"`)
                      }
                      document.getElementById(item.typeRow + item.id).ontouchstart = (e) => {
                          var url = e.target.getAttribute('data-url');
                          this.$router.push(`${url}"${item.id}"`)
                      }
                      break;
                  }


                }
            }, 500)

        },
         getVideoUrl(id){
          /* const res = await getVideoUrl({id:id})
          if (res.code === 1) {
            this.video_url = res.data.url;
          }else{
            this.video_url = '';
          }
          console.log(this.video_url,'方法内的数据')
          console.log(res,'方法内的数据') */
          getVideoUrl({ id: id }).then(res => {
            console.log(res.data,'this.video_url3');
            if (res.code === 1) {
              this.video_url = res.data.url;
            }else{
              this.video_url = '';
            }
          })

          // console.log(this.video_url,'this.video_url1')
        },
        /**
         * @name: 获取 html
         * @param {*}
         * @return {*}
         */
        async getHtml(item) {
            let html = ''
            switch (item.typeRow) {
                case 'video':
                //url需实时获取
                    const res = await getVideoUrl({id:item.id})//todo
                    this.video_url = res.data.url
                    // await this.getVideoUrl(item.id)
                    console.log(res,'方法外的');
                    this.window_html = html = `<div class="mapTip">
                                <div class="title">视频详情内容</div>
                                <ul>
                                    <li>站点名:${item.device_name}</li>
                                    <li>监控名:${item.name}</li>
                                    <li>关联设备:${item.related_device_name}</li>
                                    <li>设备序列号:${item.device_serial}</li>
                                    <li>在线状态:${item.device_status}</li>
                                </ul>
                                <div class="video">
                                    <iframe
                                        width="600px"
                                        height="400px"
                                        src="${this.video_url}"
                                        frameborder="0"
                                        id="ysOpenDevice"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                                <div id="video${item.id}" class="infoWindow" data-item="${item}" data-type="video">查看详情</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'equipment':
                    html = `<div class="mapTip">
                                <div class="title">巡检站点详情内容</div>
                                <ul>
                                    <li>乡村站点名称:${item.name}</li>
                                    <li>乡村站点编码:${item.code}</li>
                                    <li>芯片ID:${item.bluetooth_id}</li>
                                    <li>芯片距离:${item.distance}</li>
                                    <li>芯片检测:${item.is_open}</li>
                                </ul>
                                <div id="equipment${item.id}" class="infoWindow" data-item="${item}" data-type="equipment">查看更多</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'device':
                    html = `<div class="mapTip">
                                <div class="title">设备详情内容</div>
                                <ul>
                                    <li>站点名:${item.site.name}</li>
                                    <li>设备名:${item.contorl_name}</li>
                                </ul>
                                <div id="infoWindow${item.id}" class="infoWindow" data-item="${item}">查看详情</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'beekeeping':
                    html = `<div class="mapTip">
                                <div class="title">养蜂详情内容</div>
                                <ul>
                                    <li>养蜂户:${item.username}</li>
                                    <li>数量:${item.num}箱</li>
                                    <li>开始养殖时间:${item.start_time}</li>
                                    <li>年产量:${item.annual_output}</li>
                                    <li>品种:${item.variety}</li>
									<div class="video">
									    <img
									        src="${this.imgUrl}${item.image_url}"
									        alt=""
									    >
									</div>
                      </ul>
                      <div id="beekeeping${item.id}" class="infoWindow" data-item="${item}" data-type="equipment">查看更多</div>
                      <div class="bottom"></div>
                  </div>`
                    break
                case 'vvideo':
                    html = `<div class="mapTip">
                                <div class="title">视频详情</div>
                                <ul>
                                    <li>名称:${item.name}</li>
                                </ul>
                                <div class="video">
                                    <img
                                        src="${this.imgUrl}${item.image_url}"
                                        alt=""
                                    >
                                </div>
                                <div id="vvideo${item.id}" class="infoWindow" data-item="${item}" data-type="vvideo">查看详情</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'fp_device':
                    html = `<div class="mapTip">
                                <div class="title">人脸设备详情</div>
                                <ul>
                                    <li>名称:${item.name}</li>
                                    <li>类型:${item.type}</li>
                                    <li>设备组:${item.area_name}</li>
                                    <li>状态:${item.status}</li>
                                </ul>
                                <div id="fp_device${item.id}_0" class="infoWindow" data-item="${item}" data-url="/fp_device?id=" data-type="fp_device">设备列表</div>
                                <div id="fp_device${item.id}_1" class="infoWindow" data-item="${item}" data-url="/access_log_list?device_id=" data-type="fp_device">通行记录</div>
                                <div id="fp_device${item.id}_2" class="infoWindow" data-item="${item}" data-url="/alert_tempareture_list?device_id=" data-type="fp_device">防疫告警</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'mdevice':
                    html = `<div class="mapTip">
                                <div class="title">智能设备详情</div>
                                <ul>
                                    <li>设备名:${item.contorl_name}</li>
                                    <li>区 名:${item.partition_type}</li>
                                </ul>
                                <div id="modelWindow${item.id}" class="infoWindow" data-item="${item}">查看详情</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'fupin':
                    html = `<div class="mapTip">
                                <div class="title">精准扶贫详情</div>
                                <ul>
                                    <li>贫困户:${item.name}</li>
                                    <li>扶贫状态:${item.status}</li>
                                    <li>扶贫方针:${item.policy}</li>
                                    <li>扶贫资金:${item.funds}万元</li>
                                </ul>
                                <div class="video">
                                    <img
                                        src="${this.imgUrl}${item.image_url}"
                                        alt=""
                                    >
                                </div>
                                <div id="fupin${item.id}" class="infoWindow" data-item="${item}" data-url="/fupin?id=" data-type="fupin">查看更多</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'viewpoint':
                    html = `<div class="mapTip">
                                <div class="title">乡村景点详情</div>
                                <ul>
                                    <li>名称:${item.name}</li>
                                    <li>特产:${item.specialty}</li>
                                    <li>简介:${item.digest}</li>
                                </ul>
                                <div class="video">
                                    <img
                                        src="${this.imgUrl}${item.image_url}"
                                        alt=""
                                    >
                                </div>
                                <div id="viewpoint${item.id}" class="infoWindow" data-item="${item}" data-url="/viewpoint?id=" data-type="viewpoint">查看更多</div>
                                <div class="bottom"></div>
                            </div>`
                    break
                case 'product':
                    html = `<div class="mapTip">
                                <div class="title">特色农产品详情</div>
                                <ul>
                                    <li>名称:${item.name}</li>
                                    <li>收获季节:${item.harvest_season}</li>
                                    <li>简介:${item.digest}</li>
                                </ul>
                                <div class="video">
                                    <img
                                        src="${this.imgUrl}${item.image_url}"
                                        alt=""
                                    >
                                </div>
                                <div id="product${item.id}" class="infoWindow" data-item="${item}" data-url="/product?id=" data-type="product">查看更多</div>
                                <div class="bottom"></div>
                            </div>`
                    break
            }
            return html
        },
        /**
         * @name: 初始化等高线
         * @param {*}
         * @return {*}
         */
        initLoca() {
            // this.contourLayer = new Loca.ContourLayer({
            //     // shape: {string}, 等高线类型 'isoband'为等高面, 'isoline'为等高线, 必填
            //     shape: 'isoline',
            //     map: this.map
            // })
            // this.contourLayer = Loca.visualLayer({
            //     type: 'contour',
            //     shape: 'isoline',
            //     container: this.map
            // })

            // this.contourLayer.setOptions({
            //     smoothNumber: 3,
            //     threshold: 3,
            //     interpolation: {
            //         step: 300,
            //         effectRadius: 1000
            //     },
            //     style: {
            //         height: 8 * 1E4
            //     }
            // })
            // this.contourLayer.render()
        },
        /**
         * @name: 返回的数据
         * @param {*}
         * @return {*}
         */
        emitData(e) {
            if (this.marker.length) {
                this.map.remove(this.marker)
                this.marker = []
            }
            this.map.setCenter([e.longitude, e.latitude])
            this.addMark(e, e.fieldType)
            this.$emit('typeBack', e.fieldType)
            this.map.add(this.marker)
        }
    }
}
</script>

<style lang="scss" scoped>
.map {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
#map {
    width: 100%;
    height: 100%;
}
</style>
