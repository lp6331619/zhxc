<template>
    <div>
        <el-dialog
            title="巡检结果"
            width="70%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div v-if="list">
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="list.list"
                >

                    <el-table-column
                        prop="user.nick"
                        label="巡检人"
                    ></el-table-column>
                    <el-table-column
                        prop="url"
                        label="巡检项目"
                    >
                        <template slot-scope="scope">
                            <img
                                v-if="scope.row.url"
                                :src="scope.row.url"
                                class="maxImg"
                                alt=""
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ctime"
                        label="巡检时间"
                    >
                    </el-table-column>
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
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="btnLoading"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { inspectionPictureList } from '@/api/onsite'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            loading: false,
            list: [],
            disabled: false,
            searchForm: {
            },
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            },
            btnLoading: false
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getList()
    },
    methods: {
        async getList() {
            const parse = Object.assign({}, this.searchForm, this.otherData, { plan_list_id: this.id })
            const res = await inspectionPictureList(parse)
            if (res.code === 1) {
                this.list = res.data
            }
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
        emitOut() {
            this.$emit('emitOut', 'diologPic', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologPic', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    justify-content: center;
}
</style>
