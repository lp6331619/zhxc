import { role, statusRole, delRole } from '@/api/system'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        SearchList
    },
    data() {
        return {
            list: {}, // 列表数据
            loading: false,
            scene: '', // 场景
            selectList: [],
            prepare: undefined,
            // 搜索的列表数据
            searchForm: {
            },
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
            role(parse).then(res => {
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
        // 编辑状态
        async changeSwitch(item) {
            if (item) {
                const msg = await statusRole(item)
                this.$message.success(msg.msg)
                this.getList()
            }
        },
        // 改变状态
        changeStatus(type) {
            const id = []
            if (this.selectList.length > 0) {
                this.selectList.forEach(item => {
                    id.push(item.id)
                })
                this.changeSwitch({ id: id, val: type })
            }
        },
        // 删除
        delArray() {
            const id = []
            this.selectList.forEach(item => {
                id.push(item.id)
            })
            this.confirm(id)
        },
        // 删除
        async del(id) {
            const res = await delRole({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
            }
            this.getList()
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        handleSelectionChange(item) {
            this.selectList = item
        }
    }
}
