<template>
    <div>
        <el-dialog
            title="执行历史"
            width="70%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <!-- <el-card class="box-card">
                <SearchList
                    :prepare-data="prepare"
                    :search-data="searchForm"
                    :search-list-data="formType"
                    :other-data="otherData"
                    @emitData="emitData($event)"
                />
            </el-card> -->
            <el-card class="box-card">
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="list.data"
                >
                    <el-table-column
                        prop="name"
                        label="计划名称"
                    ></el-table-column>
                    <el-table-column
                        prop="code"
                        label="巡检项目"
                    >
                        <template>
                            <span
                                v-for="(item,i) in list.items"
                                :key="i"
                            >
                                {{ i===0?'':',' }} {{ item }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="frequency"
                        label="执行频率"
                    ></el-table-column>
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
                        prop="is_check"
                        label="是否巡检"
                    ></el-table-column>
                    <el-table-column
                        prop="check_time"
                        label="巡检时间"
                    ></el-table-column>
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
                                @click="result(scope.row.id)"
                            >巡检结果</el-button>
                            <!-- <el-button
                                size="mini"
                                type="primary"
                                plain
                                @click="pic(scope.row.id)"
                            >查看图片 todo</el-button> -->
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
                <result
                    v-if="diologResult"
                    :id="dialogID"
                    :status="diologResult"
                    @emitOut="emitOut"
                />
            </el-card>

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
import { equipmentPlanHistory } from '@/api/onsite'

import result from './result'
import { SearchList } from '@/components/SearchBox'
export default {
    name: 'EditUpdate',
    components: {
        SearchList,
        result
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
            diologResult: false,
            loading: false,
            list: {},
            prepare: {
                status: {
                    0: '关闭',
                    1: '正常'
                }
            },
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                status: this.$route.query.status ? JSON.parse(this.$route.query.status) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '站点名称',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '状态',
                type: 'status',
                mode: 'SearchSelect'
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }

        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getList()
    },
    methods: {
        // 获取数据
        getList() {
            this.loading = true
            const parse = Object.assign({}, { id: this.id }, this.searchForm, this.otherData)
            equipmentPlanHistory(parse).then(res => {
                if (res.code === 1) {
                    this.list = res.data
                }
                this.loading = false
            })
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
        // 组件返回数据
        emitData(data) {
            if (data.clear) {
                this.$refs.multipleTable.clearSelection()
                this.$refs.multipleTable.clearSort()
                this.$refs.multipleTable.clearFilter()
            } else {
                this.searchForm = data.searchData
                this.otherData = data.otherData
            }
            this.toList()
        },
        // 翻页
        handleSizeChange(data) {
            this.toList('limit', data)
        },
        // 跳转页面
        handleCurrentChange(data) {
            this.toList('page', data)
        },
        result(id) {
            this.dialogID = id
            this.diologResult = true
        },
        toList(filed, data) {
            filed && this.$set(this.otherData, filed, data)
            this.common.toList(this.searchForm, this.otherData, this.getList)
        },
        emitOut() {
            this.$emit('emitOut', 'dialogHistory', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'dialogHistory', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
