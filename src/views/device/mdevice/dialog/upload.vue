<template>
    <div>
        <el-dialog
            :title="title"
            width="40%"
            append-to-body
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
                    label="上传gltf文件:"
                    prop="fileGltf"
                >
                    <div class="uploadBtn">
                        <el-button
                            type="primary"
                            size="mini"
                            plain
                        >
                            <input
                                class="hidden"
                                type="file"
                                @change="fileChange($event,'gltf')"
                            />上传.gltf格式图
                        </el-button>
                        {{ file['gltf'].original_name }}
                    </div>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { annexUpload3d } from '@/api/site'
import axios from 'axios'
import { getData } from '@/utils/auth'

export default {
    name: 'EditUpdate',
    props: {
        uniquecode: {
            type: String,
            default: ''
        },
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        init: {
            type: Object,
            default: () => {
                return {}
            }
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '创建文件',
            form: {
                C: null,
                id: '',
                fileGltf: ''
            },
            file: {
                gltf: {
                    original_name: ''
                }
            },
            formRules: {
                C: [
                    {
                        required: true,
                        trigger: 'change',
                        max: 10,
                        message: '不能为空!'
                    }
                ],
                fileGltf: [
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
        userId() {
            return this.$route.query.id
        }
    },
    mounted() {
        this.form.id = this.userId
        this.form.unique_code = this.uniquecode
        if (this.init.gltf) {
            this.file = this.init
        }
        switch (this.scene) {
            case 'create':
                this.title = '创建文件'
                break
            case 'update':
                this.title = '编辑文件'
                this.edit()
                break
            case 'detail':
                this.disabled = true
                this.title = '文件详情'
                this.edit()
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        edit() {
            this.form = this.item
            delete this.form.ctime
            delete this.form.mtime
        },
        /**
        * @name: 图片返回内容
        * @param {*}
        * @return {*}
        */
        fileChange(e, type) {
            const file = e.target.files[0]
            const typeList = file.name.split('.')
            if (typeList[typeList.length - 1] === type) {
                this.upload(file, type)
            } else {
                this.$message.error(`请上传${type}格式文件!`)
            }
        },
        /**
         * @name: 上传图片
         * @param {*}
         * @return {*}
         */
        upload(file, type) {
            const params = {
                file: file,
                unique_code: this.form.unique_code,
                id: this.form.id
            }
            const formData = new FormData()
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key])
            })
            const header = {}
            if (getData()) {
                const { authkey, sessionid } = getData()
                header.authkey = authkey
                header.sessionid = sessionid
            }
            this.loading = true
            axios({
                method: 'post',
                url: `${process.env.VUE_APP_BASE_API}system/annex/upload3d`,
                data: formData,
                headers: header
            }).then((res) => {
                this.callback(res.data, type)
            }).catch((error) => {
                this.$message.error(error.msg)
                this.loading = false
            })
        },
        // 成功后
        callback(res, type) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.file[type] = res.data
                this.emitOut(this.file[type])
            }
            this.loading = false
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
</style>
