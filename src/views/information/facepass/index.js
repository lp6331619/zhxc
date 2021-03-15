import { getFpSearchParams, accessLogList } from '@/api/information'
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
            bigUrl: '',
            dialogVisible: false,
            // 搜索的列表数据
            searchForm: {
                startEnd: this.$route.query.startEnd ? JSON.parse(this.$route.query.startEnd) : { start: '', end: '' },
                temperature_status: this.$route.query.temperature_status ? JSON.parse(this.$route.query.temperature_status) : null,
                direction: this.$route.query.direction ? JSON.parse(this.$route.query.direction) : null,
                person_group: this.$route.query.person_group ? JSON.parse(this.$route.query.person_group) : null,
                is_mask: this.$route.query.is_mask ? JSON.parse(this.$route.query.is_mask) : null,
                verify_result: this.$route.query.verify_result ? JSON.parse(this.$route.query.verify_result) : null,
                person_name: this.$route.query.person_name ? JSON.parse(this.$route.query.person_name) : '',
                device_id: this.$route.query.device_id ? JSON.parse(this.$route.query.device_id) : '',
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '时间范围',
                type: 'startEnd',
                mode: 'SearchTime',
                format: 'yyyy/MM/dd HH:mm',
                dateType: 'datetimerange',

            }, {
                typeName: '请输入姓名',
                type: 'person_name',
                mode: 'Input'
            }, {
                typeName: '体温状态',
                type: 'temperature_status',
                // obj: ['key', 'value'],
                mode: 'SearchSelect',
            }, {
                typeName: '进出方向',
                type: 'direction',
                // obj: ['key', 'value'],
                mode: 'SearchSelect'
            }, {
                typeName: '人员组',
                type: 'person_group',
                propsBox: { value: 'id' },
                mode: 'Cascader',
                options: []
            }, {
                typeName: '检索设备',
                type: 'device_id',
                obj: ['id', 'name'],
                mode: 'SearchSelect',
            }, {
                typeName: '是否戴口罩',
                type: 'is_mask',
                mode: 'SearchSelect',
                // obj: ['value', 'name']
            }, {
                typeName: '是否通行',
                type: 'verify_result',
                mode: 'SearchSelect',
                // obj: ['value', 'name']
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
            this.searchForm.startEnd.start = this.getToday() + ' 00:00'
            this.searchForm.startEnd.end = this.getToday() + ' 23:59'
        }
        this.getRule()
    },
    methods: {
        getToday() {
            var day1 = new Date()
            day1.setTime(day1.getTime())
            return day1.getFullYear() + '/' + (day1.getMonth() + 1) + '/' + day1.getDate()//+' '+day1.getHours()+':'+day1.getMinutes();
        },
        // 获取数据
        getList() {
            this.loading = true
            const start_time = this.searchForm.startEnd.start || ''
            const end_time = this.searchForm.startEnd.end || ''
            const par = JSON.parse(JSON.stringify(this.searchForm))
            delete par.startEnd
            const parse = Object.assign({}, par, this.otherData, { start_time: start_time, end_time: end_time })
            accessLogList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        async getRule() {
            const res2 = await getFpSearchParams({})
            if (res2.code === 1) {
                this.$set(this.prepare, 'temperature_status', res2.data.temperature_status)
                this.$set(this.prepare, 'is_mask', res2.data.is_mask)
                this.$set(this.prepare, 'verify_result', res2.data.verify_result)
                this.$set(this.prepare, 'direction', res2.data.direction)
                this.$set(this.prepare, 'person_group', res2.data.person_group_tree)
                this.$set(this.prepare, 'device_id', res2.data.total_device)
            }
            this.getList()
        },
        // 导出数据
        async outExcel() {
            const start_time = this.searchForm.startEnd.start || ''
            const end_time = this.searchForm.startEnd.end || ''
            const par = JSON.parse(JSON.stringify(this.searchForm))
            delete par.startEnd
            let url = this.apiUrl + 'site/Face_pass/export'
            url += '?start_time='+start_time
            url += '&end_time='+end_time
            for(var index in par){
                if(par[index]){
                  url += '&'+index+'='+par[index]
                }
            }
            window.open(url, '_blank')
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

        // 组件返回数据
        emitData(data) {
            console.log(data, 111)
            if (!data.clear) {
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
        /**
         * @name: 打开大图
         * @param {*} url
         * @return {*}
         */
        bigImg(url) {
            this.dialogVisible = true
            this.bigUrl = url
        },
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        }
    }
}
