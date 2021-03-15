import { inspectionPlanList } from '@/api/onsite'
import task from './dialog/task.vue'
import pic from './dialog/pic.vue'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        SearchList,
        task,
        pic
    },
    data() {
        return {
            list: {}, // 列表数据
            diologStatus: false,
            dialogItem: null,
            diologTask: false,
            diologPic: false,
            dialogID: null,
            loading: false,
            scene: '', // 场景
            selectList: [],
            prepare: {
                is_check: {
                    0: '未检',
                    1: '已检'
                },
                result_flag: {
                    2: '不合格',
                    1: '合格'
                }
            },
            // 搜索的列表数据
            searchForm: {
                is_check: this.$route.query.is_check ? JSON.parse(this.$route.query.is_check) : '',
                result_flag: this.$route.query.result_flag ? JSON.parse(this.$route.query.result_flag) : '',
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                time: this.$route.query.time ? JSON.parse(this.$route.query.time) : { start: '', end: '' }
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '是否检查',
                type: 'is_check',
                mode: 'SearchSelect'
            }, {
                typeName: '是否合格',
                type: 'result_flag',
                mode: 'SearchSelect'
            }, {
                typeName: '任务名称',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '日期范围',
                type: 'time',
                mode: 'SearchTime'
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取数据
        getList() {
            this.loading = true
            const time = {
                start_time: this.searchForm.time.start,
                end_time: this.searchForm.time.end
            }
            const parse = Object.assign({}, this.searchForm, this.otherData, time)
            inspectionPlanList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
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
        toList(filed, data) {
            filed && this.$set(this.otherData, filed, data)
            this.common.toList(this.searchForm, this.otherData, this.getList)
        },
        // 导出数据
        outExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../../vendor/Export2Excel')
                const tHeader = ['巡检时间', '最新更新时间', '巡检人姓名', '是否已检', '巡检结果', '项目总数', '已检数', '未检数', '合格数', '不合格数', '总得分']
                const filterVal = ['check_time', 'mtime', 'check_user', 'is_check', 'result_flag', 'total_num', 'checked_num', 'un_check_num', 'qualified_num', 'fail_num', 'score']
                const list = this.list.data
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '结果数据')
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 管理任务
        task(id) {
            this.dialogID = id
            this.diologTask = true
        },
        pic(id) {
            this.dialogID = id
            this.diologPic = true
        },
        emitOut(d, e, s) {
            this[d] = e
            !s ? this.getList() : ''
        }
    }
}
