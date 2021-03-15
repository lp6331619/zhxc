import { mapGetters } from 'vuex'
export default {
    components: {
    },
    computed: {
        ...mapGetters(['data'])
    },
    data() {
        return {
            loading: false,
            form: {
                // username: '',
                nick: '',
                password: '',
                password_confirm: '',
                email: '',
                mobile: ''
            },
            formRules: {
                // username: [
                //     {
                //         required: true,
                //         max: '64',
                //         trigger: 'change',
                //         message: '不能为空!'
                //     }
                // ],
                nick: [
                    {
                        required: true,
                        max: '64',
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
                email: [
                    {
                        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        message: '请书写正确邮箱格式',
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
                ]
            }

        }
    },
    created() {
        const form = this.data.user_info
        this.form.nick = form.nick
        this.form.email = form.email
        this.form.mobile = form.mobile
        this.form.username = form.username
    },
    methods: {
        // 确认
        submit() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    this.$confirm('是否确认修改个人信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$store.dispatch('user/editInfo', this.form).then(res => {
                            this.$message({
                                type: res.code === 1 ? 'success' : 'error',
                                message: res.msg
                            })
                        })
                    }).catch(() => {
                    })
                }
            })
        }
    }
}
