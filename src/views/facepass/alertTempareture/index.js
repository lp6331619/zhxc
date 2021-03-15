import { getFpSearchParams, alertTemparetureList } from '@/api/information'
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
                status: this.$route.query.status ? JSON.parse(this.$route.query.status) : null,
                person_name: this.$route.query.person_name ? JSON.parse(this.$route.query.person_name) : '',
                device_id: this.$route.query.device_id ? JSON.parse(this.$route.query.device_id) : '',
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '告警时间',
                type: 'startEnd',
                mode: 'SearchTime',
                format: 'yyyy/MM/dd HH:mm',
                dateType: 'datetimerange',

            }, {
                typeName: '检索设备',
                type: 'device_id',
                obj: ['id', 'name'],
                mode: 'SearchSelect',
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
                typeName: '告警状态',
                type: 'status',
                // obj: ['key', 'value'],
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
        if (!this.searchForm.startEnd.start) {
            this.searchForm.startEnd.start = this.getToday() + ' 00:00'
            this.searchForm.startEnd.end = this.getToday() + ' 23:59'
        }
        this.getRule()
    },
    methods: {
        getToday() {
            var day1 = new Date()
            day1.setTime(day1.getTime() )
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
            alertTemparetureList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        async getRule() {
            const res2 = await getFpSearchParams({})
            if (res2.code === 1) {
                this.$set(this.prepare, 'temperature_status', res2.data.temperature_status)
                this.$set(this.prepare, 'device_id', res2.data.total_device)
                this.$set(this.prepare, 'status', res2.data.status)
            }
            this.getList()
        },
        // 导出数据
        outExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../../vendor/Export2Excel')
                const tHeader = ['现场照片', '相似度', '识别结果', '通行时间', '是否通行', '人员身份', '人员组', '设备名称', '体温状态', '进出方向', '体温', '是否戴口罩']
                const filterVal = ['capture_face_image_url', 'score', 'hit_face_image_url', 'access_time', 'verify_result', 'person_name', 'group_name', 'device_name', 'temperature_status', 'direction', 'body_temperature', 'is_mask']
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
