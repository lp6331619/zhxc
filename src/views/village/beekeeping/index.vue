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
                :data="list.data"
            >
                <el-table-column
                    prop="username"
                    label="养蜂户主"
                ></el-table-column>
                <el-table-column
                    prop="image_url"
                    label="图片"
                >
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.image_url"
                            :src="imgUrl+scope.row.image_url"
                            @click="bigImg(imgUrl+scope.row.image_url)"
                            class="maxImg"
                            alt=""
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="数量(桶)"
                ></el-table-column>
                <el-table-column
                    prop="start_time"
                    label="开始养殖时间"
                ></el-table-column>
                <el-table-column
                    prop="annual_output"
                    label="年产量(kg)"
                >
                </el-table-column>
                <el-table-column
                    prop="variety"
                    label="品种"
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
        <el-dialog
            title="图片"
            :visible.sync="dialogVisible"
            :width="width"
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
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
