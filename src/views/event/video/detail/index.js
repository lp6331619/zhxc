/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:36:41
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-19 12:08:15
 */
import { VideoDetail,turnDirection,presetMove,ptzMirror } from '@/api/information'
import { getWriteVarList, classVideoList, addControl, checkPass} from '@/api/site'
import request from '@/utils/request'
export default {
    components: {
    },
    data() {
        return {
            data: undefined,
            loading: false,
            url: 'https://open.ys7.com/ezopen/h5/iframe_se',
            button: [],
            tab: 1,
            list: [],
            activeNames: 0,
            active: null,
            control_value: '',
            var_id: '',
            device_name: '',
            is_open:true
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    created() {
        this.getDetail()
        this.getList()
    },
    methods: {
        // 获取数据
        async getDetail() {
            this.loading = true
            const res = await VideoDetail({ id: this.id })
            if (res.code === 1) {
                this.data = res.data
                this.device_name = res.data.info.name
                this.url += `?url=${this.data.url}&autoplay=0&audio=1&accessToken=${this.data.url_param_arr.accessToken}&templete=2`
                if (this.data.formData) {
                  this.button.write_text_list = res.data.write_text;
                  this.button.write_btn_list = res.data.write_var_list;
                    /* const r = await getWriteVarList({ site_id: this.data.formData.site_id })
                    if (r.code = 1) {
                        this.button = r.data
                    } */
                }
            }
            this.loading = false
        },
        async getList() {
            const res = await classVideoList({})
            if (res.code === 1) {
                this.list = res.data.list
            }
        },
        handleChange(e) {
        },
        /**
         * @name: 切换视频
         * @param {*} e
         * @return {*}
         */
        async open(e) {
            this.active = e.id
            this.device_name = e.name
            const res = await VideoDetail({ id: e.id })
            if (res.code === 1) {
                this.data = res.data
                this.url = `https://open.ys7.com/ezopen/h5/iframe_se?url=${res.data.url}&autoplay=0&audio=1&accessToken=${res.data.url_param_arr.accessToken}&templete=2`
            }
        },
        /**
         * @name: 操作
         * @param {*}
         * @return {*}
         */
        async subFun(control_value, var_id) {
            const res = await addControl({ id: this.id, control_value: control_value, var_id: var_id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
            } else if (res.code === 100) {
                this.$prompt('请输入操作密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '密码格式不正确'
                }).then(({ value }) => {
                    checkPass({ password: value, device_id: this.id }).then(res => {
                        if (res.code === 1) {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            })
                            this.subFun(control_value, var_id)
                        }
                    })
                }).catch(() => {
                })
            }
        },

        async trunDir(dir){
          var data = {
                /* accessToken : this.data.url_param_arr.accessToken,
                deviceSerial : this.data.url_param_arr.deviceSerial, */
                id:this.data.info.id,
                channelNo : this.data.url_param_arr.channelNo,
                direction : dir,
                speed : 1,
            }
            const rs = await turnDirection(data)
            /* var rs = await request({
                url: 'https://open.ys7.com/api/lapp/device/ptz/start',
                method: 'post',
                data
            }) */
            console.log(rs)
        },
        async presetMove(index){
          var data = {
                id:this.data.info.id,
                channelNo : this.data.url_param_arr.channelNo,
                index : index,
            }
            const rs = await presetMove(data)
        },
        async ptzMirror(command){
          var data = {
                id : this.data.info.id,
                channelNo : this.data.url_param_arr.channelNo,
                command : command,
            }
            const rs = await ptzMirror(data)
        },
        async stopVideo(){
          var player = document.getElementById('ysOpenDevice').contentWindow;
          /* iframe 支持方法 */
          player.postMessage("stop", "https://open.ys7.com/ezopen/h5/iframe") /* 结束 */
        },
        async turnOnAnOff(){
          var player = document.getElementById('ysOpenDevice').contentWindow;
          if(this.is_open){
            player.postMessage("stop", "https://open.ys7.com/ezopen/h5/iframe") /* 结束 */
            this.is_open = false
          }else{
            /* iframe 支持方法 */
            player.postMessage("play", "https://open.ys7.com/ezopen/h5/iframe") /* 播放 */
            this.is_open = true
          }

        }


    }
}

//-----------------------遥控器js---------------------------
   /* var accessToken="{$info['access_token']}";
    var deviceSerial = "{$info['device_serial']}";
    var channelNo = "{$info['channel_no']}";
    var resdata = '';
    $("#up").mousedown(function(){turn(0)});
    $("#down").mousedown(function(){turn(1)});
    $("#left").mousedown(function(){turn(2)});
    $("#right").mousedown(function(){turn(3)});
    $("#left-up").mousedown(function(){turn(4)});
    $("#left-down").mousedown(function(){turn(5)});
    $("#right-up").mousedown(function(){turn(6)});
    $("#right-down").mousedown(function(){turn(7)});
    $("#enlarge").mousedown(function(){turn(8)});
    $("#narrow").mousedown(function(){turn(9)});
    $("#focus-add").mousedown(function(){turn(10)});
    $("#focus-reduce").mousedown(function(){turn(11)});

    $(".stop").mouseup(function(){stop()});

    function turn(dir){

        $.ajax({
            url:'https://open.ys7.com/api/lapp/device/ptz/start',
            type:'POST',
            data:{
                accessToken : accessToken,
                deviceSerial : deviceSerial,
                channelNo : channelNo,
                direction : dir,
                speed : 1,
            },
            dataType:'json',
            async:false,
            success: function(result ) {
                if(result['code'] != 200){
                    layer.msg(result['msg']);
                }
                return true;
            }
        });
    }
    function stop(){
        $.ajax({
            url:'https://open.ys7.com/api/lapp/device/ptz/stop',
            type:'POST',
            data:{
                accessToken : accessToken,
                deviceSerial : deviceSerial,
                channelNo : channelNo,
            },
            dataType:'json',
            success: function(result) {
                if(result['code'] != 200){
                    layer.msg(result['msg']);
                }
                return true;
            }
        });
    }

    function preset(set){
        $.ajax({
            url:'https://open.ys7.com/api/lapp/device/preset/move',
            type:'POST',
            data:{
                accessToken : accessToken,
                deviceSerial : deviceSerial,
                channelNo : channelNo,
                index : set,
            },
            dataType:'json',
            success: function(result) {
                if(result['code'] != 200){
                    layer.msg(result['msg']);
                }
                return true;
            }
        });
    } */
