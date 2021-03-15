<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <div class="btnArr">
                <el-button
                    icon="el-icon-plus"
                    @click="$router.push({path:'/role/detail',query:{scene:'create'}})"
                >添加角色</el-button>
                <el-button @click="changeStatus(1)">启用</el-button>
                <el-button @click="changeStatus(0)">禁用</el-button>
                <el-button @click="delArray()">删除</el-button>
            </div>
        </el-card>
        <el-card class="box-card">

            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.data"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="角色名称"
                >
                </el-table-column>
                <el-table-column
                    prop="intro"
                    label="角色简介"
                >
                </el-table-column>
                <el-table-column
                    prop="company.name"
                    label="公司名称"
                >
                </el-table-column>
                <el-table-column
                    prop="ctime"
                    label="创建时间"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeSwitch({id:scope.row.id,val:scope.row.status})"
                        ></el-switch>
                    </template>
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
                            @click="$router.push({path:'/role/detail',query:{id:scope.row.id,scene:'update'}})"
                        >修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="confirm([scope.row.id])"
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
</style>
