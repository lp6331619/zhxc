<template>
    <div v-if="prepareData">
        <div
            class="selectBox"
            trigger="click"
            placement="bottom-start"
        >
            <el-select
                v-model="searchData.field"
                class="selectBox"
                placeholder="请选择"
                @change="selectData"
            >
                <el-option
                    v-for="(name,key,index) in getPrepare()"
                    :key="index"
                    :label="name"
                    :value="key"
                />
            </el-select>
            <el-autocomplete
                v-model="searchData.search"
                class="inputBox"
                value-key="name"
                placeholder="请输入内容"
                :fetch-suggestions="querySearch"
                :debounce="300"
                :disabled="disabled"
                @select="handleSelect"
            ></el-autocomplete>
            <!-- <i
                class="el-icon-search searchBtn"
                @click="outData"
            ></i> -->
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
        initData: {
            type: Object,
            default: () => {
                return {}
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
        searchInfo: {
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
            searchData: {
                field: 'equipment',
                search: ''
            }, // 搜索的数据
            prepareBox: {} // prepareBox数据
        }
    },
    computed: {
        // 获取 placeholder
    },
    // watch: {
    //     initData: {
    //         handler(newValue, oldValue) {
    //             this.searchData = newValue
    //         },
    //         deep: true
    //     }
    // },
    beforeUpdate() {
        // this.searchData = this.initData
    },
    methods: {
        // 选择搜索类型
        selectData(data) {
            this.searchData.field = data
            this.searchData.search = ''
        },
        // 获取 prepare
        getPrepare() {
            if (this.prepareData && this.searchType) {
                return this.prepareData[this.searchType]
            } else {
                return {}
            }
        },
        handleSelect(e) {
            this.outData(e)
        },
        querySearch(queryString, cb) {
            var restaurants = this.searchInfo[this.searchData.field + '_list']
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        // 导出数据
        outData(e) {
            const b = Object.assign({}, e, { fieldType: this.searchData.field })
            this.$emit('emitData', b)
        }
    }
}
</script>

<style scoped lang="scss">
.selectBox {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    background: #151928;
    border-radius: 5px;
    .inputBox {
        width: 230px;
    }
    .selectBox {
        width: 120px;
        border-right: 1px solid #191d22;
    }
    .searchBtn {
        padding: 0 10px;
        cursor: pointer;
        color: #bbb;
        &:hover {
            opacity: 0.8;
        }
    }
}
</style>
