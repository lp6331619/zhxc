<template>
    <div>
        <el-dialog
            title="巡检结果"
            width="70%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div v-if="list">
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="list.list"
                >
                    <el-table-column
                        prop="name"
                        label="巡检名称"
                    ></el-table-column>
                    <el-table-column
                        prop="inspection_tp"
                        label="巡检方式"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="specification"
                        label="巡检规范"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="describe"
                        label="项目描述"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="result_tp"
                        label="结果类型"
                    >
                    <template slot-scope="scope">
                        {{ scope.row.result_tp===1?'勾选': scope.row.result_tp===2?'填写':'--' }}
                    </template>
                    </el-table-column>
                    <el-table-column
                        prop="score_standard"
                        label="标准参考值"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="min_score"
                        label="最小值"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="max_score"
                        label="最大值"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="实际得分"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="result_value"
                        label="实际数据"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="result_flag"
                        label="结果"
                    >
                    <template slot-scope="scope">
                        {{ scope.row.result_flag===1?'合格': scope.row.result_tp===2?'不合格':'--' }}
                    </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ctime"
                        label="巡检时间"
                    >
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
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="btnLoading"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { equipmentPlanListResult } from '@/api/onsite'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            loading: false,
            list: [],
            disabled: false,
            searchForm: {
            },
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            },
            btnLoading: false
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getList()
    },
    methods: {
        async getList() {
            const parse = Object.assign({}, this.searchForm, this.otherData, { id: this.id })
            const res = await equipmentPlanListResult(parse)
            if (res.code === 1) {
                this.list = res.data
            }
        },
        // 翻页
        handleSizeChange(data) {
            this.toList('limit', data)
        },
        // 跳转页面
        handleCurrentChange(data) {
            this.toList('page', data)
        },
        toList(filed, data) {
            filed && this.$set(this.otherData, filed, data)
            this.common.toList(this.searchForm, this.otherData, this.getList)
        },
        emitOut() {
            this.$emit('emitOut', 'diologTask', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologTask', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    justify-content: center;
}
</style>
