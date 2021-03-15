<template>
    <div>
        <el-dialog
            :title="title"
            width="40%"
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
                    label="模板编号:"
                    prop="number"
                >
                    <el-input
                        v-model="form.number"
                        type="number"
                        placeholder="请输入模板编号"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="模板内容:"
                    prop="content"
                >
                    <el-input
                        v-model="form.content"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入模板内容"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input
                        v-model="form.remarks"
                        placeholder="请输入备注"
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
import { smsEdit, smsAdd } from '@/api/information'
import { mapGetters } from 'vuex'

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
            title: '创建短信',
            form: {
                number: null,
                content: '',
                remarks: ''
            },
            formRules: {
                number: [
                    {
                        required: true,
                        trigger: 'change',
                        max: 10,
                        message: '不能为空!'
                    }
                ],
                content: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                remarks: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: undefined,
            disabled: false
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    mounted() {
        switch (this.scene) {
            case 'create':
                this.title = '创建短信'
                break

            case 'update':
                this.title = '编辑短信'
                this.edit()
                break

            case 'detail':
                this.disabled = true
                this.title = '短信详情'
                this.edit()
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        edit() {
            this.form = this.item
            this.form.number = String(this.form.number)
            delete this.form.ctime
            delete this.form.mtime
        },
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            smsAdd(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            smsEdit(params).then((res) => {
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
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
