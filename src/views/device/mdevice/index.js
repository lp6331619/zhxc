import { getEquipmentIndex, selectPartitionType, getEquipmentDel } from '@/api/device'
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
                partition_type: this.$route.query.partition_type ? JSON.parse(this.$route.query.partition_type) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '设备监控名称',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '区名称',
                type: 'partition_type',
                obj: ['partition_type', 'partition_type'],
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
            const res = await selectPartitionType({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'partition_type', list)
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
            this.$router.push(`/mdeviceDetail?id=${row.id}`)
        },
        showHistory(row) {
          //partition_type="${row.partition_type}
            this.$router.push(`/mdeviceHistory?monitor_id="${row.id}"`)
        },
        edit(id) {
            this.$router.push(`/mdeviceCreate?id=${id}`)
        },
        openEchart() {
            this.$router.push(`/mtrend`)
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
