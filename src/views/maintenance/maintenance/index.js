import { operationIndex, operationDel } from '@/api/onsite'
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
            loading: false,
            diologUpload: false,
            scene: '', // 场景
            prepare: {
            },
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '事件标题',
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
            operationIndex(parse).then(res => {
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
        // 修改
        edit(item) {
            /* this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true */
            this.$router.push(`/maintenanceDetail?scene=update&id=${item.id}`)
        },
        detail(item) {
            /* this.dialogItem = item
            this.scene = 'detail'
            this.diologStatus = true */
            this.$router.push(`/maintenanceDetail?scene=detail&id=${item.id}`)
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
            const res = await operationDel({ id: id })
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
            /* this.scene = 'create'
            this.diologStatus = true */
            this.$router.push(`/maintenanceDetail?scene=create&id=`)
        },
        emitOut(d, e, s) {
            this[d] = e
            !s ? this.getList() : ''
        }
    }
}
