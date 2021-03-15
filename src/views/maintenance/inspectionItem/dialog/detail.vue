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
                    label="项目编码:"
                    prop="code"
                >
                    <el-input
                        v-model="form.code"
                        placeholder="请输入项目编码"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="项目名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入项目名称"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="项目描述:">
                    <el-input
                        v-model="form.describe"
                        placeholder="请输入项目描述"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="巡检方式:"
                    prop="inspection_tp"
                >
                    <el-input
                        v-model="form.inspection_tp"
                        placeholder="请输入巡检方式"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="prepare"
                    label="填写方式:"
                    prop="result_tp"
                >
                    <el-select
                        v-model="form.result_tp"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in prepare.result_tp"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                    v-if="form.result_tp===2"
                    label="判断标准:"
                    prop="standard_value"
                >
                    <el-input
                        v-model="form.standard_value"
                        placeholder="请输入判断标准"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="form.result_tp===2"
                    label="参考最小值:"
                    prop="min_value"
                >
                    <el-input
                        v-model="form.min_value"
                        placeholder="请输入参考最小值"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    v-if="form.result_tp===2"
                    label="参考最大值:"
                    prop="max_value"
                >
                    <el-input
                        v-model="form.max_value"
                        placeholder="请输入参考最大值"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="点检规范:"
                    prop="specification"
                >
                    <el-input
                        v-model="form.specification"
                        placeholder="请输入点检规范"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="得分标准:"
                    prop="score_standard"
                >
                    <el-input
                        v-model="form.score_standard"
                        placeholder="请输入得分标准"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="最低得分:"
                    prop="min_score"
                >
                    <el-input
                        v-model="form.min_score"
                        placeholder="请输入最低得分"
                    >
                        <template slot="append">分</template>
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="最高得分:"
                    prop="max_score"
                >
                    <el-input
                        v-model="form.max_score"
                        placeholder="请输入最高得分"
                    >
                        <template slot="append">分</template>
                    </el-input>
                </el-form-item>
                <el-form-item
                    v-if="prepare"
                    label="使用部门:"
                    prop="department_id"
                >
                    <el-select
                        v-model="form.department_id"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in prepare.department_id"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
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
import { inspectionEditItem, inspectionSaveEditItem, inspectionAddItem } from '@/api/onsite'
import { getDepartments } from '@/api/system'
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
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '创建任务',
            form: {
                code: '',
                name: '',
                describe: '',
                specification: '',
                inspection_tp: '',
                result_tp: '',
                standard_value: '',
                min_value: '',
                max_value: '',
                score_standard: '',
                min_score: '',
                max_score: '',
                department_id: ''
            },
            formRules: {
                code: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                specification: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                inspection_tp: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                result_tp: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                standard_value: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                min_value: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                max_value: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                score_standard: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                min_score: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                max_score: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                department_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {
                result_tp: [{
                    id: 1,
                    name: '勾选'
                },
                {
                    id: 2,
                    name: '填写'
                }],
                department_id: []
            },
            disabled: false
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getPrepare()
        switch (this.scene) {
            case 'create':
                this.title = '创建任务'
                break

            case 'update':
                this.title = '编辑任务'
                this.getDetail()
                break

            case 'detail':
                this.disabled = true
                this.title = '任务详情'
                this.getDetail()
                break
        }
    },
    methods: {
        async getDetail() {
            const res = await inspectionEditItem({ id: this.id })
            if (res.code === 1) {
                this.form = res.data.formData
                delete this.form.ctime
                delete this.form.mtime
                delete this.form.dtime
            }
        },
        async getPrepare() {
            const res2 = await getDepartments({})
            if (res2.code === 1) {
                this.prepare.department_id = res2.data.departments
            }
        },
        // 编辑
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            inspectionAddItem(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            inspectionSaveEditItem(params).then((res) => {
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
