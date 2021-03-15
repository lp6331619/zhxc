<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
            width="20%"
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
                    label="分类名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入分类名称"
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
import { addClassify, editClassify } from '@/api/information'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
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
            setStatusStatus: false,
            innerVisible: false,
            title: '创建视频分类',
            form: {
                pid: null,
                name: '',
                type: 1
            },
            formRules: {
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {},
            disabled: false
        }
    },
    computed: {
        menuList() {
            return this.$router.options.routes[3].children
        }
    },
    mounted() {
        switch (this.scene) {
            case 'create':
                this.title = '创建视频分类'
                console.log(this.item, 222)
                this.form.pid = this.item.pid || null
                break
            case 'update':
                this.title = '编辑视频分类'
                this.getDetail()
                break
            case 'detail':
                this.disabled = true
                this.title = '视频分类详情'
                this.getDetail()
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        async getDetail() {
            this.form = {
                pid: this.item.pid,
                type: this.item.type,
                name: this.item.name,
                id: this.item.id
            }
        },
        editDetailBox() {
            this.$refs.setDetail.validate((valid) => {
                if (valid) {
                    switch (this.scene) {
                        case 'create':
                            addClassify(this.form).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            editClassify(this.form).then((res) => {
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
.iconfont {
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    padding: 10px 0;
    border: 1px solid #fff;
    &:hover,
    &.active {
        border-color: red;
    }
}
</style>
