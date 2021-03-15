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
                    prop="name"
                    label="乡村站点"
                ></el-table-column>
                <el-table-column
                    prop="code"
                    label="编码"
                >
                </el-table-column>
                <el-table-column
                    prop="manufacturer"
                    label="厂商"
                ></el-table-column>
                <el-table-column
                    prop="qr_code"
                    label="二维码"
                >
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.qr_code"
                            class="maxImg"
                            :src="imgUrl+scope.row.qr_code"
                            @click="bigImg(imgUrl+scope.row.qr_code)"
                            alt=""
                        >
                    </template>
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
                            @change="changeSwitch({id:scope.row.id,val:scope.row.status,field:'status'})"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="bluetooth_id"
                    label="芯片ID"
                ></el-table-column>
                <el-table-column
                    prop="distance"
                    label="距离"
                ></el-table-column>
                <el-table-column
                    prop="is_open"
                    label="芯片状态"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.is_open"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeSwitch({id:scope.row.id,val:scope.row.is_open,field:'is_open'})"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="option"
                    label="操作"
                    min-width="220"
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
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="task(scope.row.id)"
                        >管理任务</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="plan(scope.row.id)"
                        >管理计划</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="copy(scope.row.id)"
                        >复制乡村站点</el-button>
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
        <task
            v-if="diologTask"
            :id="dialogID"
            :status="diologTask"
            @emitOut="emitOut"
        />
        <plan
            v-if="diologPlan"
            :id="dialogID"
            :status="diologPlan"
            @emitOut="emitOut"
        />
        <copy
            v-if="diologCopy"
            :id="dialogID"
            :status="diologCopy"
            @emitOut="emitOut"
        />
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
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.bigImg {
    text-align: center;
}
</style>
