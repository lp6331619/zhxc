<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-08-17 15:49:11
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-10 14:21:22
-->
<template>
    <div class="dashboard-container">
        <el-card class="box-card">
            <SearchList
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
                @linkageData="linkageData($event)"
            />
        </el-card>
        <div class="lineBox">
            <LineBox
                v-if="list"
                id="list"
                :data="list"
                :title="false"
            />
            <div
                v-else
                class="clearfix"
            >暂无数据</div>
        </div>
    </div>
</template>

<script>
import { getEchart } from '@/api/device'
import { selectPartitionType, getGroupNames, getDevNames,getVarAliass } from '@/api/device'
import { SearchList } from '@/components/SearchBox'
import { LineBox } from '@/components/Echart'
export default {
    name: 'Trend',
    components: {
        SearchList,
        LineBox
    },
    data() {
        return {
            prepare: {},
            list: undefined,
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                partition_type: this.$route.query.partition_type ? JSON.parse(this.$route.query.partition_type) : '',
                group_name: this.$route.query.group_name ? JSON.parse(this.$route.query.group_name) : null,
                dev_name: this.$route.query.dev_name ? JSON.parse(this.$route.query.dev_name) : null,
                var_name: this.$route.query.var_name ? JSON.parse(this.$route.query.var_name) : null,
                start_time: this.$route.query.start_time ? JSON.parse(this.$route.query.start_time) : null,
                end_time: this.$route.query.end_time ? JSON.parse(this.$route.query.end_time) : null,
                start_Date: this.$route.query.start_Date ? JSON.parse(this.$route.query.start_Date) : { start: '', end: '' },
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '时间范围',
                type: 'start_Date',
                mode: 'SearchTime',
                format: 'yyyy/MM/dd HH:mm',
                dateType: 'datetimerange',
            }, {
                typeName: '监控站点',
                type: 'partition_type',
                obj: ['partition_type', 'partition_type'],
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
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },

    created() {
        this.searchForm.start_time = this.getToday() + ' 00:00'
        this.searchForm.end_time = this.getToday() + ' 23:59'
        console.log(this.searchForm.start_time)
        console.log(this.searchForm.end_time)
        this.searchForm.start_Date = {
            start: this.searchForm.start_time,
            end: this.searchForm.end_time
        }
        this.getPrepare()
    },
    mounted() {
    },
    methods: {
        async getList() {
            this.searchForm.start_time = this.searchForm.start_Date.start || this.getToday()
            this.searchForm.end_time = this.searchForm.start_Date.end || this.getToday()
            this.searchForm.start_Date = {
                start: this.searchForm.start_time,
                end: this.searchForm.end_time
            }
            this.list = {}
            const parse = Object.assign({}, this.searchForm)
            const res = await getEchart(parse)
            if (res.code === 1 && res.data.x_data.length) {
                this.list = {
                    name: '趋势分析',
                    xdata: res.data.x_data,
                    list: res.data.y_data
                }
            }
        },
        async getPrepare() {
            const res = await selectPartitionType({})
            if (res.code === 1) {
                const list = []
                for (const i in res.data.list) {
                    list.push(res.data.list[i])
                }
                this.$set(this.prepare, 'partition_type', list)
                this.searchForm.partition_type = list.length && String(list[0].partition_type )
                this.selectPartition_type()
            }
            this.getList()
        },
        async selectPartition_type() {
            this.searchForm.group_name = ''
            this.searchForm.dev_name = ''
            this.searchForm.var_name = ''
            const group_name = await getGroupNames({ partition_type: this.searchForm.partition_type })
            if (group_name.code === 1) {
                this.$set(this.prepare, 'group_name', group_name.data.list)
            }
        },
        async selectGateway_name() {
            this.searchForm.dev_name = ''
            this.searchForm.var_name = ''
            const dev_name = await getDevNames({ partition_type: this.searchForm.partition_type, group_name: this.searchForm.group_name })
            if (dev_name.code === 1) {
                this.$set(this.prepare, 'dev_name', dev_name.data.list)
            }
        },
        async selectDev_name(e) {
            this.searchForm.var_name = ''
            const var_name = await getVarAliass({
                partition_type: this.searchForm.partition_type,
                group_name: this.searchForm.group_name,
                dev_name: this.searchForm.dev_name
            })
            if (var_name.code === 1) {
                this.$set(this.prepare, 'var_name', var_name.data.list)
            }
        },
        // 组件返回数据
        emitData(data) {
            if (!data.clear) {
                this.searchForm = data.searchData
                this.otherData = data.otherData
            }
            this.toList()
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
        getToday() {
            var day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            return day1.getFullYear() + '/' + (day1.getMonth() + 1) + '/' + day1.getDate()
        }
    }
}
</script>

<style lang="scss" scoped>
.lineBox {
    width: 100%;
    height: 800px;
    .clearfix {
        text-align: center;
        color: #fff;
        line-height: 600px;
    }
}
</style>
