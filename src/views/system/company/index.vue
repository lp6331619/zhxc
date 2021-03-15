<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-20 16:30:14
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-30 17:28:12
-->
<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <div class="btnArr">
                <el-button
                    icon="el-icon-plus"
                    plain
                    @click="add()"
                >添加公司</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                v-if="list.list"
                v-loading="loading"
                :data="list.list"
                row-key="id"
            >
                <el-table-column
                    label="公司名称"
                    prop="name"
                >
                </el-table-column>
                <el-table-column
                    label="公司logo"
                    prop="logo"
                >
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.logo"
                            :src="imgUrl+scope.row.logo"
                            class="maxImg"
                            alt=""
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    label="网站标题"
                    prop="title"
                >
                </el-table-column>
                <el-table-column
                    label="网站关键词"
                    prop="keywords"
                >
                </el-table-column>
                <el-table-column
                    label="ICP备案信息"
                    prop="icp"
                >
                </el-table-column>
                <el-table-column
                    prop="option"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="edit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="setting(scope.row.id)"
                        >设置</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="confirm(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 详情 -->
        <detail
            v-if="diologStatus"
            :item="dialogItem"
            :status="diologStatus"
            :scene="scene"
            @emitOut="emitOut"
        />
        <setting
            v-if="diologSettingStatus"
            :item="dialogItem"
            :status="diologSettingStatus"
            :scene="scene"
            @emitOut="emitOut"
        />
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
