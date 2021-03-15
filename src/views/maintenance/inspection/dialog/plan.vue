<template>
    <div>
        <el-dialog
            title="管理计划"
            width="70%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div class="dialogMaint">
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="add()"
                >新增</el-button>
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="data"
                >
                    <el-table-column
                        prop="name"
                        label="计划名称"
                    ></el-table-column>
                    <el-table-column
                        prop="item_ids"
                        label="巡检项目"
                    >
                        <template slot-scope="scope">
                            <span
                                v-for="(item,i) in scope.row.items"
                                :key="i"
                            >
                                {{ i===0? '' :',' }}{{ item.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="frequencyName"
                        label="执行频率"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ctime"
                        label="起始时间"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.begin_month>=0">{{ scope.row.begin_month }} 月</span>
                            <span v-if="scope.row.begin_day>=0">{{ scope.row.begin_day }} 号</span>
                            <span v-if="scope.row.begin_week>=0"> 周 {{ scope.row.begin_week }}</span>
                            <span v-if="scope.row.begin_hour>=0">{{ scope.row.begin_hour }} 时</span>
                            <span v-if="scope.row.begin_min>=0">{{ scope.row.begin_min }} 分</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="mtime"
                        label="结束点间"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.end_month>=0">{{ scope.row.end_month }} 月</span>
                            <span v-if="scope.row.end_day>=0">{{ scope.row.end_day }} 号</span>
                            <span v-if="scope.row.end_week>=0">周{{ scope.row.end_week }} </span>
                            <span v-if="scope.row.end_hour>=0">{{ scope.row.end_hour }} 时</span>
                            <span v-if="scope.row.end_min>=0">{{ scope.row.end_min }} 分</span>
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
                                @click="history(scope.row.id)"
                            >执行历史</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加计划 计划详情 -->
            <planEdit
                v-if="innerVisible"
                :id="innerVisibleId"
                :equipment="id"
                :scene="scene"
                :status="innerVisible"
                @emitOut="emitOutPriv"
            />
            <history
                v-if="dialogHistory"
                :id="innerVisibleId"
                :equipment="id"
                :status="dialogHistory"
                @emitOut="emitOutPriv"
            />
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
import { equipmentPlanList, equipmentDelPlan } from '@/api/onsite'
import planEdit from './planEdit'
import history from './history'
export default {
    name: 'EditUpdate',
    components: {
        planEdit,
        history
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
            innerVisible: false,
            innerVisibleId: null,
            dialogHistory: false,
            loading: false,
            scene: '',
            prepare: undefined,
            disabled: false,
            data: [],
            form: {}
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
            const res = await equipmentPlanList({ equipment_id: this.id })
            if (res.code === 1) {
                this.data = res.data.data
                this.data.map(item => {
                    this.$set(item, 'frequencyName', this.back(item.frequency))
                })
            }
        },
        back(i) {
            let text
            switch (i) {
                case 1:
                    text = '每年'
                    break
                case 2:
                    text = '每月'
                    break
                case 3:
                    text = '每周'
                    break
                case 4:
                    text = '每日'
                    break
            }
            return text
        },
        add() {
            this.innerVisible = true
            this.scene = 'create'
        },
        edit(id) {
            this.innerVisible = true
            this.innerVisibleId = id
            this.scene = 'update'
        },
        // 单个计划执行历史
        history(id) {
            this.innerVisibleId = id
            this.dialogHistory = true
        },
        // 成功后
        callback(res) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.setStatusStatus = false
                this.emitOut()
            }
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        // 删除
        async del(id) {
            const res = await equipmentDelPlan({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getDetail()
            }
        },
        emitOutPriv(s) {
            this[s] = false
            this.getDetail()
        },
        emitOut() {
            this.$emit('emitOut', 'diologPlan', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologPlan', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
