<template>
    <div>
        <el-dialog
            :title="title"
            width="100%"
            append-to-body
            :fullscreen="true"
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
                <div class="titlebox">颜色配置</div>
                <div
                    v-for="(child,c) in form.color_setting"
                    :key="c"
                    class="flex"
                >
                    <el-form-item
                        :label="formText['group_name']"
                        :prop="`color_setting.${c}.group_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list"
                            v-model="child['group_name']"
                            :placeholder="`请选择${formText['group_name']}`"
                            @change="changeGroupname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list"
                                :key="l"
                                :label="l"
                                :value="l"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="child['group_name'] "
                        :label="formText['dev_name']"
                        :prop="`color_setting.${c}.dev_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list&&prepare.list[child['group_name']]"
                            v-model="child['dev_name']"
                            :placeholder="`请选择${formText['dev_name']}`"
                            @change="changeDevname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list[child['group_name']]"
                                :key="l"
                                :label="l"
                                :value="l"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="child['group_name'] && child['dev_name']"
                        :label="formText['var_name']"
                        :prop="`color_setting.${c}.var_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list&&prepare.list[child['group_name']]&&prepare.list[child['group_name']][child['dev_name']]"
                            v-model="child['var_name']"
                            :placeholder="`请选择${formText['var_name']}`"
                            @change="changeVarname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list[child['group_name']][child['dev_name']]"
                                :key="l"
                                :label="list"
                                :value="l"
                            >{{ list }}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="formText['critical']"
                        :prop="`color_setting.${c}.critical`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-input v-model="child['critical']"></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="formText['color']"
                        :prop="`color_setting.${c}.color`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-color-picker v-model="child['color']"></el-color-picker>
                    </el-form-item>

                    <el-form-item
                        :label="formText['judge']"
                        :prop="`color_setting.${c}.judge`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select v-model="child['judge']">
                            <el-option
                                label=">"
                                value=">"
                            ></el-option>
                            <el-option
                                label="<"
                                value="<"
                            ></el-option>
                            <el-option
                                label="="
                                value="="
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button
                        type="danger"
                        @click="delColor('color_setting',c)"
                    >删除</el-button>
                </div>
                <el-form-item label=" ">
                    <el-button @click="addColor()">添加颜色配置</el-button>
                </el-form-item>
                <div class="titlebox">视窗配置</div>
                <el-form-item
                    :label="formText['title']"
                    prop="title"
                    :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                >
                    <el-input
                        v-model="form['title']"
                        style="width:200px"
                    ></el-input>
                </el-form-item>
                <div
                    v-for="(child,i) in form.view_setting"
                    class="flex"
                >
                    <el-form-item
                        :label="formText['name']"
                        :prop="`view_setting.${i}.name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-input
                            v-model="child['name']"
                            :placeholder="`请输入${formText['name']}`"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="formText['group_name']"
                        :prop="`view_setting.${i}.group_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list"
                            v-model="child['group_name']"
                            :placeholder="`请选择${formText['group_name']}`"
                            @change="changeGroupname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list"
                                :key="l"
                                :label="l"
                                :value="l"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="formText['dev_name']"
                        :prop="`view_setting.${i}.dev_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list&&prepare.list[child['group_name']]"
                            v-model="child['dev_name']"
                            :placeholder="`请选择${formText['dev_name']}`"
                            @change="changeDevname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list[child['group_name']]"
                                :key="l"
                                :label="l"
                                :value="l"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="formText['var_name']"
                        :prop="`view_setting.${i}.var_name`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-select
                            v-if="prepare.list&&prepare.list[child['group_name']]&&prepare.list[child['group_name']][child['dev_name']]"
                            v-model="child['var_name']"
                            :placeholder="`请选择${formText['var_name']}`"
                            @change="changeVarname($event,child)"
                        >
                            <el-option
                                v-for="(list,l) in prepare.list[child['group_name']][child['dev_name']]"
                                :key="l"
                                :label="list"
                                :value="l"
                            >{{ list }}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        :label="formText['flo_num']"
                        :prop="`view_setting.${i}.flo_num`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-input
                            v-model="child['flo_num']"
                            text="number"
                            :placeholder="`请输入${formText['flo_num']}`"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="formText['unit']"
                        :prop="`view_setting.${i}.unit`"
                        :rules="{ required: true, message: '不能为空!', trigger: 'blur' }"
                    >
                        <el-input
                            v-model="child['unit']"
                            :placeholder="`请输入${formText['unit']}`"
                        ></el-input>
                    </el-form-item>

                    <el-button
                        type="danger"
                        @click="delColor('view_setting',i)"
                    >删除</el-button>
                </div>
                <el-form-item label=" ">
                    <el-button @click="addColor(1)">添加视窗配置</el-button>
                </el-form-item>
                <el-form-item label="是否默认显示">
                    <el-radio-group v-model="form.is_show">
                        <el-radio :label="1">显示</el-radio>
                        <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addSub"
                >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { selectPartitionType, gatewaySelect, instrumentSelect, varlistSelect } from '@/api/information'
import { getVarConfigs } from '@/api/device'
export default {
    name: 'Formdian',
    props: {
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        /* siteid: {
            type: Number,
            default: null
        }, */
        partition_type: {
            type: String,
            default: null
        },
        status: {
            type: Boolean,
            default: false
        },
        point: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '创建设备监控点',
            formText: {
                title: '监控点标题',
                unit: '单位',
                flo_num: '小数点位数',
                name: '数据名称', // 视窗配置,标题
                group_name: '组名', // 组名
                dev_name: '设备名', // 设备名
                var_name: '变量名', // 变量名
                var_alias: '变量名', // 变量名
                judge: '规则选择', // 规则选择
                critical: '判别数据', // 判别数据
                color: '输出颜色' // 输出颜色
            },
            form: {
                title: '', // 所属监控设备，示例：1#桶满料
                mesh_id: null, // obi提取的对象ID
                mesh_name: '', // obi提取的对象名称
                monitor_id: '', // 监控设备 id
                color_setting: [],
                view_setting: [],
                is_show: 1 // 是否默认显示
            },
            formRules: {
                title: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            color_setting: {
                group_name: '', // 组名
                dev_name: '', // 设备名
                var_name: '', // 变量名
                var_alias: '', // 变量名
                judge: '', // 规则选择
                critical: null, // 判别数据
                color: '' // 输出颜色
            },
            view_setting: {
                name: '', // 视窗配置,标题
                unit: '', // 单位
                flo_num: null, // 小数点位数
                group_name: '', // 组名
                dev_name: '', // 设备名
                var_name: '', // 变量名
                var_alias: '' // 变量名
            },
            loading: false,
            prepare: {},
            disabled: false
        }
    },
    computed: {
    },
    mounted() {
        this.getPrepare()
        switch (this.scene) {
            case 'create':
                this.title = '创建设备监控点'
                break
            case 'update':
                this.title = '编辑设备监控点'
                this.edit()
                break
            case 'detail':
                this.disabled = true
                this.title = '设备监控点详情'
                this.edit()
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        edit() {
            this.form = Object.assign({}, this.form, this.point)
        },
        async getPrepare() {
            const varBox = await getVarConfigs({ partition_type: this.partition_type })
            console.log(varBox,'varBox')
            if (varBox.code === 1) {
                this.$set(this.prepare, 'list', varBox.data.list)
            }
        },
        addSub() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    let status = false
                    let colorArray = []
                    let setArray = []
                    /* this.form.color_setting.forEach(item => {
                        let text = item.group_name + item.dev_name + item.var_name
                        if (colorArray.length) {
                            const obj = colorArray.filter(item => item === text)
                            console.log(obj, 111)

                            if (obj.length) {
                                status = true
                            }
                        }
                        colorArray.push(text)
                    }) */
                    this.form.view_setting.forEach(item => {
                        let text = item.group_name + item.dev_name + item.var_name
                        if (setArray.length) {
                            const obj = setArray.filter(item => item === text)
                            if (obj.length) {
                                status = true
                            }
                        }
                        setArray.push(text)
                    })
                    if (status) {
                        this.$message.error('请不要重复选择组,设备名,变量名!')
                        return
                    }
                    this.callback({ msg: '添加成功!', data: this.form })
                }
            })
        },
        /**
         * @name: 添加颜色配置
         */
        addColor(e) {
            if (e === 1) {
                console.log(e)
                this.form.view_setting.push(JSON.parse(JSON.stringify(this.view_setting)))
            } else {
                this.form.color_setting.push(JSON.parse(JSON.stringify(this.color_setting)))
            }
        },
        /**
         * @name: 删除
         * @param {*} n
         * @param {*} c
         */
        delColor(n, c) {
            this.form[n].splice(c, 1)
        },
        changeGroupname(e, i) {
            i.dev_name = ''
            i.var_name = ''
            i.var_alias = ''
            console.log(e, i, 11)
        },
        changeDevname(e, i) {
            i.var_name = ''
            i.var_alias = ''
        },
        changeVarname(e, i) {
            if (!i.group_name && !i.dev_name) return
            i.var_alias = this.prepare.list[i.group_name][i.dev_name][e]
        },
        // 成功后
        callback(res) {
            this.$message({
                type: 'success',
                message: res.msg
            })
            this.emitOut(res.data)
        },
        emitOut(data) {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus, data)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus)
        }
    }
}
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
    .el-button {
        height: 40px;
        margin-left: 20px;
    }
}
.titlebox {
    text-align: center;
    color: #fff;
    font-size: 16px;
    padding: 20px 0 40px;
}
</style>
