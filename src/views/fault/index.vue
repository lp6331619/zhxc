<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-08-17 15:49:11
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-16 10:03:21
-->
<template>
    <div class="dashboard-container">
        <el-card class="box-card searchFlex">
            <SearchList
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
                @linkageData="linkageData($event)"
            />
            <div class="btnArr">
                <el-button @click="outExcel()">导出数据</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.list"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                ></el-table-column>
                <el-table-column
                    prop="var_alias"
                    label="变量名"
                ></el-table-column>
                <el-table-column
                    prop="class_type"
                    label="类别"
                ></el-table-column>
                <el-table-column
                    prop="recordtime"
                    label="时间"
                ></el-table-column>
                <el-table-column
                    prop="value"
                    label="记录值"
                ></el-table-column>
                <el-table-column
                    prop="text"
                    label="事件信息"
                >
                </el-table-column>
                <el-table-column
                    prop="record_type"
                    label="记录方式"
                ></el-table-column>
                <el-table-column
                    prop="district_name"
                    label="站点名称"
                ></el-table-column>
                <el-table-column
                    prop="group_name"
                    label="组名称"
                ></el-table-column>
                <el-table-column
                    prop="dev_name"
                    label="设备名"
                ></el-table-column>
            </el-table>
            <div
                v-if="list"
                class="pageBox flex pt20"
            >
                <el-pagination
                    background
                    :total="list.count"
                    :current-page="otherData.page"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="otherData.limit"
                    layout="total, sizes, prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getEquipmentSiteList, getSearchParams } from '@/api/site'
import { HistoryAlarmList, gatewaySelect, instrumentSelect, varlistSelect } from '@/api/information'
import { SearchList } from '@/components/SearchBox'
export default {
    name: 'Trend',
    components: {
        SearchList
    },
    data() {
        return {
            prepare: {},
            list: [],
            loading: true,
            // 搜索的列表数据
            searchForm: {
                district_name: this.$route.query.district_name ? JSON.parse(this.$route.query.district_name) : null,
                recode_type: this.$route.query.recode_type ? JSON.parse(this.$route.query.recode_type) : '',
                site_id: this.$route.query.site_id ? JSON.parse(this.$route.query.site_id) : '',
                group_name: this.$route.query.group_name ? JSON.parse(this.$route.query.group_name) : null,
                dev_name: this.$route.query.dev_name ? JSON.parse(this.$route.query.dev_name) : null,
                var_name: this.$route.query.var_name ? JSON.parse(this.$route.query.var_name) : null,
                start_time: this.$route.query.start_time ? JSON.parse(this.$route.query.start_time) : null,
                end_time: this.$route.query.end_time ? JSON.parse(this.$route.query.end_time) : null,
                start_Date: this.$route.query.start_Date ? JSON.parse(this.$route.query.start_Date) : { start: '', end: '' }
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '时间范围',
                type: 'start_Date',
                mode: 'SearchTime'
            }, {
                typeName: '记录方式',
                type: 'recode_type',
                obj: ['key', 'value'],
                mode: 'SearchSelect'
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
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },

    created() {
        if (!this.searchForm.start_Date.start) {
            this.searchForm.start_Date.start = this.getToday()
            this.searchForm.start_Date.end = this.getToday()
        }
        this.getPrepare()
    },
    mounted() {

    },
    methods: {
        getToday() {
            var day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            return day1.getFullYear() + '/' + (day1.getMonth() + 1) + '/' + day1.getDate()
        },
        async getList() {
            this.loading = true
            this.searchForm.start_time = this.searchForm.start_Date.start || this.getToday()
            this.searchForm.end_time = this.searchForm.start_Date.end || this.getToday()
            const parmas = JSON.parse(JSON.stringify(this.searchForm))
            delete parmas.start_Date
            const parse = Object.assign({}, parmas, this.otherData)
            const res = await HistoryAlarmList(parse)
            if (res.code === 1) {
                this.list = res.data
                this.loading = false
            }
        },
        // 导出数据
        outExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../vendor/Export2Excel')
                const tHeader = ['ID', '变量名', '类别', '时间', '记录值', '事件信息', '记录方式', '区名称', '组名称', '设备名']
                const filterVal = ['id', 'var_alias', 'class_type', 'recordtime', 'value', 'text', 'record_type', 'district_name', 'group_name', 'dev_name']
                const list = this.list.list
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '结果数据')
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        async getPrepare() {
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
                this.$set(this.prepare, 'recode_type', res2.data.recode_type)
            }
            this.getList()
        },

        async selectPartition_type() {
            this.searchForm.group_name = ''
            this.searchForm.dev_name = ''
            this.searchForm.var_name = ''
            const group_name = await gatewaySelect({ site_id: this.searchForm.site_id })
            if (group_name.code === 1) {
                this.$set(this.prepare, 'group_name', group_name.data.list)
                console.log(this.prepare, 333)
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
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
