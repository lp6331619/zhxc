<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-15 10:00:50
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-16 09:33:51
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
                @linkageData="linkageData($event)"
            />
            <div class="btnArr">
                <el-button @click="outExcel()">导出数据</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.list"
            >
                <el-table-column
                    prop="var_alias"
                    label="变量名称"
                ></el-table-column>
                <el-table-column
                    prop="var_class"
                    label="类别"
                ></el-table-column>
                <el-table-column
                    prop="value"
                    label="记录值"
                ></el-table-column>
                <el-table-column
                    prop="data_eq_str"
                    label="数据质量"
                ></el-table-column>
                <el-table-column
                    prop="data_scale"
                    label="数据变化率"
                ></el-table-column>
                <el-table-column
                    prop="recordtime"
                    label="时间"
                >
                </el-table-column>
                <el-table-column
                    prop="record_type"
                    label="记录方式"
                ></el-table-column>
                <el-table-column
                    prop="group_name"
                    label="组名称"
                ></el-table-column>
                <el-table-column
                    prop="dev_name"
                    label="设备名称"
                ></el-table-column>
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
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
