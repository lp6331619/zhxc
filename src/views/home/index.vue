<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-08-17 15:49:11
 * @LastEditors: Teemor
 * @LastEditTime: 2021-01-04 14:06:29
-->
<template>
    <div class="">
        <Map
            v-if="centent && mapStatus"
            ref="maps"
            :centent="centent"
            @mapBack="mapBack"
            @typeBack="typeBack"
        />
        <div class="tabBox wow fadeInDown">
            <span
                :class="{'active':tab===0}"
                @click="setTab(0)"
            >巡检管理</span>
            <span
                :class="{'active':tab===1}"
                @click="setTab(1)"
            >设备情况</span>
            <span
                :class="{'active':tab===2}"
                @click="setTab(2)"
            >农村饮水</span>
        </div>
        <div class="tipBox wow fadeInUp">
            <el-tooltip
                v-if="prives.video"
                class="item"
                effect="dark"
                content="视频监控"
                placement="left"
            >
                <div
                    class="iconfont icon-shexiangtou-copy"
                    :class="{'active':video_active}"
                    @click="tipSelect('video')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.inspection"
                class="item"
                effect="dark"
                content="巡检站点"
                placement="left"
            >
                <div
                    class="iconfont icon-socialfill"
                    :class="{'active':equipment_active}"
                    @click="tipSelect('equipment')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.device"
                class="item"
                effect="dark"
                content="设备监控"
                placement="left"
            >
                <div
                    class="iconfont icon-shebei"
                    :class="{'active':device_active}"
                    @click="tipSelect('device')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.beekeeping"
                class="item"
                effect="dark"
                content="智能养蜂"
                placement="left"
            >
                <div
                    class="iconfont icon-mifengcaihua"
                    :class="{'active':beekeeping_active}"
                    @click="tipSelect('beekeeping')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.vvideo"
                class="item"
                effect="dark"
                content="视频列表"
                placement="left"
            >
                <div
                    class="iconfont icon-shipin11"
                    :class="{'active':vvideo_active}"
                    @click="tipSelect('vvideo')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.facepass"
                class="item"
                effect="dark"
                content="人脸识别"
                placement="left"
            >
                <div
                    class="iconfont icon-renlianshibie1"
                    :class="{'active':fp_device_active}"
                    @click="tipSelect('fp_device')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.mdevice"
                class="item"
                effect="dark"
                content="智能设备"
                placement="left"
            >
                <div
                    class="iconfont icon-zhinengjiaju"
                    :class="{'active':mdevice_active}"
                    @click="tipSelect('mdevice')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.fupin"
                class="item"
                effect="dark"
                content="精准扶贫"
                placement="left"
            >
                <div
                    class="iconfont icon-fupin"
                    :class="{'active':fupin_active}"
                    @click="tipSelect('fupin')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.viewpoint"
                class="item"
                effect="dark"
                content="乡村景点"
                placement="left"
            >
                <div
                    class="iconfont icon-jingdian"
                    :class="{'active':viewpoint_active}"
                    @click="tipSelect('viewpoint')"
                ></div>
            </el-tooltip>
            <el-tooltip
                v-if="prives.product"
                class="item"
                effect="dark"
                content="特色农产品"
                placement="left"
            >
                <div
                    class="iconfont icon-nongchanpin"
                    :class="{'active':product_active}"
                    @click="tipSelect('product')"
                ></div>
            </el-tooltip>

            <!-- <div
                class="iconfont icon-icon_huabanfuben2"
                :class="{'active':ditu===0}"
                @click="qieh(0)"
            ></div>
            <div
                class="iconfont icon-diqiu"
                :class="{'active':ditu===1}"
                @click="qieh(1)"
            ></div> -->
            <!-- <div
                class="iconfont icon-diqiu"
                :class="{'active':ditu===2}"
                @click="qieh(2)"
            ></div> -->
        </div>
        <!-- 左边 -->
        <div
            ref="leftTopBox"
            class="leftTopBox  wow backInLeft"
        >
            <template v-if="tab===0 && echartStatus">
                <div
                    class="block"
                    style="height:30%"
                >
                    <Bar
                        v-if="taskCount"
                        id="bar"
                        :data="taskCount"
                        :name="'站点任务情况'"
                    />
                </div>
                <div class="block">
                    <Pie
                        v-if="check_rate.length "
                        id="check_rate"
                        title="巡检计划执行情况"
                        piename="巡检情况"
                        :data="check_rate"
                    />
                </div>
                <div class="block">
                    <Pie
                        v-if="quality_rate.length"
                        id="quality_rate"
                        title="巡检计划合格比例"
                        :pie="true"
                        piename="巡检结果"
                        :data="quality_rate"
                    />
                </div>
                <div
                    class="block"
                    style="height:20%"
                >
                    <Today
                        v-if="today"
                        id="today"
                        title="今日新增"
                        :data="today"
                    />
                </div>

            </template>
            <template v-if="tab===1 && echartStatus">
                <div
                    class="block"
                    style="height:30%"
                >
                    <Pie
                        v-if="online.length"
                        id="pie"
                        title="摄像头在线情况"
                        piename="在线情况"
                        :data="online"
                    />
                </div>
                <div
                    class="block"
                    style="height:30%"
                >
                    <LineBox
                        v-if="line && line[0]"
                        id="line"
                        :data="line[0]"
                    />
                </div>
                <div
                    class="block"
                    style="height:40%"
                >
                    <Recent
                        v-if="recent"
                        :data="recent"
                    />
                </div>
            </template>
            <template v-if="tab===2 && echartStatus">
                <div
                    class="block"
                    style="height:30%"
                >
                    <Pie
                        v-if="pie_data.length && tab===2"
                        id="pie"
                        title="设备运行评估"
                        piename="运行评分"
                        :data="pie_data"
                    />
                </div>
                <div
                    class="block"
                    style="height:40%"
                >
                    <Bar
                        v-if="bar_data"
                        id="bar"
                        :data="bar_data"
                        :name="'设备运行能耗'"
                    />
                </div>
                <div
                    class="block"
                    style="height:30%"
                >
                   <LineBox
                       v-if="line_data"
                       id="line2"
                       :data="line_data"
                   />
                </div>
            </template>
        </div>
        <div
            ref="rightTopBox"
            class="rightTopBox wow backInRight"
        >
            <div
                class="block "
                style="height:27%"
            >
                <Weather
                    v-if="maps && weather"
                    id="maps2"
                    :data="maps"
                    :weather="weather"
                />
            </div>
            <div
                class="block "
                style="height:40%"
            >
                <LineBox
                    v-if="recentItemCount && tab===0 && echartStatus "
                    id="recentItemCount"
                    :data="recentItemCount"
                />
                <LineBox
                    v-if="line && line[1] && tab===1 && echartStatus"
                    id="line1"
                    :data="line[1]"
                />
                <Bar
                    v-if="bar_data1 && tab===2 && echartStatus"
                    id="bar2"
                    :data="bar_data1"
                    :name="'药剂用量'"
                />


            </div>
            <div
                class="block "
                style="height:33%"
            >
                <Alarm
                    v-if="fail && tab===0"
                    :data="fail"
                    title="巡检结果不合格提醒"
                />
                <Alarm
                    v-if="alarm && tab===1"
                    :data="alarm"
                    title="设备报警"
                />
                <Alarm
                    v-if="alarm_data && tab===2"
                    :data="alarm_data"
                    title="设备报警记录"
                />
            </div>
        </div>
        <div
            v-if="activeStatus && activeData && form_data "
            :class="{'allScene':allScene}"
            class="canvasBox "
        >
            <el-button-group class="buttonGroup">
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="allSceneF"
                > 进入{{ allScene ? "窗口" : "全景" }}</el-button>
                <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="toDetail()"
                >查看详情</el-button>
                <el-button
                    icon="el-icon-close"
                    size="small"
                    @click="closeCanvas"
                ></el-button>
            </el-button-group>
            <!-- <Canvas
                id="three"
                ref="three"
                :cameraposition="camera"
                :row="activeData"
            /> -->
            <Canvas
                id="three"
                ref="canvas"
                type="radio"
                :row="activeData"
                :realdata="realdata"
                :detail="form_data"
                :cameraposition="camera"
                @canvasBack="canvasBack"
            />
        </div>
    </div>
</template>

<script>
import { Map, Pie, LineBox, Recent, Alarm, Weather, Bar, Today, Canvas } from '@/components'
import { defaultParams, getVideoOnlineCount, getEquipmentTaskCount, getPlanCheckInfo, todayIncrease, getRecentItemCount, failNotice,getPieData,getBarData,getAlarmData } from '@/api/index'
import { realdataSelect, getDeviceShow } from '@/api/site'
import { realdataSelect as mRealdataSelect, getDeviceShow as mGetDeviceShow } from '@/api/device'
import { mapGetters } from 'vuex'
import { WOW } from 'wowjs'
import AMap from 'AMap'
import { getMenu, getPriv } from '@/utils/auth'
export default {
    name: 'Dashboard',
    components: { Map, Pie, LineBox, Recent, Alarm, Weather, Bar, Today, Canvas },
    data() {
        return {
            maps: undefined, // 天气预报
            centent: undefined,
            weather: undefined, // 今天天气
            online: [], // 摄像头在线情况
            pie_data: [], // 饼图假数据
            bar_data: [], // 柱状图假数据
            bar_data1: [], // 柱状图假数据
            line_data: [], // 折线图假数据
            alarm_data: undefined, // 列表假数据
            line: [], // 设备最近运行情况
            recent: undefined, // 最新设备变量数据
            alarm: undefined, // 最新报警数据
            tab: 0, // tab 切换
            active: 99, //
            video_active: false, //
            equipment_active: false, //
            device_active: false, //
            beekeeping_active: false, //养蜂记录显示状态
            vvideo_active: false, //视频记录显示状态
            fp_device_active: false, //人脸识别设备显示状态
            mdevice_active: false, //智能设备
            fupin_active: false, //精准扶贫
            viewpoint_active: false, //乡村景点
            product_active: false, //特色农产品
            taskCount: undefined, // 站点任务合格情况
            check_rate: [], // 巡检计划执行情况
            quality_rate: [], // 巡检计划合格比例
            today: undefined, // 今日新增
            recentItemCount: undefined, // 最近七天任务合格率
            echartStatus: true, // 防抖
            mapStatus: true,
            fail: undefined, // 巡检结果不合格列表
            activeData: undefined, // 选择的 gltf数据
            activeStatus: false,
            allScene: false,
            socket: undefined,
            ditu: 0,
            id: null,
            camera: undefined, // 摄像机位置
            realdata: undefined,
            form_data: undefined,
            mesh: [],
            point_list: [],
            setTimeOutFun: undefined,
            prives:{
              'video' : false,
              'inspection' : false,//巡检站点
              'device' : false,
              'beekeeping' : false,
              'vvideo' : false,
              'facepass' : false,//人脸识别
              'mdevice' : false,
              'fupin' : false,
              'viewpoint' : false,
              'product' : false
            }
        }
    },
    computed: {
        ...mapGetters(['data'])
    },

    created() {
        this.getData()
        this.socket = new WebSocket(process.env.VUE_APP_WS_URL)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
        setTimeout(() => {
            if (this.socket.readyState === this.socket.OPEN) {
                this.socket.send(`${this.data.user_info.cid}|recentVarData`)
                this.socket.send(`${this.data.user_info.cid}|recentAlarmData`)
                this.socket.send(`${this.data.user_info.cid}|recentVarCount`)
                this.socket.send(`${this.data.user_info.cid}|getLineData`)
            }
        }, 500)
    },
    mounted() {
        this.polling()
        new WOW({
            live: false,
            offset: 0
        }).init()
    },
    destroyed() {
        // 销毁监听
        this.socket.close() // 关闭this.socketet
        this.socket.onclose = this.close()
    },
    methods: {
        /**
         * @name: 去详情页
         */
        toDetail() {
            clearInterval(this.setTimeOutFun)
            this.$router.push(`/equipmentDetail?id=${this.id}`)
        },
        qieh(e) {
            this.ditu = e
            this.$refs.maps.addType(e)
        },
        open() {
            console.log('socket连接成功')
        },
        error(e) {
            console.log(e, '连接错误')
        },
        getMessage(msg) {
            const data = JSON.parse(msg.data)
            if (data.code === 1) {
                switch (data.method) {
                    case 'recentVarData':
                        this.recent = data.data.list
                        break
                    case 'getLineData':
                        this.line_data = []
                        var item = data.data
                          var tmp_list = []
                          tmp_list.push(item.ydata1)
                          tmp_list.push(item.ydata2)
                          if(item.ydata3){
                            tmp_list.push(item.ydata3)
                          }
                          if(item.ydata4){
                            tmp_list.push(item.ydata4)
                          }
                          this.line_data = {
                              name: item.name,
                              list: tmp_list,
                              xdata: item.xdata
                          }
                        break
                    case 'recentAlarmData'://设备报警
                        this.alarm = data.data.list
                         console.log(this.alarm,'recentAlarmData')
                        break
                    case 'recentVarCount'://折线图运行情况
                        this.line = [];
                        data.data.list.forEach(item => {
                          var tmp_list = []
                          tmp_list.push(item.ydata1)
                          tmp_list.push(item.ydata2)
                          if(item.ydata3){
                            tmp_list.push(item.ydata3)
                          }
                            this.line.push({
                                name: item.name,
                                xdata: item.xdata,
                                list: tmp_list
                            })
                        })
                        break
                }
            }
        },
        close() {
            console.log('socket已经关闭')
        },
        wsMessage(e) {
            console.log(e, '成功')
        },
        wsError(e) {
            console.log(e, '错误')
        },
        polling() {
            if (this.$refs.leftTopBox.offsetHeight > 100) {
                this.echartStatus = true
                this.mapStatus = true
                return false
            } else {
                this.echartStatus = false
                this.mapStatus = false
                setTimeout(() => {
                    this.polling()
                }, 100)
            }
        },
        handleIcon(){ //处理图标权限控制
          //获取有权限的菜单数据
          console.log(getMenu(),'getmenu')
          // var tmp_prive = ['video','inspection','device','beekeeping','vvideo','facepass','mdevice','fupin','viewpoint','product']//视频监控，
          var tmp_meuns = getMenu()
          tmp_meuns.forEach(item => {
            // var index = tmp_prive.indexOf(item.priv)
            // if(index != -1){
            if(this.prives[item.priv] != undefined){
              this.prives[item.priv] = true
            }else if(item.childs){
              item.childs.forEach(value => {
                // var index = tmp_prive.indexOf(value.priv)
                // if(index != -1){
                if(this.prives[value.priv] != undefined){
                  console.log(value.priv)
                  this.prives[value.priv] = true
                }
              })
            }

          })
        },
        /**
         * @name: 获取数据
         * @param {*}
         * @return {*}
         */
        getData() {
          this.handleIcon()
            const _this = this
            defaultParams({}).then(res => {
                if (res.code === 1) {
                    this.centent = res.data
                    AMap.plugin('AMap.Weather', function () {
                        // 创建天气查询实例
                        var weather = new AMap.Weather()
                        // 执行实时天气信息查询
                        weather.getLive(res.data.city, function (err, data) {
                            if (!err) {
                                _this.weather = data
                            }
                        })
                        weather.getForecast(res.data.city, function (err, data) {
                            if (!err) {
                                _this.maps = data
                            }
                        })
                    })
                }
            })
            getVideoOnlineCount({}).then(pie => {
                if (pie.code === 1) {
                    for (const i in pie.data.data) {
                        this.online.push(pie.data.data[i])
                    }
                }
            })
            getPieData({}).then(pie => { //饼图数据-------------------------
                if (pie.code === 1) {
                    for (const i in pie.data.rate_data1) {
                        this.pie_data.push(pie.data.rate_data1[i])
                    }
                }
            })
            getBarData({}).then(barData => { //柱状图数据-------------------------
                if (barData.code === 1) {
                    this.bar_data = barData.data.data1
                    this.bar_data1 = barData.data.data2

                }
            })
            getAlarmData({}).then(alarmData => { //列表数据-------------------------
                if (alarmData.code === 1) {
                    this.alarm_data = alarmData.data.list

                }
            })
            getEquipmentTaskCount({}).then(taskCount => {
                if (taskCount.code === 1) {
                    this.taskCount = taskCount.data
                }
            })
            getPlanCheckInfo({}).then(planCheckInfo => {
                if (planCheckInfo.code === 1) {
                    for (const i in planCheckInfo.data.check_rate) {
                        this.check_rate.push(planCheckInfo.data.check_rate[i])
                    }
                    for (const i in planCheckInfo.data.quality_rate) {
                        this.quality_rate.push(planCheckInfo.data.quality_rate[i])
                    }
                }
            })
            todayIncrease({}).then(today => {
                if (today.code === 1) {
                    this.today = today.data
                }
            })
            getRecentItemCount({}).then(res => {
                if (res.code === 1) {
                    // const list = [{
                    //     data: [3, 4, 6, 10, 23, 14, 24],
                    //     name: '11'
                    // }, {
                    //     data: [10, 2, 1, 15, 23, 12, 20],
                    //     name: '22'
                    // }, {
                    //     data: [13, 14, 2, 1, 21, 13, 29],
                    //     name: '33'
                    // }, {
                    //     data: [6, 3, 2, 11, 25, 12, 26],
                    //     name: '44'
                    // }, {
                    //     data: [13, 34, 46, 20, 3, 4, 4],
                    //     name: '55'
                    // }, {
                    //     data: [23, 3, 4, 20, 33, 11, 34],
                    //     name: '66'
                    // }, {
                    //     data: [12, 3, 5, 20, 33, 34, 34],
                    //     name: '77'
                    // }]
                    this.recentItemCount = {
                        name: '最近七天任务合格率',
                        list: res.data.list,
                        // list: list,
                        xdata: res.data.days
                    }
                }
            })
            /**
             * @name: 巡检结果不合格提醒
             * @param {*}
             * @return {*}
             */
            failNotice({}).then(res => {
                if (res.code === 1) {
                    this.fail = res.data.list
                    this.fail = this.fail.map(item => {
                        this.$set(item, 'var_alias', item.name)
                        this.$set(item, 'recordtime', item.utime)
                        return item
                    })
                }
            })
        },
        /**
         * @name: 切换 tab
         * @param {*} e
         * @return {*}
         */
        setTab(e) {
            this.echartStatus = false
            this.tab = e
            setTimeout(() => {
                this.echartStatus = true
            }, 100)
        },
        /**
         * @name: 选择类型
         * @param {*} e
         * @return {*}
         */
        tipSelect(e) {
          //video equipment device
            /* if(e == 'video'){
              this.video_active = !this.video_active
            }else if(e == 'equipment'){
              this.equipment_active = !this.equipment_active
            }else if(e == 'device'){
              this.device_active = !this.device_active
            } */
            this[e + '_active'] = !this[e + '_active']
            this.active = e
            this.$refs.maps.addMarker(e, this[e + '_active'])
        },
        /**
         * @name: 地图返回的数据
         * @param {*} e
         * @return {*}
         */
        mapBack(e) {
            this.activeData = {
                file: e.back_img
            }
            this.camera = {
                x: e.camera_x && Number(e.camera_x),
                y: e.camera_y && Number(e.camera_y),
                z: e.camera_z && Number(e.camera_z)
            }
            this.id = e.id
            console.log(e.unique_code,'mapBack')
            if(e.unique_code == '' || e.unique_code == 'undefined'){
              this.getrealdataSelect(this.id)
            }else{
              this.getrealdataSelectM(this.id)//小设备
            }

        },
        //小设备用的
        async getrealdataSelectM(control_id) {
            const res = await mGetDeviceShow({ id: control_id })
            if (res.code === 1) {
                this.form_data = res.data.form_data
                this.point_list = res.data.point_list
                this.activeStatus = true
            }
        },
        async getrealdataSelect(control_id) {
            const res = await getDeviceShow({ id: control_id })
            if (res.code === 1) {
                this.form_data = res.data.form_data
                this.point_list = res.data.point_list
                this.activeStatus = true
            }
        },
        /**
         * @name: canvas返回的数据
         * @param {*} e
         */
        canvasBack(e,model_type) {
            this.mesh = e
            this.realdataSelectFun(model_type)
            this.setTimeOutFun = setInterval(() => {

                this.realdataSelectFun(model_type)
            }, 8000)
        },
        /**
         * @name: 获取 realdataSelect
         * @return {*}
         */
        async realdataSelectFun(model_type) {
            if(model_type == 'mdevice'){
              var res2 = await mRealdataSelect({ control_id: this.id })
            }else{
              var res2 = await realdataSelect({ control_id: this.id })
            }
            if (res2.code === 1) {
                this.realdata = res2.data.list
                if (this.mesh && this.mesh.children && this.mesh.children.length) {
                    const mesh = this.returnMesh()
                    // this.$refs.canvas.clear(mesh)
                    this.$refs.canvas.addDIan(mesh, this.point_list,'realdata')
                }
            }
        },
        /**
        * @name: 返回 mesh
        * @param {*}
        * @return {*}
        */
        returnMesh() {
            const mesh = []
            this.point_list.forEach(item => {
                const m = this.mesh.children.filter(me => me.name === item.mesh_name)
                if (m.length > 0) {
                    mesh.push(...m)
                }
            })
            return mesh
        },
        /**
         * @name: 关闭 canvas
         * @param {*}
         * @return {*}
         */
        closeCanvas() {
            this.activeData = undefined
            clearInterval(this.setTimeOutFun)
            this.activeStatus = false
        },
        /**
         * @name: 全屏
         * @param {*}
         * @return {*}
         */
        allSceneF() {
            this.allScene = !this.allScene
            this.$nextTick(() => {
                this.$refs.three.onWindowResize()
            })
        },
        /**
         * @name: 返回点的类型
         * @param {*} e
         * @return {*}
         */
        typeBack(e) {
            this.active = e
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
.tabBox {
    position: fixed;
    left: 45%;
    margin-left: -150px;
    width: 500px;
    z-index: 2;
    top: 80px;
    text-align: center;
    color: #bbb;
    span {
        padding: 0 20px;
        cursor: pointer;
        &.active {
            color: #fff;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                left: 50%;
                bottom: -10px;
                margin-left: -12.5px;
                height: 1px;
                width: 25px;
                background: #6fd0ff;
            }
        }
    }
}
.leftTopBox,
.rightTopBox {
    position: fixed;
    left: 0;
    z-index: 2;
    top: 60px;
    bottom: 0;
    padding: 20px;
    width: 420px;
    background-image: linear-gradient(
        to right,
        rgba(13, 26, 68, 0.7),
        rgba(0, 0, 0, 0)
    );
    // #0d1a44
    .block {
        height: 25%;
        overflow: hidden;
    }
    .block2 {
        height: 50%;
        overflow: hidden;
    }
}
.tipBox {
    position: fixed;
    z-index: 2;
    top: 100px;
    right: 455px;
    width: 30px;
    background: #151928;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    .iconfont {
        line-height: 30px;
        color: #bbb;
        cursor: pointer;
        &:hover,
        &.active {
            opacity: 0.5;
            background: #315168;
        }
    }
}
.rightTopBox {
    left: auto;
    right: 0;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(13, 26, 68, 0.7)
    );
}
.canvasBox {
    position: fixed;
    left: 0;
    z-index: 1;
    top: 60px;

    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    .buttonGroup {
        position: absolute;
        right: 420px;
        top: 10px;
        z-index: 11;
    }
    &.allScene {
        top: 0;
        z-index: 101;
    }
}
</style>
