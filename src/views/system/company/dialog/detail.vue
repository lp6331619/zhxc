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
                    label="公司名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入公司名称"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="logo:"
                    prop="logo"
                >
                    <vue-upload-imgs
                        v-model="files"
                        multiple
                        class="logoUpload"
                        compress
                        :before-read="beforeRead"
                        :limit="limit"
                        :after-read="afterLogo"
                        :type="type"
                        @oversize="oversize"
                    >
                    </vue-upload-imgs>
                </el-form-item>
                <el-form-item
                    label="网站图标:"
                    prop="favicon"
                >
                    <vue-upload-imgs
                        v-model="files2"
                        multiple
                        compress
                        :before-read="beforeRead2"
                        :limit="limit"
                        :after-read="afterIcon"
                        :type="type"
                        @oversize="oversize"
                    >
                    </vue-upload-imgs>
                </el-form-item>
                <el-form-item label="网站标题:">
                    <el-input
                        v-model="form.title"
                        placeholder="请输入网站标题"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="网站关键词:">
                    <el-input
                        v-model="form.keywords"
                        placeholder="请输入网站关键词"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="网站描述:">
                    <el-input
                        v-model="form.description"
                        placeholder="请输入网站描述"
                        type="textarea"
                        :rows="2"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item label="icp备案信息:">
                    <el-input
                        v-model="form.icp"
                        placeholder="请输入icp备案信息"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="营业执照:"
                    prop="license"
                    class="license"
                >
                    <vue-upload-imgs
                        v-model="files3"
                        multiple
                        compress
                        :before-read="beforeRead"
                        :limit="limit"
                        :after-read="afterLicense"
                        :type="type"
                        @oversize="oversize"
                    >
                    </vue-upload-imgs>
                </el-form-item>
                <el-form-item label="短信签名:">
                    <el-input
                        v-model="form.sms_sign"
                        placeholder="请输入短信签名"
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
import { editCompany, addCompany } from '@/api/system'
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
        }
    },
    data() {
        return {
            setStatusStatus: false,
            title: '创建公司',
            files: [],
            files2: [],
            files3: [],
            maxSize: 1024 * 1024 * 2, // 2mb
            limit: 1,
            type: 0, // 0 预览模式 1 列表模式 2 预览模式 + 上传按钮
            form: {
                name: '',
                // string
                // 必填，公司名称，示例：优米耐智能科技有限公司
                logo: '',
                // 必填，公司logo，示例：/upload/sys/image/5c/7132d9e13cffc2ba6a17a60d26b8fc.png
                favicon: '',
                // string
                // 公司图标，示例：/public/favicon.ico
                title: '',
                // string
                // 标题，示例：优米耐智能科技有限公司
                keywords: '',
                // string
                // 关键词，示例：优米耐智能科技有限公司
                description: '',
                // string
                // 网站描述，示例：优米耐智能科技有限公司
                icp: '',
                // string
                // ipc备案信息，示例：闽ICP备19006676号-1
                license: '',
                // string
                // 营业执照，示例：
                sms_sign: ''
                // string
                // 短信签名，示例：优米耐
            },
            formRules: {
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                logo: [
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
        switch (this.scene) {
            case 'create':
                this.title = '创建公司'
                break

            case 'update':
                this.title = '编辑公司'
                this.form = this.item
                this.files = [{
                    url: this.imgUrl + this.form.logo
                }]
                if (this.form.favicon) {
                    this.files2 = [{
                        url: this.imgUrl + this.form.favicon
                    }]
                }
                if (this.form.license) {
                    this.files3 = [{
                        url: this.imgUrl + this.form.license
                    }]
                }
                break

            case 'detail':
                this.disabled = true
                this.title = '公司详情'
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    switch (this.scene) {
                        case 'create':
                            addCompany(this.form).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            editCompany(this.form).then((res) => {
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
        // 超过图片大小
        oversize(file) {
            this.$message.error('图片大小不能超过2M')
        },
        // logo获取
        afterLogo(e) {
            this.form.logo = e[0].url
        },
        // 图标获取
        afterIcon(e) {
            this.form.favicon = e[0].url
        },
        // 营业执照获取
        afterLicense(e) {
            this.form.license = e[0].url
        },
        // 上传前
        beforeRead(files) {
            for (let i = 0, len = files.length; i < len; i++) {
                const file = files[i]
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    alert('只能上传jpg和png格式的图片')
                    return false
                }
            }
            return true
        },
        // 上传前 限制 ico
        beforeRead2(files) {
            for (let i = 0, len = files.length; i < len; i++) {
                const file = files[i]
                if (file.type !== 'image/vnd.microsoft.icon') {
                    alert('只能上传ico格式的文件')
                    return false
                }
            }
            return true
        },
        closePreview() {
            this.isPreview = false
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
