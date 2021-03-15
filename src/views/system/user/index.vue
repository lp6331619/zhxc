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
                >新增员工</el-button>
                <el-button
                    plain
                    @click="changeStatus(1)"
                >启用</el-button>
                <el-button
                    plain
                    @click="changeStatus(0)"
                >禁用</el-button>
                <el-button
                    plain
                    @click="delArray()"
                >删除</el-button>
            </div>
        </el-card>
        <el-card class="box-card">

            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.list"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column
                    label="用户名"
                    prop="username"
                >
                    <template slot-scope="scope">
                        <a
                            class="blue"
                            @click="seeDetail(scope.row)"
                        >{{ scope.row.username }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="nick"
                    label="姓名"
                ></el-table-column>
                <el-table-column
                    prop="roles"
                    label="角色"
                >
                    <template slot-scope="scope">
                        <el-tag
                            v-for="(item,i) in scope.row.roles"
                            :key="i"
                            class="ml10"
                            size="mini"
                        >{{ item.name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="company.name"
                    label="公司名称"
                ></el-table-column>
                <el-table-column
                    prop="department.name"
                    label="直属部门"
                ></el-table-column>
                <el-table-column
                    prop="superior.nick"
                    label="直属上司"
                ></el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机"
                ></el-table-column>
                <el-table-column
                    prop="last_login_time"
                    label="最后登录"
                ></el-table-column>
                <el-table-column
                    prop="last_login_ip"
                    label="登录IP"
                ></el-table-column>
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
                    min-width="240"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="edit(scope.row)"
                        >修改</el-button>
                        <el-button
                            v-if="uid==1"
                            size="mini"
                            plain
                            @click="signIn(scope.row)"
                        >一键登录</el-button>
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
        <!-- 详情 -->
        <detail
            v-if="diologStatus"
            :id="dialogId"
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
