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
            <!-- <el-button
                size="mini"
                type="primary"
                plain
                @click="add()"
            >新增</el-button> -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.data"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                >
                </el-table-column>
                <!-- <el-table-column
                    prop="type"
                    label="读写类型"
                >
                    <template slot-scope="scope">
                        <span v-if="prepare.type ">
                            {{ prepare.type[scope.row.type] }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="data_type"
                    label="数据类型"
                >
                </el-table-column>-->
                <el-table-column
                    prop="var_name"
                    label="变量名称"
                ></el-table-column>
                <el-table-column
                    prop="var_alias"
                    label="变量别名"
                ></el-table-column>
                <el-table-column
                    prop="district_name"
                    label="站点名"
                ></el-table-column>
                <el-table-column
                    prop="group_name"
                    label="组名称"
                ></el-table-column>
                <el-table-column
                    prop="dev_name"
                    label="设备名称"
                ></el-table-column>
                <el-table-column
                    prop="createtime"
                    label="添加时间"
                ></el-table-column>
                <!-- <el-table-column
                    prop="is_show"
                    label="是否显示"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.is_show"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeSwitch({id:scope.row.id,val:scope.row.is_show})"
                        ></el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop="option"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="detail(scope.row)"
                        >详情</el-button>
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
