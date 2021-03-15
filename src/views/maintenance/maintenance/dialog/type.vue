<template>
    <div>
        <el-dialog
            title="管理事件类型"
            width="40%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div>
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="list"
                >
                    <el-table-column
                        prop="name"
                        label="名称"
                    >
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.name"
                                placeholder="请输入项目编码"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="option"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.$index===list.length-1"
                                size="mini"
                                type="primary"
                                plain
                                :loading="btnLoading"
                                :disabled="!scope.row.name"
                                @click="add(scope.row.name)"
                            >添加</el-button>
                            <template v-else>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    plain
                                    :loading="btnLoading"
                                    @click="edit(scope.row)"
                                >修改</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    plain
                                    :loading="btnLoading"
                                    @click="del(scope.row.id)"
                                >删除</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="handleClose"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { typeList, addType, editType, delType } from '@/api/onsite'
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
            btnLoading: false
        }
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const res = await typeList({})
            if (res.code === 1) {
                this.list = res.data.list
                this.list.push({ name: '' })
            }
        },
        // 编辑
        async edit(row) {
            const res = await editType({ id: row.id, name: row.name })
            this.callback(res)
        },
        async add(name) {
            const res = await addType({ name: name })
            this.callback(res)
        },
        async del(id) {
            const res = await delType({ id: id })
            this.callback(res)
        },
        // 成功后
        callback(res) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getDetail()
            }
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'innerVisible', this.setStatusStatus)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
