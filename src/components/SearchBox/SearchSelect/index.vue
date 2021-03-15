<template>
    <div v-if="prepareData && searchType">
        <div class="selectBox">
            <el-select
                v-model="searchData"
                :filterable="filterable"
                :placeholder="searchName"
                :disabled="disabled"
                @change="selectData"
            >
                <template v-if="obj.length">
                    <el-option
                        v-for="(item,i) in getPrepare()"
                        :key="i"
                        :label="item[obj[1]]"
                        :value="String(item[obj[0]])"
                    />
                </template>
                <template v-else>
                    <el-option
                        v-for="(item,i) in getPrepare()"
                        :key="i"
                        :label="item.name"
                        :value="String(item.id)"
                    />
                </template>
            </el-select>
        </div>
    </div>
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
            type: String,
            default: ''
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
        // 修改默认读取字段
        obj: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 搜索类型
        filterable: {
            type: Boolean,
            default: false
        },
        // 是否disabled
        disabled: {
            type: Boolean,
            default: false
        },
        // 关联
        relation: {
            type: String,
            default: 'undefined'
        },// 联动
        linkage: {
            type: Object,
            default: () => {
                return {
                    is: false, // 是否联动
                    link_next: '' // 联动下一步执行的函数名称
                }
            }
        }
    },
    data() {
        return {
            searchData: '', // 搜索的数据
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
    computed: {

    },
    created() {
        this.searchData = this.initData
    },
    beforeUpdate() {
        this.searchData = this.initData
    },
    methods: {
        // 选择搜索类型
        selectData(data) {
            data === 'all' || data === '全部' ? (this.searchData = '') : ''
            this.outData()
        },
        // 获取 prepare
        getPrepare() {
            if (
                this.prepareData &&
                this.prepareData[this.prepareType || this.searchType] &&
                (this.searchType || this.prepareType)
            ) {
                let box = []
                const array = this.prepareF()
                // 判断是否是数组
                if (Array.isArray(array)) {
                    box = array
                } else {
                    for (const i in array) {
                        box.push({ id: i, name: array[i] })
                    }
                }
                if (this.obj.length) {
                    box.unshift({ [this.obj[0]]: 'all', [this.obj[1]]: '全部' })
                } else {
                    box.unshift({ id: 'all', name: '全部' })
                }
                return box
            } else {
                return {}
            }
        },
        prepareF() {
            let box
            if (this.relation === 'undefined') {
                box = this.prepareData[
                    this.prepareType || this.searchType
                ]
            } else {
                box = this.relation
                    ? this.prepareData[this.prepareType || this.searchType][this.relation]
                    : {}
            }
            return box ? JSON.parse(JSON.stringify(box)) : {}
        },
        // 导出数据
        outData() {
            this.$emit('emitData', {
                data: this.searchData,
                type: this.searchType,
                linkage: this.linkage
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>
