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
                <el-button @click="outExcel()">同步数据</el-button>
                <el-button
                    icon="el-icon-plus"
                    plain
                    @click="add()"
                >新增</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.list"
            >
                <el-table-column
                    prop="code"
                    label="设备编号"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="设备名称"
                ></el-table-column>
                <el-table-column
                    prop="type"
                    label="设备类型"
                ></el-table-column>
                <el-table-column
                    prop="area_name"
                    label="设备组"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
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
                        >定位</el-button>
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
        <el-dialog
            title="图片"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <div class="bigImg">
                <img
                    :src="bigUrl"
                    alt=""
                >
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 详情 -->
        <location
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
