/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 09:34:00
 * @LastEditors: Teemor
 * @LastEditTime: 2020-10-16 10:35:28
 */
import { smsList } from '@/api/information'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        SearchList
    },
    data() {
        return {
            list: {}, // 列表数据
            loading: false,
            prepare: undefined,
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : ''
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '短信内容',
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
        /**
         * @name: 获取数据
         * @param {type}
         * @return {type}
         */
        getList() {
            this.loading = true
            const parse = Object.assign({}, this.searchForm, this.otherData)
            smsList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        /**
        * @name: 组件返回数据
        * @param {type} 
        * @return {type} 
        */
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
        }
    }
}
