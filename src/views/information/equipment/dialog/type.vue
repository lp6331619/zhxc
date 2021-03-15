<template>
    <div>
        <el-dialog
            :title="title"
            width="30%"
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
                                placeholder="请输入名称"
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
                                @click="edit(scope.row)"
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
                >完 成</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getPartitionTypes, editPartitionType, getGatewayNames, editGatewayName, getDevNames, editDevName, delDeviceConfig } from '@/api/information'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        // 场景
        scene: {
            type: String,
            default: '' // dev_name 设备  partition_type区名称  gateway_name组名称
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            loading: false,
            title: '',
            list: [],
            disabled: false,
            btnLoading: false
        }
    },
    mounted() {
        this.setStatusStatus = this.status
        console.log(this.scene, 444)
        switch (this.scene) {
            case 'dev_name':
                this.title = '编辑设备'
                break
            case 'partition_type':
                this.title = '编辑区名称'
                break
            case 'gateway_name':
                this.title = '编辑组名称'
                break
        }
        this.getDetail()
    },
    methods: {
        async getDetail() {
            let res = {}
            switch (this.scene) {
                case 'dev_name':
                    res = await getDevNames({})
                    if (res.code === 1) {
                        this.list = res.data.list.filter(item => {
                            item.name = item.dev_name
                            return item
                        })
                        this.list.push({ name: '' })
                    }
                    break
                case 'partition_type':
                    res = await getPartitionTypes({})
                    if (res.code === 1) {
                        this.list = res.data.list.filter(item => {
                            item.name = item.partition_type
                            return item
                        })
                        this.list.push({ name: '' })
                    }
                    break
                case 'gateway_name':
                    res = await getGatewayNames({})
                    if (res.code === 1) {
                        this.list = res.data.list.filter(item => {
                            item.name = item.gateway_name
                            return item
                        })
                        this.list.push({ name: '' })
                    }
                    break
            }
        },
        // 编辑
        async edit(row) {
            let res = {}
            let params = {}
            switch (this.scene) {
                case 'dev_name':
                    params = { id: row.id || null, dev_name: row.name }
                    res = await editDevName(params)
                    break
                case 'partition_type':
                    params = { id: row.id || null, partition_type: row.name }
                    res = await editPartitionType(params)
                    break
                case 'gateway_name':
                    params = { id: row.id || null, gateway_name: row.name }
                    res = await editGatewayName(params)
                    break
            }
            this.callback(res)
        },
        async del(id) {
            const res = await delDeviceConfig({ id: id })
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
