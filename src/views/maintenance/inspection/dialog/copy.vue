<template>
    <div>
        <el-dialog
            title="复制乡村站点"
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
                    label="复制的数量:"
                    prop="num"
                >
                    <el-input
                        v-model="form.num"
                        placeholder="请输入要复制的数量"
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
import { equipmentCopyEquipment } from '@/api/onsite'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
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
            form: {
                num: null,
                id: null
            },
            formRules: {
                num: [
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
    },
    mounted() {
        this.setStatusStatus = this.status
        this.form.id = this.id
    },
    methods: {
        // 编辑
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    equipmentCopyEquipment(this.form).then((res) => {
                        this.callback(res)
                    })
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
            this.$emit('emitOut', 'diologCopy', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologCopy', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
