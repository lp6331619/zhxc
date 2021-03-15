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
                    label="设备操作失效时间:"
                    prop="device_cycle"
                >
                    <el-input
                        v-model="form&&form.device_cycle"
                        placeholder="请输入设备操作失效时间"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="设备操作密码:"
                    prop="device_password"
                >
                    <el-input
                        v-model="form&&form.device_password"
                        placeholder="请输入设备操作密码"
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
import { editCompany, addCompany, saveSetting } from '@/api/system'
export default {
    name: 'Setting',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        scene: {
            type: String,
            default: 'setting' // create update detail
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
            title: '公司设置',
            device_cycle: 10,
            device_password: 'ymn1234',

            form: {
                device_cycle: '',
                device_password: '',
            },
            formRules: {
                device_cycle: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                device_password: [
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
      if(this.item){
        this.form = this.item
      }
        
        // this.title = '公司设置'
        this.setStatusStatus = this.status
    },
    methods: {
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    switch (this.scene) {
                        case 'setting':
                            delete this.form.ctime
                            delete this.form.mtime
                            saveSetting(this.form).then((res) => {
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
                // this.$refs.setDetail.resetFields()
            }
        },
        emitOut() {
            this.$emit('emitOut', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus, true)
        },
        closePreview() {
            this.isPreview = false
        }
    }
}
</script>
