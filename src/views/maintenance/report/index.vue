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
                <el-button @click="outExcel()">导出数据</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.data"
            >
            <el-table-column
                prop="task.name"
                label="任务名称"
            ></el-table-column>
            <el-table-column
                prop="equipment_name"
                label="乡村站点名称"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="计划名称"
            ></el-table-column>
                <el-table-column
                    prop="check_time"
                    label="巡检时间"
                ></el-table-column>
                <el-table-column
                    prop="mtime"
                    label="最新更新时间"
                ></el-table-column>
                <el-table-column
                    prop="check_user"
                    label="巡检人姓名"
                ></el-table-column>
                <el-table-column
                    prop="is_check"
                    label="是否已检"
                >
                    <template slot-scope="scope">
                        {{ scope.row.is_check===0?'未检':'已检' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="result_flag"
                    label="巡检结果"
                >
                    <template slot-scope="scope">
                        {{ scope.row.result_flag===0?'--':scope.row.result_flag===1?'合格':'不合格' }}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="total_num"
                    label="项目总数"
                >
                </el-table-column>
                <el-table-column
                    prop="checked_num"
                    label="已检数"
                >
                </el-table-column>
                <el-table-column
                    prop="un_check_num"
                    label="未检数"
                ></el-table-column>
                <el-table-column
                    prop="qualified_num"
                    label="合格数"
                ></el-table-column>
                <el-table-column
                    prop="fail_num"
                    label="不合格数"
                ></el-table-column>
                <el-table-column
                    prop="score"
                    label="总得分"
                ></el-table-column>
                <el-table-column
                    prop="option"
                    label="操作"
                    min-width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="task(scope.row.id)"
                        >巡检结果</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="pic(scope.row.id)"
                        >查看图片</el-button>
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

        <task
            v-if="diologTask"
            :id="dialogID"
            :status="diologTask"
            @emitOut="emitOut"
        />
        <pic
            v-if="diologPic"
            :id="dialogID"
            :status="diologPic"
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
