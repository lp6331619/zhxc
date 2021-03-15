<template>
    <div>
        <el-dialog
            title="批量导入"
            width="40%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div class="center">
                <el-upload
                    class="upload-demo"
                    drag
                    :headers="{
                        authkey:data.authkey,
                        sessionid:data.sessionid
                    }"
                    :show-file-list="false"
                    :action="url"
                    multiple
                    :on-error="error"
                    :on-success="handleSuccess"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div
                        slot="tip"
                        class="el-upload__tip"
                    >只能上传excel文件，且不超过2MB</div>
                </el-upload>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="handleClose"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { inspectionImportBatch } from '@/api/onsite'
import { mapGetters } from 'vuex'
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
            loading: false,
            total: [],
            disabled: false,
            equipment_ids: [],
            btnLoading: false,
            url: ''
        }
    },
    computed: {
        ...mapGetters(['data'])
    },
    mounted() {
        // this.url = `${this.apiUrl}inspection/Inspection/importBatch`
        this.url = `${process.env.VUE_APP_BASE_API}/inspection/Inspection/importBatch`
        this.setStatusStatus = this.status
    },
    methods: {
        handleSuccess(res) {
            this.callback(res)
        },
        error(res) {
            this.$message.error(res.msg)
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
            } else {
                this.$message({
                    type: 'error',
                    message: res.msg
                })
            }
        },
        emitOut() {
            this.$emit('emitOut', 'diologUpload', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologUpload', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    justify-content: center;
}
</style>
