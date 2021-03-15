<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-22 22:39:57
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-15 11:22:19
-->
<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <SearchList
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
            />
            <div class="btnArr">
                <el-button
                    plain
                    icon="el-icon-plus"
                    @click="add()"
                >新增</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.data"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                ></el-table-column>
                <el-table-column
                    prop="number"
                    label="模板编号"
                >
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="模板内容"
                ></el-table-column>
                <el-table-column
                    prop="remarks"
                    label="备注"
                ></el-table-column>
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
                        >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="confirm(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div
                v-if="list"
                class="pageBox flex pt20"
            >
                <el-pagination
                    background
                    :total="list.count"
                    :current-page="otherData.page"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="otherData.limit"
                    layout="total, sizes, prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
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
