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
import { getFpSearchParams,temparetureEchart } from '@/api/information'
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
                start_time: this.$route.query.start_time ? JSON.parse(this.$route.query.start_time) : null,
                end_time: this.$route.query.end_time ? JSON.parse(this.$route.query.end_time) : null,
                start_Date: this.$route.query.start_Date ? JSON.parse(this.$route.query.start_Date) : { start: '', end: '' },
                temperature_status: this.$route.query.temperature_status ? JSON.parse(this.$route.query.temperature_status) : null,
                // direction: this.$route.query.direction ? JSON.parse(this.$route.query.direction) : null,
                person_group: this.$route.query.person_group ? JSON.parse(this.$route.query.person_group) : null,
                is_mask: this.$route.query.is_mask ? JSON.parse(this.$route.query.is_mask) : null,
                verify_result: this.$route.query.verify_result ? JSON.parse(this.$route.query.verify_result) : null,
                person_name: this.$route.query.person_name ? this.$route.query.person_name : '',
                device_id: this.$route.query.device_id ? JSON.parse(this.$route.query.device_id) : '',
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '时间范围',
                type: 'start_Date',
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
            }, /* {
                typeName: '进出方向',
                type: 'direction',
                // obj: ['key', 'value'],
                mode: 'SearchSelect'
            }, */ {
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
      this.searchForm.start_time = this.searchForm.start_Date.start || this.getToday() + ' 00:00'
      this.searchForm.end_time = this.searchForm.start_Date.end || this.getToday() + ' 23:59'
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
            const res = await temparetureEchart(parse)
            if (res.code === 1 && res.data.x_data) {
                this.list = {
                    name: '趋势分析',
                    xdata: res.data.x_data,
                    list: res.data.y_data
                }
            }

        },
        async getPrepare() {
            const res2 = await getFpSearchParams({})
            if (res2.code === 1) {
                this.$set(this.prepare, 'temperature_status', res2.data.temperature_status)
                this.$set(this.prepare, 'is_mask', res2.data.is_mask)
                this.$set(this.prepare, 'verify_result', res2.data.verify_result)
                // this.$set(this.prepare, 'direction', res2.data.direction)
                this.$set(this.prepare, 'person_group', res2.data.person_group_tree)
                this.$set(this.prepare, 'device_id', res2.data.total_device)
            }
            this.getList()
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
