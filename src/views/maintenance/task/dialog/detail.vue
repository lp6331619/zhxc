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
                    label="任务名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入任务名称"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="prepare "
                    label="使用部门:"
                    prop="department_id"
                >
                    <el-select
                        v-model="form.department_id"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in prepare.departments"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="任务备注:"
                    prop="remark"
                >
                    <el-input
                        v-model="form.remark"
                        placeholder="请输入任务备注"
                        :disabled="disabled"
                    ></el-input>
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
import { inspectionEditTask, inspectionSaveTaskEdit, inspectionAddTask } from '@/api/onsite'
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
                department_id: null,
                name: '',
                remark: ''
            },
            formRules: {
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
                departments: []
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
            const res = await inspectionEditTask({ id: this.id })
            if (res.code === 1) {
                this.form = {
                    name: res.data.task.name,
                    id: res.data.task.id,
                    remark: res.data.task.remark,
                    department_id: res.data.task.department_id
                }
            }
        },
        async getPrepare() {
            const res2 = await getDepartments({})
            if (res2.code === 1) {
                this.prepare.departments = res2.data.departments
            }
        },
        // 编辑
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            inspectionAddTask(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            inspectionSaveTaskEdit(params).then((res) => {
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
