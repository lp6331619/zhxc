import { deviceSearchParams, deviceList,asynDevice } from '@/api/information'
import location from './dialog/location.vue'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        SearchList,
        location
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
                status: this.$route.query.status ? JSON.parse(this.$route.query.status) : null,
                type: this.$route.query.type ? JSON.parse(this.$route.query.type) : null,
                name: this.$route.query.name ? JSON.parse(this.$route.query.name) : '',
                code: this.$route.query.code ? JSON.parse(this.$route.query.code) : '',
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '请输入名称',
                type: 'name',
                mode: 'Input'
            }, {
                typeName: '请输入编号',
                type: 'code',
                mode: 'Input'
            }, {
                typeName: '设备类型',
                type: 'type',
                // obj: ['key', 'value'],
                mode: 'SearchSelect',
            }, {
                typeName: '全部状态',
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
        this.getRule()
    },
    methods: {
        // 修改
        edit(item) {
            this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
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
            console.log(this.diologStatus)
        },
        // 获取数据
        getList() {
            this.loading = true
            const par = JSON.parse(JSON.stringify(this.searchForm))
            const parse = Object.assign({}, par, this.otherData)
            deviceList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        async getRule() {
            const res2 = await deviceSearchParams({})
            if (res2.code === 1) {
                this.$set(this.prepare, 'status', res2.data.status)
                this.$set(this.prepare, 'type', res2.data.device_type)
            }
            this.getList()
        },
        // 同步数据
        async outExcel() {
          const res = await asynDevice({})
          if (res.code === 1) {
            this.$message.success('同步成功')
            this.getList()
          }else{
            this.$message.error(res.msg)
          }
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
            console.log(s,e)
            !s ? this.getList() : ''
        }
    }
}
