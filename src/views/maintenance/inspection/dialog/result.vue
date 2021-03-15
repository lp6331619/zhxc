<template>
    <div>
        <el-dialog
            title="巡检结果"
            width="70%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div class="dialogMaint">
                <el-tag>项目总数:{{ total.project_num }}</el-tag>
                <el-tag>已检数:{{ total.checked_num }}</el-tag>
                <el-tag type="danger">未检数:{{ total.un_check_num }}</el-tag>
                <el-tag>合格数:{{ total.qualified }}</el-tag>
                <el-tag type="danger">不合格数:{{ total.fail }}</el-tag>
                <el-tag>总分:{{ total.total_score }}</el-tag>

                <el-table
                    v-if="data.list "
                    ref="multipleTable"
                    v-loading="loading"
                    :data="data.list"
                >
                    <el-table-column
                        prop="name"
                        label="巡检名称"
                    ></el-table-column>
                    <el-table-column
                        prop="inspection_tp"
                        label="巡检方式"
                    ></el-table-column>
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
                            {{ scope.row.result_flag===1?'合格': scope.row.result_flag===2?'不合格':'未检' }}
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
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="handleClose"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { equipmentPlanListResult, equipmentGetPlanResultCount } from '@/api/onsite'
export default {
    name: 'EditUpdate',
    components: {
    },
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
            prepare: undefined,
            disabled: false,
            data: {},
            total: {}
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const res = await equipmentPlanListResult({ id: this.id })
            if (res.code === 1) {
                this.data = res.data
            }
            const res2 = await equipmentGetPlanResultCount({ id: this.id })
            if (res2.code === 1) {
                this.total = res2.data
            }
        },
        emitOut() {
            this.$emit('emitOut', 'diologResult', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologResult', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
