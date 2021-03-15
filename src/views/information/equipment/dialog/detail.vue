<template>
    <div>
        <el-dialog
            :title="title"
            custom-class="w500"
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
                    label="变量符号:"
                    prop="var_name"
                >
                    <el-input
                        v-model="form.var_name"
                        placeholder="请输入符号"
                        :disabled="disabled"
                    ></el-input>
                    注意:变量符号不能重复
                </el-form-item>

                <el-form-item
                    label="变量名称:"
                    prop="var_alias"
                >
                    <el-input
                        v-model="form.var_alias"
                        placeholder="请输入变量名称"
                        :disabled="disabled"
                    ></el-input>

                </el-form-item>
                <el-form-item
                    label="区名称:"
                    prop="district_name"
                >
                    <el-select
                        v-model="form.district_name"
                        placeholder="请选择区名称"
                    >
                        <el-option
                            v-for="(items) in prepare.district_name"
                            :key="items.id"
                            :label="items.district_name"
                            :value="items.district_name"
                        >
                        </el-option>
                    </el-select>
                    <!-- <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="openType('partition_type')"
                    >+区名管理</el-button> -->
                </el-form-item>
                <el-form-item
                    label="组名称:"
                    prop="group_name"
                >
                    <el-select
                        v-model="form.group_name"
                        placeholder="请选择组名称"
                    >
                        <el-option
                            v-for="(items) in prepare.group_name"
                            :key="items.id"
                            :label="items.group_name"
                            :value="items.group_name"
                        >
                        </el-option>
                    </el-select>
                    <!-- <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="openType('gateway_name')"
                    >+组名管理</el-button> -->
                </el-form-item>
                <el-form-item
                    label="设备名称:"
                    prop="dev_name"
                >
                    <el-select
                        v-model="form.dev_name"
                        placeholder="请选择设备名称"
                    >
                        <el-option
                            v-for="(items) in prepare.dev_name"
                            :key="items.id"
                            :label="items.dev_name"
                            :value="items.dev_name"
                        >
                        </el-option>
                    </el-select>
                    <!-- <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="openType('dev_name')"
                    >+变量管理</el-button> -->
                </el-form-item>
                <el-form-item
                    v-if="form.gateway_name===491"
                    label="变量写入值:"
                    prop="var_value"
                >
                    <el-input
                        v-model="form.var_value"
                        placeholder="请输入变量写入值"
                        type="number"
                        :disabled="disabled"
                    ></el-input>
                    只能填写0和1
                </el-form-item>
                <!-- <el-form-item
                    v-if="prepare.data_type"
                    label="数据类型:"
                    prop="data_type"
                >
                    <el-select
                        v-model="form.data_type"
                        placeholder="请选择数据类型"
                    >
                        <el-option
                            v-for="(items,i) in prepare.data_type"
                            :key="Number(i)"
                            :label="items"
                            :value="Number(i)"
                        >
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item
                    v-if="prepare.recode_type"
                    label="记录方式:"
                    prop="recode_type"
                >
                    <el-select
                        v-model="form.recode_type"
                        placeholder="请选择记录方式"
                    >
                        <el-option
                            v-for="(items,i) in prepare.recode_type"
                            :key="i"
                            :label="items.value"
                            :value="Number(items.key)"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="prepare.class_type"
                    label="变量分类:"
                    prop="class_type"
                >
                    <el-select
                        v-model="form.class_type"
                        placeholder="请选择变量分类"
                    >
                        <el-option
                            v-for="(items,i) in prepare.class_type"
                            :key="i"
                            :label="i+'('+items+')'"
                            :value="i"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item
                    v-if="prepare.type"
                    label="读写类型:"
                    prop="type"
                >
                    <el-radio-group v-model="form.type">
                        <el-radio
                            v-for="(items,i) in prepare.type"
                            :key="i"
                            :label="Number(i)"
                        >{{ items }}</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item
                    label="连接地址:"
                    prop="addr"
                >
                    <el-input
                        v-model="form.addr"
                        placeholder="连接地址"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="数据类型:"
                    prop="datatype"
                >
                    <el-input
                        v-model="form.datatype"
                        placeholder="数据类型"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="单位:"
                    prop="unit"
                >
                    <el-input
                        v-model="form.unit"
                        placeholder="请输入单位"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="最低值:"
                    prop="min"
                >
                    <el-input
                        v-model="form.min"
                        placeholder="请输入最低值"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="!disabled"
                    label="最高值:"
                    type="number"
                    prop="max"
                >
                    <el-input
                        v-model="form.max"
                        placeholder="请输入最高值"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="!disabled"
                    label="记录定时时间:"
                    type="number"
                    prop="trigtime"
                >
                    <el-input
                        v-model="form.trigtime"
                        placeholder="请输入记录定时时间"
                    ><template slot="append">S</template></el-input>
                </el-form-item>
                <el-form-item
                    label="变化触发阀值:"
                    type="number"
                    prop="sc_trig"
                >
                    <el-input
                        v-model="form.sc_trig"
                        placeholder="请输入变化触发阀值"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="低低报警:"
                    type="number"
                    prop="lim_LL"
                >
                    <el-input
                        v-model="form.lim_LL"
                        placeholder="请输入低低报警"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="低报警:"
                    type="number"
                    prop="lim_L"
                >
                    <el-input
                        v-model="form.lim_L"
                        placeholder="请输入低报警"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="高报警:"
                    type="number"
                    prop="lim_H"
                >
                    <el-input
                        v-model="form.lim_H"
                        placeholder="请输入高报警"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="高高报警:"
                    type="number"
                    prop="lim_HH"
                >
                    <el-input
                        v-model="form.lim_HH"
                        placeholder="请输入高高报警"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
            </el-form>
            <type
                v-if="innerVisible"
                :status="innerVisible"
                :scene="sceneType"
                @emitOut="emitOutPriv"
            />
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
import { addConfig, editConfig, varConfigParam } from '@/api/information'
import type from './type'
export default {
    name: 'EditUpdate',
    components: {
        type
    },
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
        }
    },
    data() {
        return {
            setStatusStatus: false,
            title: '创建变量',
            innerVisible: false,
            form: {
                type: 1,
                data_type: '',
                var_name: '',
                var_alias: '',
                partition_type: '',
                gateway_name: '',
                dev_name: null,
                var_value: null,
                min: '',
                max: '',
                trigtime: '',
                sc_trig: '',
                class_type: '',
                recode_type: '',
                lim_LL: '',
                lim_L: '',
                lim_H: '',
                lim_HH: ''
            },
            formRules: {
                type: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                data_type: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                var_name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                var_alias: [
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
                gateway_name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                dev_name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                var_value: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            sceneType: 'dev_name',
            prepare: {},
            disabled: false
        }
    },
    mounted() {
        switch (this.scene) {
            case 'create':
                this.title = '创建变量'
                break
            case 'update':
                this.title = '编辑变量'
                this.getDetail()
                break
            case 'detail':
                this.disabled = true
                this.title = '变量详情'
                this.getDetail()
                break
        }
        this.getPrepare()
        this.setStatusStatus = this.status
    },
    methods: {
        // 获取详情
        getDetail() {
            this.form = JSON.parse(JSON.stringify(this.item))
            delete this.form.mtime
            delete this.form.ctime
            delete this.form.dtime
        },
        async getPrepare() {
            this.loading = true
            // 获取相关数据
            const res = await varConfigParam({})
            if (res.code === 1) {
                this.$set(this.prepare, 'recode_type', res.data.recode_type)
                this.$set(this.prepare, 'class_type', res.data.class_type)
                this.$set(this.prepare, 'data_type', res.data.data_type)
                this.$set(this.prepare, 'type', res.data.type)
            }
            /* const partition_type = await getPartitionTypes({})
            if (partition_type.code === 1) {
                this.$set(this.prepare, 'partition_type', partition_type.data.list)
            }
            const gateway_name = await getGatewayNames({})
            if (gateway_name.code === 1) {
                this.$set(this.prepare, 'gateway_name', gateway_name.data.list)
            }
            const var_alias = await varlistSelect({})
            if (var_alias.code === 1) {
                this.$set(this.prepare, 'var_alias', var_alias.data.list)
            }
            const dev_name = await getDevNames({})
            if (dev_name.code === 1) {
                this.$set(this.prepare, 'dev_name', dev_name.data.list)
            } */
            this.loading = false
        },
        // 打开对应的type
        openType(e) {
            this.sceneType = e
            this.innerVisible = true
        },
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            addConfig(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            editConfig(params).then((res) => {
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
            this.$emit('emitOut', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus, true)
        },
        emitOutPriv(d, e, s) {
            this[d] = e
            !s && this.getPrepare()
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
