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
                    prop="name"
                    label="任务名称"
                ></el-table-column>
                <el-table-column
                    prop="code"
                    label="乡村站点名称"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.equipments">
                            <div
                                v-for="(item,i) in scope.row.equipments"
                                :key="i"
                            >
                                {{ i===0?'':',' }}
                                {{ item.name }}
                            </div>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="负责人">
                    <template slot-scope="scope">
                        <span
                            v-for="(item,i) in scope.row.users"
                            :key="i"
                        >
                            {{ i===0?'':',' }}
                            {{ item.nick }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user.nick"
                    label="添加人"
                >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                >
                </el-table-column>
                <el-table-column
                    prop="department_name"
                    label="部门名称"
                ></el-table-column>
                <el-table-column
                    prop="ctime"
                    label="添加时间"
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
                            @click="edit(scope.row.id)"
                        >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="confirm(scope.row.id)"
                        >删除</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="task(scope.row.id)"
                        >管理乡村站点</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="person(scope.row.id)"
                        >管理负责人</el-button>
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
        <task
            v-if="diologTask"
            :id="dialogID"
            :status="diologTask"
            @emitOut="emitOut"
        />
        <person
            v-if="diologPerson"
            :id="dialogID"
            :status="diologPerson"
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
