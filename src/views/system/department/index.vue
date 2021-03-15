<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-18 10:04:43
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-28 13:54:00
-->
<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <div class="btnArr">
                <el-button
                    icon="el-icon-plus"
                    plain
                    @click="add()"
                >添加部门</el-button>
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
                    label="序号"
                    type="index"
                >
                </el-table-column>
                <el-table-column
                    label="部门名称"
                    prop="name"
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
                            plain
                            @click="add(scope.row)"
                        >添加子部门</el-button>
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
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
