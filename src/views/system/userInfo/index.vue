<template>
    <div class="app-container">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form
                        ref="setDetail"
                        v-loading="loading"
                        class="comForm"
                        :model="form"
                        :rules="formRules"
                        auto-complete="on"
                        label-position="right"
                        label-width="120px"
                    >
                        <el-form-item
                            label="昵称:"
                            prop="nick"
                        >
                            <el-input
                                v-model="form.nick"
                                placeholder="请输入昵称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="登录密码:"
                            prop="password"
                        >
                            <el-input
                                v-model="form.password"
                                placeholder="请输入登录密码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="确认密码:"
                            prop="password_confirm"
                        >
                            <el-input
                                v-model="form.password_confirm"
                                placeholder="请输入确认密码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="邮箱:"
                            prop="email"
                        >
                            <el-input
                                v-model="form.email"
                                placeholder="请输入邮箱"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="电话:"
                            prop="mobile"
                        >
                            <el-input
                                v-model="form.mobile"
                                type="number"
                                placeholder="请输入电话"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button
                                type="primary"
                                @click="submit"
                            >确认</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
