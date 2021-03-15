<template>
    <div>
        <el-dialog
            :title="title"
            width="30%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <el-form
                ref="setDetail"
                v-loading="loading"
                class="formBox"
                :model="form"
                :rules="formRules"
                auto-complete="on"
                label-position="right"
                label-width="120px"
            >
                <el-form-item
                    label="站点名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入站点名称"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="站点编码:"
                    prop="code"
                >
                    <el-input
                        v-model="form.code"
                        placeholder="请输入站点编码"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="厂商:">
                    <el-input
                        v-model="form.manufacturer"
                        placeholder="请输入厂商"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="型号:">
                    <el-input
                        v-model="form.model"
                        placeholder="请输入型号"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="芯片ID:"
                    prop="bluetooth_id"
                >
                    <el-input
                        v-model="form.bluetooth_id"
                        placeholder="请输入芯片ID"
                        type="number"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="芯片检测:"
                    prop="is_open"
                >
                    <el-switch
                        v-model="form.is_open"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item
                    label="芯片距离:"
                    prop="distance"
                >
                    <el-input
                        v-model="form.distance"
                        placeholder="请输入芯片距离"
                        type="number"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="定位:"
                    prop="longitude"
                >
                    <el-select
                        v-model="address"
                        class="w100"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        @change="handleSelect"
                    >
                        <template v-if="tips.length">
                            <el-option
                                v-for="(pois) in tips"
                                :key="pois.value"
                                :label="pois.address+'('+pois.value+')'"
                                :value="pois.value"
                            >
                            </el-option>
                        </template>
                    </el-select>
                    <div
                        id="map"
                        class="map"
                    ></div>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { equipmentEdit, equipmentAdd } from '@/api/onsite'
import AMap from 'AMap'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '创建站点',
            form: {
                name: null,
                code: '',
                manufacturer: '',
                model: '',
                bluetooth_id: null,
                is_open: 1,
                distance: null,
                longitude: undefined,
                latitude: undefined
            },
            formRules: {
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                bluetooth_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                distance: [
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
            lnglat: undefined
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        switch (this.scene) {
            case 'create':
                this.title = '创建站点'
                this.mapInit()
                break

            case 'update':
                this.title = '编辑站点'
                this.edit()
                break

            case 'detail':
                this.disabled = true
                this.title = '站点详情'
                this.edit()
                break
        }
    },
    methods: {
        mapInit() {
            // 地图
            this.$nextTick(() => {
                this.map = new AMap.Map('map', {
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
                if (this.scene !== 'create') {
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
        edit() {
            this.form = this.item
            delete this.form.dtime
            delete this.form.ctime
            delete this.form.mtime
            this.address = this.item.longitude + ',' + this.item.latitude
            this.mapInit()
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
        // 编辑
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            equipmentAdd(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            equipmentEdit(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        default:
                            this.handleClose()
                    }
                }
            })
        },
        // 成功后
        callback(res) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.setStatusStatus = false
                this.emitOut()
                this.$refs.setDetail.resetFields()
            }
        },
        emitOut() {
            this.$emit('emitOut', 'diologStatus', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologStatus', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.map {
    width: 100%;
    height: 200px;
    margin-top: 20px;
}
</style>
