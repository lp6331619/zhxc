<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:35:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-17 22:34:31
-->
<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <SearchList
                v-if="prepare"
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
            />
            <div class="btnArr">
                <el-button
                    icon="el-icon-plus"
                    plain
                    @click="edit()"
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
                    prop="site.name"
                    label="所属站点"
                ></el-table-column>
                <!-- <el-table-column
                    prop="unique_code"
                    label="设备标识符"
                >
                </el-table-column> -->
                <el-table-column
                    prop="contorl_name"
                    label="设备监视名称"
                ></el-table-column>
                <!-- <el-table-column
                    prop="url"
                    label="背景图片"
                >
                    <template slot-scope="scope">
                        <img
                            class="h80"
                            :src="scope.row.back_img"
                            alt=""
                        >
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop="ctime"
                    label="添加时间"
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
                            @click="open(scope.row)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            plain
                            @click="edit(scope.row.id)"
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
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.h80 {
    height: 80px;
    max-width: 200px;
}
</style>
