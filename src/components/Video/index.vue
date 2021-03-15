<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-09 10:40:57
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-28 10:44:33
-->
<template>
    <div class="box">
        <iframe
            :src="url"
            frameborder="0"
        ></iframe>
        <div class="btnBox">
            <div
                v-if="tab===1"
                class="btnBoxbtn"
            >
                <div class="title">
                    <span class="t"> 站点列表</span>
                    <el-button
                        v-if="data && data.formData"
                        icon="el-icon-setting"
                        size="mini"
                        @click="tab=2"
                    >主要按钮</el-button>
                </div>
                <el-collapse
                    v-model="activeNames"
                    accordion
                    @change="handleChange"
                >
                    <el-collapse-item
                        v-for="(item,i) in list"
                        :title="item.name"
                        :name="i"
                        :key="i"
                    >
                        <div
                            v-for="(child,c) in item.videos"
                            :key="c"
                            class="item"
                            :class="active === child.id?'active':''"
                            @click="open(child)"
                        >
                            {{ c+1 }}.
                            <span>
                                {{ child.name }}
                            </span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div
                v-else
                class="btnBoxbtn"
            >
                <div class="title">
                    <span class="t"> 操作列表</span>
                    <el-button
                        size="mini"
                        @click="tab=1"
                    >站点列表</el-button>
                </div>
                <div class="btnArray">
                    <el-button
                        v-for="(item,i) in button.write_btn_list"
                        :key="i"
                        @click="subFun(item.var_value,item.id)"
                    >{{ item.var_alias }}</el-button>
                </div>
                <div
                    v-if="button.write_text_list.length"
                    class="searchBox"
                >

                    <el-select
                        v-if="button.write_text_list.length"
                        v-model="var_id"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in button.write_text_list"
                            :key="item.id"
                            :label="item.var_alias"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>

                    <el-input
                        v-model="control_value"
                        placeholder="请输入内容"
                    ></el-input>

                    <el-button
                        type="primary"
                        @click="subFun(control_value,var_id)"
                    >确定发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// lazyAMapApiLoaderInstance
import AMap from 'AMap'
import { getPointList } from '@/api/index'
import SearchInput from '@/components/SearchBox/SearchXz'
export default {
    name: 'Map',
    components: {
        SearchInput
    },
    props: {
        centent: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            data: undefined,
            loading: false,
            url: 'https://open.ys7.com/ezopen/h5/iframe_se',
            button: [],
            tab: 1,
            activeNames: 0,
            active: null,
            control_value: ''
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        /**
        * @name: 切换视频
        * @param {*} e
        * @return {*}
        */
        async open(e) {
            this.active = e.id
            const res = await VideoDetail({ id: e.id })
            if (res.code === 1) {
                res.data
                this.url = `https://open.ys7.com/ezopen/h5/iframe_se?url=${res.data.url}&autoplay=0&audio=1&accessToken=${res.data.url_param_arr.accessToken}&templete=2`
            }
        },
        /**
         * @name: 操作
         * @param {*}
         * @return {*}
         */
        async subFun(control_value, var_id) {
            const res = await addControl({ id: this.id, control_value: control_value, var_id: var_id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
            } else if (res.code === 100) {
                this.$prompt('请输入操作密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '密码格式不正确'
                }).then(({ value }) => {
                    checkPass({ password: value, device_id: this.id }).then(res => {
                        if (res.code === 1) {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            })
                            this.subFun(control_value, var_id)
                        }
                    })
                }).catch(() => {
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    margin-top: 20px;
    height: calc(100% - 106px);
    padding: 0 374px 0 20px;
    .btnBox {
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        width: 354px;
        padding: 25px 38px;
        background: #2d303b;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            button {
                color: #bbb;
                border: none;
                background: #3e404b;
            }
            .t {
                display: flex;
                align-items: center;
                &:before {
                    content: '';
                    width: 5px;
                    height: 20px;
                    margin-right: 10px;
                    border-radius: 40px;
                    background: #218bf3;
                }
            }
        }
    }
    iframe {
        width: 100%;
        height: 100%;
    }
}
.btnBoxbtn {
    .item {
        display: flex;
        padding: 0 20px;
        cursor: pointer;
        span {
            margin-left: 20px;
        }
        opacity: 0.5;
        &.active,
        &:hover {
            opacity: 1;
        }
    }
}
.btnArray {
    padding: 10px 0;
    button {
        margin: 10px 0 0 0;
        color: #bbb;
        border: none;
        background: #3e404b;
        width: 100%;
        &:hover {
            opacity: 0.7;
        }
    }
}
.searchBox {
    .el-select,
    .el-input,
    .el-button {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
