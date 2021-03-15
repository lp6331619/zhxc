<template>
    <div>
        <el-dialog
            title="管理任务"
            width="30%"
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div class="center">
                <el-transfer
                    v-model="form.task_ids"
                    :props="{
                        key: 'id',
                        label: 'name'
                    }"
                    :data="total"
                >
                </el-transfer>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >

                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="editDetailBox()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { equipmentAddTask, equipmentGetTasks } from '@/api/onsite'
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
            prepare: undefined,
            disabled: false,
            data: [],
            form: { task_ids: [] },
            total: []
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.form.equipment_id = this.id
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const res = await equipmentGetTasks({ equipment_id: this.id })
            if (res.code === 1) {
                res.data.select_tasks.forEach(item => {
                    this.form.task_ids.push(
                        item.id
                    )
                })
                this.total = res.data.total_tasks
            }
        },
        // 编辑
        editDetailBox() {
            console.log(2222)
            if (this.form.task_ids.length) {
                equipmentAddTask(this.form).then((res) => {
                    this.callback(res)
                })
            } else {
                this.$message.error('最少选择一个!')
            }
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
.map {
    width: 100%;
    height: 200px;
    margin-top: 20px;
}
</style>
