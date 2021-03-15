<template>
    <div v-if="initData && searchType">
        <div class="rankBox">
            <!-- eslint-disable-next-line-->
            <input
                v-model="searchData.start"
                :disabled="disabled"
                :keyup="outData()"
                :placeholder="searchName"
                type="number"
            />
            <span>至</span>
            <!-- eslint-disable-next-line-->
            <input
                v-model="searchData.end"
                :keyup="outData()"
                :disabled="disabled"
                :placeholder="searchName"
                type="number"
            />
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
        // 是否disabled
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 搜索的数据
            searchData: {
                start: '',
                end: ''
            }
        }
    },
    mounted() {
        this.searchData = this.initData
    },
    methods: {
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
.rankBox {
    display: flex;
    width: 250px;
    line-height: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    span,
    input {
        height: 100%;
        margin: 0;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        background: #292b35;
    }
    span {
        padding: 0 5px;
        line-height: 40px;
        width: 10%;
        color: #606266;
    }
    input {
        border: none;
        outline: 0;
        padding: 0;
        width: 45%;
        color: #606266;
    }
    input::-webkit-input-placeholder {
        color: #cbcbcb;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #cbcbcb;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #cbcbcb;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #cbcbcb;
    }
}
</style>
