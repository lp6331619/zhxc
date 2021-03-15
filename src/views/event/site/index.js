import { getIndexIndex, getIndexStatus, getIndexDel } from '@/api/site'
import detail from './dialog/detail.vue'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        detail,
        SearchList
    },
    data() {
        return {
            list: {}, // 列表数据
            diologStatus: false,
            dialogItem: null,
            diologTask: false,
            diologPlan: false,
            diologCopy: false,
            dialogID: null,
            loading: false,
            scene: '', // 场景
            selectList: [],
            prepare: {},
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '关键词搜索',
                type: 'keyword',
                mode: 'Input'
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
            const parse = Object.assign({}, this.searchForm, this.otherData)
            getIndexIndex(parse).then(res => {
                this.list = res.data
                this.list.data.map(item => {
                    item.is_show = Number(item.is_show)
                    return item
                })
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
        // 编辑状态
        async changeSwitch(item) {
            if (item) {
                const msg = await getIndexStatus(item)
                this.$message.success(msg.msg)
                this.getList()
            }
        },
        // 修改
        edit(item) {
            this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该站点, 是否继续?', '提示', {
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
            const res = await getIndexDel({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getList()
            }
        },
        // 添加
        add() {
            this.scene = 'create'
            this.diologStatus = true
        },
        // 管理任务
        task(id) {
            this.dialogID = id
            this.diologTask = true
        },
        plan(id) {
            this.dialogID = id
            this.diologPlan = true
        },
        copy(id) {
            this.dialogID = id
            this.diologCopy = true
        },
        emitOut(d, e, s) {
            this[d] = e
            !s ? this.getList() : ''
        }
    }
}
