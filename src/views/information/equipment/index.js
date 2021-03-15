import { varconfiglist, updConfigShow } from '@/api/information'
import { getEquipmentSiteList } from '@/api/site'
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
            loading: false,
            scene: '', // 场景
            dialogItem: undefined,
            prepare: {},
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                site_id: this.$route.query.site_id ? JSON.parse(this.$route.query.site_id) : '',
                // type: this.$route.query.type ? JSON.parse(this.$route.query.type) : null,
                // district_name: this.$route.query.district_name ? JSON.parse(this.$route.query.district_name) : null
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '变量别名',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '站点',
                type: 'site_id',
                mode: 'SearchSelect'
            },
            // /* {
            //     typeName: '读写分类',
            //     type: 'type',
            //     mode: 'SearchSelect'
            // }, */
            /* {
                typeName: '区名',
                type: 'district_name',
                obj: ['district_name', 'district_name'],
                selectType: true,
                mode: 'SearchSelect'
            } */],
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
        getList() {
            this.loading = true
            const parse = Object.assign({}, this.searchForm, this.otherData)
            varconfiglist(parse).then(res => {
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

        // 获取相关数据
        async getRule() {
            /* const partition_type = await selectPartitionType({})
            if (partition_type.code === 1) {
                this.$set(this.prepare, 'district_name', partition_type.data.list)
            } */
            /* const type = await varConfigParam({})
            if (type.code === 1) {
                this.$set(this.prepare, 'type', type.data.type)
            } */
            const res = await getEquipmentSiteList({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'site_id', list)
            }
        },
        // 编辑状态
        async changeSwitch(item) {
            if (item) {
                const msg = await updConfigShow(item)
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
        // 添加
        add() {
            this.scene = 'create'
            this.diologStatus = true
        },
        // 详情
        detail(item) {
            this.dialogItem = item
            this.scene = 'detail'
            this.diologStatus = true
        },
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        }
    }
}
