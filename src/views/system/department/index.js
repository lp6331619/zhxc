import { getDepartmentsIndex, delDepartments } from '@/api/system'
import { SearchList } from '@/components/SearchBox'
import detail from './dialog/detail.vue'
export default {
    components: {
        SearchList,
        detail
    },
    data() {
        return {
            list: {}, // 列表数据
            listData: [],
            loading: false,
            scene: '', // 场景
            diologStatus: false,
            dialogItem: null,
            prepare: undefined,
            // 搜索的列表数据
            searchForm: {},
            // 其余的数据
            otherData: {
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
            getDepartmentsIndex(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
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
        add(row) {
            this.scene = 'create'
            this.dialogItem = row
            this.diologStatus = true
        },
        // 修改
        edit(item) {
            this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true
            console.log(item, 222)
        },
        // 删除
        async del(id) {
            const res = await delDepartments({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getList()
            }
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        }
    }
}
