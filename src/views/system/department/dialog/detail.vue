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
                    v-if="prepare "
                    label="所属部门:"
                    prop="pid"
                >
                    <el-cascader
                        v-model="pidArray"
                        expand-trigger="hover"
                        :show-all-levels="false"
                        :options="prepare.departments"
                        :props="props"
                        :disabled="disabled"
                        change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item
                    label="部门名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入部门名称"
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
import { editDepartments, addDepartments, getDepartmentsIndex } from '@/api/system'
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
            // 修改密码表单
            setStatusStatus: false,
            title: '创建员工',
            form: {
                name: '',
                pid: null,
                id: null
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
            prepare: undefined,
            disabled: false,
            props: {
                value: 'id',
                label: 'name'
            },
            pid: null,
            pidArray: []
        }
    },
    computed: {
    },
    mounted() {
        this.getRule()
        switch (this.scene) {
            case 'create':
                this.title = '创建部门'
                break

            case 'update':
                this.title = '编辑部门'
                break

            case 'detail':
                this.disabled = true
                this.title = '部门详情'
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        async getRule(rule) {
            this.loading = true
            const departments = await getDepartmentsIndex({})
            this.prepare = {
                departments: departments.data.list
            }

            if (this.scene !== 'create') {
                this.form = {
                    name: this.item.name,
                    pid: [],
                    id: this.item.id
                }
                this.pid = this.item.pid
            } else {
                this.form.pid = this.item.id
                this.pid = this.item.id
            }
            this.pidArray = this.common.familyTree(this.prepare.departments, this.pid, 'children')
            this.loading = false
        },
        // 递归添加所有id
        getPid(item) {
            let pid = ''
            pid += item.id
            if (item.children.length) {
                item.children.forEach(child => {
                    pid += ',' + this.getPid(child)
                })
            }
            return pid
        },
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const param = JSON.parse(JSON.stringify(this.form))
                    const params = {
                        name: param.name,
                        id: param.id,
                        pid: this.pidArray ? this.pidArray[this.pidArray.length - 1] : null
                    }
                    switch (this.scene) {
                        case 'create':
                            addDepartments(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            editDepartments(params).then((res) => {
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
