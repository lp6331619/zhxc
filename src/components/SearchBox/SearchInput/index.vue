<template>
    <div v-if="prepareData">
        <el-dropdown
            class="selectBox"
            trigger="click"
            placement="bottom-start"
            @command="selectData"
        >
            <el-input
                v-model="searchData.search"
                class="el-dropdown-link"
                :placeholder="getPlaceholder"
                :disabled="disabled"
                type="text"
                @blur="outData()"
                @keyup.enter.native="outData()"
            />
            <span
                class="strict"
                @click="changeStrict()"
            >{{ searchData.strict==='0'?'模糊' :'精确' }}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="(name,key,index) in getPrepare()"
                    :key="index"
                    :command="key"
                >{{ name }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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
        // 是否disabled
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchData: {
                field: '',
                search: '',
                strict: '0'
            }, // 搜索的数据
            prepareBox: {} // prepareBox数据
        }
    },
    computed: {
        // 获取 placeholder
        getPlaceholder() {
            let str = ''
            if (this.prepareData && this.searchName) {
                if (!this.searchData.field || this.searchData.field === '') {
                    let lastkey
                    for (const keyname in this.prepareData[this.searchType]) {
                        lastkey = keyname
                    }
                    for (const x in this.prepareData[this.searchType]) {
                        if (x !== lastkey) {
                            str += this.prepareData[this.searchType][x] + '/'
                        } else {
                            str += this.prepareData[this.searchType][x]
                        }
                    }
                } else {
                    str += this.prepareData[this.searchType][
                        this.searchData.field
                    ]
                }
            }
            return this.searchName + ':' + str
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
    beforeUpdate() {
        this.searchData = this.initData
    },
    methods: {
        // 选择搜索类型
        selectData(data) {
            this.searchData.field = data === 'all' ? '' : data
            this.outData()
        },
        // 获取 prepare
        getPrepare() {
            if (this.prepareData && this.searchType) {
                const box = Object.assign(
                    {
                        all: '全部'
                    },
                    this.prepareData[this.searchType]
                )
                return box
            } else {
                return {}
            }
        },
        // 搜索形式
        changeStrict() {
            this.searchData.strict = this.searchData.strict === '0' ? '1' : '0'
            this.outData()
        },
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

<style scoped lang="scss">
.selectBox {
    position: relative;
    width: 100%;
    .strict {
        position: absolute;
        right: 2px;
        top: 10px;
        height: 20px;
        line-height: 20px;
        border-left: 1px solid #eee;
        padding: 0 10px;
        background: #fff;
        color: #2196f3;
        font-size: 12px;
        cursor: pointer;
    }
    .prepareData {
        position: absolute;
        left: 0;
        top: 30px;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        li {
            padding: 0 20px;
            line-height: 35px;
            background: #fff;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                background: #f6f6f6;
            }
        }
    }
}
</style>
