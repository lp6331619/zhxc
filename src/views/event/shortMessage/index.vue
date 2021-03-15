<template>
    <div class="app-container">
        <el-card class="box-card">
            <SearchList
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
            />
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
                    prop="mobile"
                    label="电话"
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                ></el-table-column>
                <el-table-column
                    prop="status"
                    label="验证码状态"
                ></el-table-column>
                <el-table-column
                    prop="send_status"
                    label="发送状态"
                ></el-table-column>
                <el-table-column
                    prop="content"
                    label="内容"
                    class-name="w30"
                ></el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                ></el-table-column>
                <el-table-column
                    prop="ctime"
                    label="创建时间"
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
.w30 {
    width: 30% !important;
}
</style>
