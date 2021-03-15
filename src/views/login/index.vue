import { addClassify } from '@/api/information';
<template>
    <div class="login-container">
        <div class="load">
            <div class="title-container"></div>
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >
                <div class="title">
                    用户登录
                    <small>User login</small>
                </div>
                <el-form-item prop="username">
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        @keyup.enter.native="handleLogin"
                    />
                    <span
                        class="show-pwd"
                        @click="showPwd"
                    >
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
                <el-form-item v-if="codeStatus>=3">
                    <el-input
                        ref="captcha"
                        v-model="loginForm.captcha"
                        placeholder="验证密码"
                        name="captcha"
                        type="text"
                        tabindex="3"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                    />
                    <img
                        :src="codeImg"
                        alt=""
                        class="codeImg"
                        @click="getCodeImg"
                    >
                </el-form-item>
                <el-button
                    :loading="loading"
                    style="width:100%;margin-bottom:30px;"
                    @click.native.prevent="handleLogin"
                >登录</el-button>
                <!-- <div class="tips">[核心价值观：客户第一、高效执行、勇于担当、追求卓越]</div> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '', // superadmin
                password: '', // Jn123123
                captcha: ''
            },
            loginRules: {
                username: [{ required: true, message: '不能为空!' }],
                password: [{ required: true, message: '不能为空' }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            query: {},
            codeImg: '',
            codeNum: 0
        }
    },
    computed: {
        codeStatus() {
            return this.$store.state.user.codeStatus
        },
        data() {
            return this.$store.state.user.data
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
                this.query =
                    route.query && route.query.query
                        ? JSON.parse(route.query.query)
                        : {}
            },
            immediate: true
        }
    },
    created() {
        this.getToken()
        this.getCodeImg()
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        // 获取验证码
        getCodeImg() {
            var num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
            this.codeImg = this.apiUrl + 'captcha.html?=' + num
            this.loginForm.captcha = ''
        },
        // 获取token
        getToken() {
            this.loading = true
            this.$store
                .dispatch('user/loginSchema')
                .then((res) => {
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then((res) => {
                            this.$store.dispatch('user/getMenus').then((res2) => {
                                this.$router.push({
                                    path: this.redirect || '/',
                                    query: this.query
                                })
                                this.loading = false
                            }).catch(() => {
                                this.loading = false
                            })
                        })
                        .catch((err) => {
                            this.$store.dispatch('user/setCodeStatus')
                            switch (err.code) {
                                case 0:
                                    var { token } = err.data
                                    this.$store.dispatch('user/setToken', token)
                                    this.loading = false
                                    break
                                case 100:
                                    this.getCodeImg()
                                    this.loading = false
                                    break
                            }
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 40px;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 40px;
            line-height: 40px;
            caret-color: $cursor;
            font-size: 14px;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.tips {
    text-align: center;
}
.el-form-item {
    position: relative;
    .codeImg {
        position: absolute;
        right: 0;
        top: 1px;
        height: 40px;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
    }
}
.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: url('../../assets/image/10x/loadBg.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .load {
        position: relative;
        width: 450px;
        max-width: 100%;
        margin: 5% auto;
        overflow: hidden;
        .login-form {
            padding: 70px;
            background: url('../../assets/image/10x/load.png') no-repeat;
            background-size: 100% 100%;
        }
        .title {
            text-align: center;
            font-size: 20px;
            color: #fff;
            padding-bottom: 15px;
            small {
                display: block;
                font-size: 14px;
                color: #ddd;
                line-height: 20px;
            }
        }
        .el-button {
            height: 40px;
            font-size: 16px;
            background: #0f6799;
            color: #fff;
            border: 1px solid #20bcfc;
            box-shadow: 0 0 20px inset #20bcfc;
        }
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        width: 450px;
        height: 80px;
        padding-bottom: 20px;
        background: url('../../assets/image/10x/logo.png') no-repeat center;
        background-size: 100%;
    }

    .show-pwd {
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
