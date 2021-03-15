<template>
    <div v-if="prepareData && searchData ">
        <div class="searchBox">
            <div
                ref="searchData"
                class="searchData"
            >
                <template v-for="(item,index) in searchListData">
                    <!--Cascader 级联选择器-->
                    <template v-if="item.mode==='Cascader'">
                        <div
                            :key="index"
                            class="mr20 mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <Cascader
                                :search-type="item.type"
                                :prepare-type="item.prepareType"
                                :init-data="searchData[item.type]"
                                :search-name="item.typeName"
                                :prepare-data="prepareData"
                                :props-box="item.propsBox"
                                :disabled="item.disabled"
                                @emitData="emitData($event)"
                            />
                        </div>
                    </template>
                    <!--selectInput 类型-->
                    <template v-if="item.mode==='SearchInput'">
                        <div
                            :key="index"
                            class="searchInput mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <SearchInput
                                :search-type="item.type"
                                :init-data="searchData[item.type]"
                                :search-name="item.typeName"
                                :prepare-data="prepareData"
                                :disabled="item.disabled"
                                @emitData="emitData($event)"
                            />
                        </div>
                    </template>
                    <!--select 类型-->
                    <template v-if="item.mode==='SearchSelect'">
                        <div
                            :key="index"
                            class="mr20 mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <SearchSelect
                                :search-type="item.type"
                                :prepare-type="item.prepareType"
                                :init-data="searchData[item.type]"
                                :search-name="item.typeName"
                                :filterable="item.selectType"
                                :prepare-data="prepareData"
                                :disabled="item.disabled"
                                :obj="item.obj"
                                :linkage="item.linkage"
                                :relation="searchData[item.relation]"
                                @emitData="emitData($event)"
                            />
                        </div>
                    </template>
                    <!--时间段 类型-->
                    <template v-if="item.mode==='SearchTime'">
                        <div
                            :key="index"
                            class="mr20 mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <SearchTime
                                :search-type="item.type"
                                :init-data="searchData[item.type]"
                                :search-name="item.typeName"
                                :disabled="item.disabled"
                                @emitData="emitData($event)"
                                :format="item.format"
                                :date-type="item.dateType"
                            />
                        </div>
                    </template>
                    <!--值段 类型-->
                    <template v-if="item.mode==='SearchRank'">
                        <div
                            :key="index"
                            class="mr20 mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <SearchRank
                                :search-type="item.type"
                                :init-data="searchData[item.type]"
                                :search-name="item.typeName"
                                :disabled="item.disabled"
                                @emitData="emitData($event)"
                            />
                        </div>
                    </template>
                    <!-- input类型 -->
                    <template v-if="item.mode==='Input'">
                        <div
                            :key="index"
                            class="mr20 mb10"
                            :style="`width:${item.width || ''}`"
                        >
                            <el-input
                                v-model="searchData[item.type]"
                                :disabled="item.disabled"
                                :placeholder="item.typeName"
                                @keyup.enter.native="outData()"
                            />
                        </div>
                    </template>
                </template>
                <el-button
                    type="primary"
                    @click="outData()"
                >查询</el-button>
                <el-button @click="clear()">清空</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import SearchInput from '@/components/SearchBox/SearchInput'
import SearchSelect from '@/components/SearchBox/SearchSelect'
import SearchTime from '@/components/SearchBox/SearchTime'
import SearchRank from '@/components/SearchBox/SearchRank'
import Cascader from '@/components/SearchBox/Cascader'
export default {
    name: 'SearchList',
    components: {
        SearchInput,
        SearchSelect,
        SearchTime,
        SearchRank,
        Cascader
    },
    props: {
        // options 数据
        options: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // prepare 数据
        prepareData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 搜索列表数据  组件根据此数据渲染
        searchData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 搜索列表名字
        searchListData: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 其余的数据
        otherData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 导出 excel
        exportExcel: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            height: '',
            heightBool: false,
            maxHeight: null
        }
    },
    computed: {},
    mounted() {
        this.maxHeight = this.$refs.searchData.offsetHeight
    },
    methods: {
        emitData(e) {
            this.searchData[e.type] = e.data
            e.linkage && e.linkage.is && this.$emit('linkageData', { [e.type]: e.data, next: e.linkage.link_next })
        },
        // 更多
        more() {
            this.heightBool = !this.heightBool
            this.height = this.heightBool ? this.maxHeight : 40
        },
        // 导出数据
        outData() {
            const data = {
                searchData: this.searchData,
                otherData: this.otherData
            }
            this.$emit('emitData', data)
        },
        // 清空
        clear() {
            if (this.searchData) {
                for (const i in this.searchData) {
                    const type = typeof this.searchData[i]
                    this.searchData[i] =
                        type === 'object'
                            ? this.objectBack(this.searchData[i])
                            : ''
                }
            }
            if (this.otherData) {
                for (const i in this.otherData) {
                    const type = typeof this.otherData[i]
                    if (type === 'object') {
                        this.otherData[i] = this.objectBack(this.otherData[i])
                    } else if (i === 'page') {
                        this.otherData[i] = 1
                    } else if (i === 'limit') {
                        this.otherData[i] = 10
                    } else {
                        this.otherData[i] = ''
                    }
                }
            }
            const data = {
                searchData: this.searchData,
                otherData: this.otherData
            }
            data.clear = true
            this.$emit('emitData', data)
        },
        // 清空 object
        objectBack(data) {
            if (data) {
                for (const i in data) {
                    i !== 'strict' ? (data[i] = '') : (data[i] = '0')
                }
                return data
            }
        },
        // 导出 excel
        excelOut(url) {
            const object = Object.assign(this.searchData, this.otherData)
            this.upExcel(url + '?_csv=1', object)
        },
        upExcel(URL, PARAMS) {
            var temp = document.createElement('form')
            temp.action = process.env.VUE_APP_BASE_API + URL
            temp.method = 'post'
            temp.enctype = 'application/json'
            temp.style.display = 'none'
            for (var x in PARAMS) {
                var opt
                if (this.IsJsonString(JSON.stringify(PARAMS[x]))) {
                    for (const a in PARAMS[x]) {
                        const chenOpt = document.createElement('textarea')
                        chenOpt.name = x + '[' + a + ']'
                        chenOpt.value = PARAMS[x][a]
                        temp.appendChild(chenOpt)
                    }
                } else {
                    opt = document.createElement('textarea')
                    opt.name = x
                    opt.value = PARAMS[x]
                    temp.appendChild(opt)
                }
            }
            document.body.appendChild(temp)
            temp.submit()
            return temp
        },
        IsJsonString(str) {
            try {
                if (typeof JSON.parse(str) === 'object') {
                    return true
                }
            } catch (e) {
                console.log(1)
            }
            return false
        }
    }
}
</script>

<style scoped lang="scss">
.searchBox {
    position: relative;
    // height: 40px;
    padding-right: 50px;
    overflow: hidden;
    transition: height 0.3s;
    -webkit-transition: height 0.3s;
    .moreBtn {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 14px;
        color: #409eff;
        padding-right: 10px;
        cursor: pointer;
        &:before {
            content: '';
            position: absolute;
            right: 2px;
            top: 3px;
            display: block;
            width: 5px;
            height: 5px;
            border: 1px solid #409eff;
            border-width: 0 1px 1px 0;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        &.action:before {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            top: 7px;
        }
    }
    .searchData {
        display: flex;
        flex-wrap: wrap;
        .searchInput {
            width: 280px;
            margin-right: 20px;
        }
    }
}
.flexBox {
    display: flex;
    justify-content: flex-start;
    .searchBox {
        padding-right: 0;
    }
}
.ping {
    margin-top: 0 !important;
}
</style>
