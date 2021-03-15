<template>
    <div>
        <el-dialog
            title="管理乡村站点"
            width="40%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div
                v-if="total"
                class="center"
            >
                <el-transfer
                    v-model="equipment_ids"
                    class="transferBox"
                    filterable
                    :data="total"
                    :titles="['可选乡村站点', '已选乡村站点']"
                    :props="{
                        key: 'id',
                        label: 'name'
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
import { inspectionSaveEquipmentt, inspectionEditEquipment } from '@/api/onsite'
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
            title: '创建站点',
            loading: false,
            total: [],
            disabled: false,
            equipment_ids: [],
            btnLoading: false
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
            const res = await inspectionEditEquipment({ id: this.id })
            if (res.code === 1) {
                for (const i in res.data.total_equipments) {
                    this.total.push(res.data.total_equipments[i])
                }
                this.$nextTick(() => {
                    res.data.selected_equipments.forEach(item => {
                        this.equipment_ids.push(item.id)
                    })
                })
            }
        },
        // 编辑
        async editDetailBox() {
            if (this.equipment_ids.length === 0) {
                this.$message.error('最少选择一个!')
                return false
            }
            this.btnLoading = true
            const params = {
                id: this.id,
                equipment_ids: this.equipment_ids
            }
            inspectionSaveEquipmentt(params).then((res) => {
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
            this.$emit('emitOut', 'diologTask', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'diologTask', this.setStatusStatus, true)
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
