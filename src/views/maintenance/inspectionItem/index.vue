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
                <el-button @click="outExcel()">下载Excel模板</el-button>
                <el-button @click="importExcel()">批量导入</el-button>
                <el-button
                    type="danger"
                    @click="delArray()"
                >删除</el-button>
                <el-button
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
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column
                    prop="code"
                    label="项目编码"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称"
                ></el-table-column>
                <el-table-column
                    prop="specification"
                    label="巡检规范"
                ></el-table-column>
                <el-table-column
                    prop="inspection_tp"
                    label="巡检方式"
                >
                </el-table-column>

                <el-table-column
                    prop="standard_value"
                    label="判断标准"
                >
                </el-table-column>
                <el-table-column
                    prop="result_tp"
                    label="结果类型"
                >
                </el-table-column>
                <el-table-column
                    prop="min_value"
                    label="参考最小值"
                >
                </el-table-column>
                <el-table-column
                    prop="max_value"
                    label="参考最小值"
                ></el-table-column>
                <el-table-column
                    prop="score_standard"
                    label="得分标准"
                ></el-table-column>
                <!-- <el-table-column
                    prop="min_score"
                    label="最低得分"
                ></el-table-column>
                <el-table-column
                    prop="max_score"
                    label="最高得分"
                ></el-table-column> -->
                <el-table-column
                    prop="department"
                    label="部门名称"
                ></el-table-column>
                <el-table-column
                    prop="user.nick"
                    label="添加人"
                ></el-table-column>
                <el-table-column
                    prop="ctime"
                    label="添加时间"
                ></el-table-column>
                <el-table-column
                    prop="option"
                    label="操作"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
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
        <!-- 详情 -->
        <detail
            v-if="diologStatus"
            :id="dialogID"
            :status="diologStatus"
            :scene="scene"
            @emitOut="emitOut"
        />
        <upload
            v-if="diologUpload"
            :status="diologUpload"
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
