<template>
    <div class="app-container">
        <el-card class="box-card">
            <el-tabs v-model="activeName">
                <el-tab-pane
                    label="修改角色"
                    name="1"
                >

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
                            label="角色名称:"
                            prop="name"
                        >
                            <el-input
                                v-model="form.name"
                                placeholder="请输入角色名称"
                                :disabled="disabled"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="角色描述:"
                            prop="intro"
                        >
                            <el-input
                                v-model="form.intro"
                                placeholder="请输入角色描述"
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
                    </el-form>
                </el-tab-pane>
                <el-tab-pane
                    label="设置权限"
                    name="2"
                >
                    <div class="comForm">
                        <el-tree
                            v-if="data "
                            ref="tree"
                            :check-strictly="checkStrictly"
                            empty-text="暂无数据"
                            show-checkbox
                            node-key="id"
                            :data="data.menus"
                            :indent="40"
                            :props="defaultProps"
                        >
                        </el-tree>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-button
                type="primary"
                @click="submit"
            >确认</el-button>
        </el-card>
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.comForm {
    width: 50%;
    padding: 40px;
}
</style>
