<template>
    <div>
        <el-dialog
            title="管理负责人"
            width="40%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div
                v-if="users"
                class="center"
            >
                <el-transfer
                    v-model="user_ids"
                    :data="users"
                    class="transferBox"
                    filterable
                    :titles="['可选负责人', '已选负责人']"
                    :props="{
                        key: 'id',
                        label: 'nick'
                    }"
                ></el-transfer>
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
import { inspectionSaveInspectors, inspectionEditUsers } from '@/api/onsite'
import { getUsers } from '@/api/system'
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
            user_ids: [],
            disabled: false,
            btnLoading: false,
            users: []
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const res = await inspectionEditUsers({ id: this.id })
            if (res.code === 1) {
                for (const i in res.data.selected_users) {
                    this.user_ids.push(res.data.selected_users[i].id)
                }
            }
            const res2 = await getUsers({})
            if (res2.code === 1) {
                this.users = res2.data.users
                console.log(res2, 333)
            }
        },
        // 编辑
        async editDetailBox() {
            if (this.user_ids.length === 0) {
                this.$message.error('最少选择一个!')
                return false
            }
            this.btnLoading = true
            const params = {
                id: this.id,
                user_ids: this.user_ids
            }
            inspectionSaveInspectors(params).then((res) => {
                this.callback(res)
                this.btnLoading = false
            })
        },
        // 成功后
        callback(res) {
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.setStatusStatus = false
                this.emitOut()
            }
        },
        emitOut() {
            this.$emit('emitOut', 'diologPerson', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologPerson', this.setStatusStatus, true)
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
