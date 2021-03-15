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
                    label="姓名:"
                    prop="nick"
                >
                    <el-input
                        v-model="form.nick"
                        placeholder="请输入姓名"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="登录名:"
                    prop="username"
                >
                    <el-input
                        v-model="form.username"
                        placeholder="请输入登录名"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="!disabled"
                    label="密码:"
                    :prop="scene === 'create'?'password':''"
                >
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="!disabled"
                    label="确认密码:"
                    :prop="scene === 'create'?'password_confirm':''"
                >
                    <el-input
                        v-model="form.password_confirm"
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="email:">
                    <el-input
                        v-model="form.email"
                        placeholder="请输入email"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号:"
                    prop="mobile"
                >
                    <el-input
                        v-model="form.mobile"
                        placeholder="请输入手机号"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="状态:"
                    prop="status"
                >
                    <el-switch
                        v-model="form.status"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="禁用"
                        :disabled="disabled"
                    ></el-switch>
                </el-form-item>

                <el-form-item
                    v-if="prepare"
                    label="所属部门:"
                    prop="department_id"
                >
                    <el-cascader
                        v-model="pidArray"
                        :show-all-levels="false"
                        :options="prepare.departments"
                        :props="props"
                        :disabled="disabled"
                        change-on-select
                        @change="changeCas"
                    ></el-cascader>
                </el-form-item>
                <el-form-item
                    v-if="prepare"
                    label="直属上级:"
                    prop="pid"
                >
                    <el-select
                        v-model="form.pid"
                        placeholder="请选择直属上级"
                        :disabled="disabled"
                    >
                        <el-option
                            v-for="(item,i) in prepare.user"
                            :key="i"
                            :label="item.nick"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item
                    v-if="prepare"
                    label="角色:"
                    prop="role_id"
                >
                    <el-select
                        v-model="form.role_id"
                        multiple
                        placeholder="请选择角色"
                        :disabled="disabled"
                    >
                        <el-option
                            v-for="(item,i) in prepare.role"
                            :key="i"
                            :label="item"
                            :value="i"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职位:">
                    <el-input
                        v-model="form.post"
                        placeholder="请输入职位"
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
import { editUser, addUser, getUsersDetail, getDepartmentsIndex, getUsers, getRoles } from '@/api/system'
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
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '创建员工',
            form: {
                nick: '',
                username: '',
                password: '',
                password_confirm: '',
                email: '',
                mobile: null,
                status: 1,
                department_id: null,
                pid: null,
                post: '',
                role_id: [],
                id: undefined,
                __token__: ''
            },
            formRules: {
                nick: [
                    {
                        required: true,
                        max: '64',
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                username: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                password: [
                    { required: true, trigger: 'change', message: '不能为空!' },
                    {
                        pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
                        message: '密码长度至少8位，包含大小写字母、数字、特殊字符，任意三种',
                        trigger: 'change'
                    }
                ],
                password_confirm: [
                    {
                        required: true,
                        message: '确认密码不能为空！',
                        trigger: 'change'
                    },
                    {
                        trigger: 'change',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.form.password) {
                                callback(new Error('两次输入密码不一致!'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                mobile: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    },
                    {
                        pattern: /^((\d{3,4}-)?\d{7,8}(-\d{0,5})?)$|(1[0-9]{10})$/,
                        trigger: 'change',
                        message: '电话或手机号码格式有误，请重新输入！'
                    }
                ],
                department_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                role_id: [
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
            pid: null,
            pidArray: [],
            props: {
                value: 'id',
                label: 'name'
            }
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    mounted() {
        this.getRule()
        switch (this.scene) {
            case 'create':
                this.title = '创建员工'
                break

            case 'update':
                this.title = '编辑员工'
                break

            case 'detail':
                this.disabled = true
                this.title = '员工详情'
                break
        }
        console.log(this.scene)
        this.setStatusStatus = this.status
    },
    methods: {
        async getRule(rule) {
            this.loading = true
            const departments = await getDepartmentsIndex({})
            const user = await getUsers({})
            const role = await getRoles({})
            await this.$store.dispatch('user/loginSchema')
            this.prepare = {
                departments: departments.data.list,
                user: user.data.users,
                role: role.data.roles
            }
            this.form['__token__'] = this.token
            if (this.scene !== 'create') {
                const res = await getUsersDetail({ id: this.id })
                this.loading = false
                if (res.code === 1) {
                    this.form = res.data.user
                    this.form.role_id = this.form.role_id.map(item => item.toString())
                    this.form['__token__'] = this.token
                    delete this.form.has_indexs
                    this.pid = this.form.department_id
                    this.pidArray = this.common.familyTree(this.prepare.departments, this.pid)
                }
            }
            this.loading = false
        },
        changeCas(e) {
            this.form.department_id = this.pidArray[this.pidArray.length - 1]
        },
        editDetailBox() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(this.form))
                    switch (this.scene) {
                        case 'create':
                            addUser(params).then((res) => {
                                this.callback(res)
                            })
                            break
                        case 'update':
                            editUser(params).then((res) => {
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
