import { historyData, gatewaySelect, instrumentSelect, varlistSelect } from '@/api/information'
import { getEquipmentSiteList, getSearchParams } from '@/api/site'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
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
                group_name: this.$route.query.group_name ? JSON.parse(this.$route.query.group_name) : null,
                dev_name: this.$route.query.dev_name ? JSON.parse(this.$route.query.dev_name) : null,
                var_name: this.$route.query.var_name ? JSON.parse(this.$route.query.var_name) : null,
                var_class: this.$route.query.var_class ? JSON.parse(this.$route.query.var_class) : null,
                record_type: this.$route.query.record_type ? JSON.parse(this.$route.query.record_type) : null,
                data_eq: this.$route.query.data_eq ? JSON.parse(this.$route.query.data_eq) : null,
                data_scale: this.$route.query.data_scale ? JSON.parse(this.$route.query.data_scale) : { start: '', end: '' },
                start_data_scale: this.$route.query.start_data_scale ? JSON.parse(this.$route.query.start_data_scale) : null,
                end_data_scale: this.$route.query.end_data_scale ? JSON.parse(this.$route.query.end_data_scale) : null,
                startEnd: this.$route.query.startEnd ? JSON.parse(this.$route.query.startEnd) : { start: '', end: '' }
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '时间范围',
                type: 'startEnd',
                mode: 'SearchTime'
            }, {
                typeName: '监控站点',
                type: 'site_id',
                linkage: {
                    is: true,
                    link_next: 'selectPartition_type'
                },
                mode: 'SearchSelect'
            }, {
                typeName: '组名',
                type: 'group_name',
                obj: ['group_name', 'group_name'],
                selectType: true,
                linkage: {
                    is: true,
                    link_next: 'selectGateway_name'
                },
                mode: 'SearchSelect'
            }, {
                typeName: '设备名',
                type: 'dev_name',
                obj: ['dev_name', 'dev_name'],
                selectType: true,
                linkage: {
                    is: true,
                    link_next: 'selectDev_name'
                },
                mode: 'SearchSelect'
            }, {
                typeName: '变量名',
                type: 'var_name',
                obj: ['var_name', 'var_alias'],
                selectType: true,
                mode: 'SearchSelect'
            }, {
                typeName: '类别',
                type: 'var_class',
                mode: 'SearchSelect'
            }, {
                typeName: '记录方式',
                type: 'record_type',
                obj: ['key', 'value'],
                mode: 'SearchSelect'
            }, {
                typeName: '数据质量',
                type: 'data_eq',
                mode: 'SearchSelect',
                obj: ['value', 'name']
            }, {
                typeName: '数据变化率',
                type: 'data_scale',
                mode: 'SearchRank'
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },
    created() {
        if (!this.searchForm.startEnd.start) {
            this.searchForm.startEnd.start = this.getToday()
            this.searchForm.startEnd.end = this.getToday()
        }
        this.getRule()
    },
    methods: {
        getToday() {
            var day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            return day1.getFullYear() + '/' + (day1.getMonth() + 1) + '/' + day1.getDate()
        },
        // 获取数据
        getList() {
            this.loading = true
            const start_time = this.searchForm.startEnd.start || ''
            const end_time = this.searchForm.startEnd.end || ''
            const start_data_scale = this.searchForm.data_scale.start || ''
            const end_data_scale = this.searchForm.data_scale.end || ''
            const par = JSON.parse(JSON.stringify(this.searchForm))
            delete par.startEnd
            delete par.data_scale
            const parse = Object.assign({}, par, this.otherData, { start_time: start_time, end_time: end_time, start_data_scale: start_data_scale, end_data_scale: end_data_scale })
            historyData(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        async getRule() {
            const res = await getEquipmentSiteList({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'site_id', list)
                this.searchForm.site_id = list.length && String(list[0].id)
                this.selectPartition_type()
            }
            const res2 = await getSearchParams({})
            if (res2.code === 1) {
                this.$set(this.prepare, 'var_class', res2.data.class_type)
                this.$set(this.prepare, 'data_eq', res2.data.data_eq_list)
                this.$set(this.prepare, 'record_type', res2.data.recode_type)
            }
            console.log(this.prepare, 33)
            this.getList()
        },
        // 导出数据
        outExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../../vendor/Export2Excel')
                const tHeader = ['变量名称', '类别', '记录值', '数据质量', '数据变化率', '时间', '记录方式', '组名称', '设备名称']
                const filterVal = ['var_alias', 'var_class', 'value', 'data_eq_str', 'data_scale', 'recordtime', 'record_type', 'group_name', 'dev_name']
                const list = this.list.list
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '结果数据')
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        /**
         * @name: 返回的联动
         * @param {*} e
         * @return {*}
         */
        linkageData(e) {
            const item = Object.keys(e)[0]
            Object.assign(this.searchForm, { [item]: e[item] })
            this[e.next]()
        },
        async selectPartition_type() {
            this.searchForm.group_name = ''
            this.searchForm.dev_name = ''
            this.searchForm.var_name = ''
            const group_name = await gatewaySelect({ site_id: this.searchForm.site_id })
            if (group_name.code === 1) {
                this.$set(this.prepare, 'group_name', group_name.data.list)
            }
        },
        async selectGateway_name() {
            this.searchForm.dev_name = ''
            this.searchForm.var_name = ''
            const dev_name = await instrumentSelect({ site_id: this.searchForm.site_id, group_name: this.searchForm.group_name })
            if (dev_name.code === 1) {
                this.$set(this.prepare, 'dev_name', dev_name.data.list)
            }
        },
        async selectDev_name(e) {
            this.searchForm.var_name = ''
            const var_name = await varlistSelect({
                site_id: this.searchForm.site_id,
                group_name: this.searchForm.group_name,
                dev_name: this.searchForm.dev_name
            })
            if (var_name.code === 1) {
                this.$set(this.prepare, 'var_name', var_name.data.list)
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
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        }
    }
}
