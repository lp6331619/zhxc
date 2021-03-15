<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-01-12 11:12:33
 * @LastEditors: Teemor
 * @LastEditTime: 2021-01-12 17:45:15
-->
<template>
    <el-cascader
        v-if="prepareData&&searchType&&prepareData[searchType]"
        :show-all-levels="false"
        :options="prepareData[searchType]"
        v-model="searchData"
        :props="propsBox"
        change-on-select
        @change="handleChange"
    >
    </el-cascader>
</template>

<script>
export default {
    props: {
        searchType: {
            type: String,
            default: ''
        },
        prepareType: {
            type: String,
            default: ''
        },
        initData: {
            type: Array,
            ddefault: () => {
                return []
            }
        },
        searchName: {
            type: String,
            default: ''
        },
        prepareData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 配置项
        propsBox: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 是否disabled
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchData: [], // 搜索的数据
            prepareBox: {} // prepareBox数据
        }
    },
    watch: {
        initData: {
            handler(newValue, oldValue) {
                this.searchData = newValue
            },
            deep: true
        }
    },
    created() {
        this.searchData = this.initData
    },
    beforeUpdate() {
        this.searchData = this.initData
    },
    methods: {// 选择搜索类型
        handleChange(data) {
            this.outData()
        },
        // 获取 prepare
        // 导出数据
        outData() {
            this.$emit('emitData', {
                data: this.searchData,
                type: this.searchType
            })
        }
    }
}
</script>

<style>
</style>
