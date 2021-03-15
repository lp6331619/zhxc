import { getEquipmentIndex, getEquipmentSiteList, getEquipmentDel } from '@/api/site'
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
            prepare: {},
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                site_id: this.$route.query.site_id ? JSON.parse(this.$route.query.site_id) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '设备监控名称',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '站点',
                type: 'site_id',
                mode: 'SearchSelect'
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },
    created() {
        this.getRule()
        this.getList()
    },
    methods: {
        // 获取数据
        async getList() {
            this.loading = true
            const parse = Object.assign({}, this.searchForm, this.otherData)
            const res = await getEquipmentIndex(parse)
            if (res.code === 1) {
                this.list = res.data
            }
            this.loading = false
        },
        async getRule() {
            const res = await getEquipmentSiteList({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'site_id', list)
            }
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
        open(row) {
            this.$router.push(`/equipmentDetail?id=${row.id}`)
        },
        edit(id) {
            this.$router.push(`/equipmentCreate?id=${id}`)
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
            const res = await getEquipmentDel({ id: id })
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
        emitOut(d, e, s) {
            this[d] = e
            !s ? this.getList() : ''
        }
    }
}
