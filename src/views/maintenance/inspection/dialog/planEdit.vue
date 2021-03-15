<template>
    <div>
        <el-dialog
            :title="title"
            width="40%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <div class="stepBox">
                <el-steps
                    :space="200"
                    :active="step"
                    finish-status="success"
                    align-center
                >
                    <el-step title="计划信息"></el-step>
                    <el-step title="巡查项目"></el-step>
                </el-steps>
            </div>
            <el-form
                v-if="step===1"
                ref="setDetail"
                v-loading="loading"
                class="formBox"
                :model="form"
                :rules="formRules"
                auto-complete="on"
                label-position="right"
                label-width="120px"
            >
                <el-form-item
                    label="计划名称:"
                    prop="name"
                >
                    <el-input
                        v-model="form.name"
                        placeholder="请输入计划名称"
                        :disabled="disabled"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="所属任务:"
                    prop="task_id"
                >
                    <el-select
                        v-model="form.task_id"
                        class="w100"
                    >
                        <el-option
                            v-for="(item) in prepare.task"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="执行频率:"
                    prop="frequency"
                >
                    <el-select
                        v-model="form.frequency"
                        class="w100"
                    >
                        <el-option
                            v-for="(item) in prepare.frequency"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始时间:">
                    <el-row
                        class="starTime"
                        :gutter="20"
                    >
                        <el-col :span="5">
                            <el-form-item
                                v-if="form.frequency<=1"
                                prop="begin_month"
                            >
                                <el-select v-model="form.begin_month">
                                    <el-option
                                        v-for="(item) in prepare.month"
                                        :key="item"
                                        :label="item+'月'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                v-if="form.frequency<=2"
                                prop="begin_day"
                            >
                                <el-select v-model="form.begin_day">
                                    <el-option
                                        v-for="(item) in prepare.day"
                                        :key="item"
                                        :label="item+'日'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                v-if="form.frequency===3"
                                prop="begin_week"
                            >
                                <el-select v-model="form.begin_week">
                                    <el-option
                                        v-for="(item) in prepare.week"
                                        :key="item"
                                        :label="'周'+item"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="begin_hour">
                                <el-select v-model="form.begin_hour">
                                    <el-option
                                        v-for="(item) in prepare.hour"
                                        :key="item"
                                        :label="item+'时'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="begin_min">
                                <el-select v-model="form.begin_min">
                                    <el-option
                                        v-for="(item) in prepare.min"
                                        :key="item"
                                        :label="item+'分'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="终止时间:">
                    <el-row
                        class="starTime"
                        :gutter="20"
                    >
                        <el-col :span="5">

                            <el-form-item
                                v-if="form.frequency<=1"
                                prop="end_month"
                                label-width="0"
                            >
                                <el-select v-model="form.end_month">
                                    <el-option
                                        v-for="(item) in prepare.month"
                                        :key="item"
                                        :label="item+'月'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                v-if="form.frequency<=2"
                                prop="end_day"
                                label-width="0"
                            >
                                <el-select v-model="form.end_day">
                                    <el-option
                                        v-for="(item) in prepare.day"
                                        :key="item"
                                        :label="item+'日'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                v-if="form.frequency===3"
                                prop="end_week"
                                label-width="0"
                            >
                                <el-select v-model="form.end_week">
                                    <el-option
                                        v-for="(item) in prepare.week"
                                        :key="item"
                                        :label="'周'+item"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                prop="end_hour"
                                label-width="0"
                            >
                                <el-select v-model="form.end_hour">
                                    <el-option
                                        v-for="(item) in prepare.hour"
                                        :key="item"
                                        :label="item+'时'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                prop="end_min"
                                label-width="0"
                            >
                                <el-select v-model="form.end_min">
                                    <el-option
                                        v-for="(item) in prepare.min"
                                        :key="item"
                                        :label="item+'分'"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    v-if="scene==='create'"
                    label="保存类型:"
                >
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">保存</el-radio>
                        <el-radio :label="2">保存并立即生效</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div
                v-else
                class="stepBox"
            >

                <el-transfer
                    filterable
                    v-model="form.item_ids"
                    :props="{
                        key: 'id',
                        label: 'code_name'
                    }"
                    :data="prepare.list"
                >
                </el-transfer>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    v-if="step===2"
                    type="primary"
                    @click="step=1"
                >上一步</el-button>
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="editDetailBox()"
                >{{ step===1?'下一步':'确定' }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { equipmentEditPlan, equipmentAddPlan, equipmentGetEquipmentPlan, equipmentGetTasks, inspectionItems } from '@/api/onsite'
export default {
    name: 'EditUpdate',
    props: {
        status: {
            type: Boolean,
            default: false
        },
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        id: {
            type: Number,
            default: null
        },
        equipment: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            sub: '下一步',
            title: '创建计划',
            step: 1,
            form: {
                equipment_id: null,
                item_ids: [],
                name: '',
                task_id: null,
                frequency: '',
                begin_month: '',
                begin_week: '',
                begin_day: '',
                begin_hour: '',
                begin_min: '',
                end_month: '',
                end_week: '',
                end_day: '',
                end_hour: '',
                end_min: '',
                type: 1
            },
            formRules: {
                name: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                task_id: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                frequency: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                begin_month: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                begin_week: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], begin_day: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], begin_hour: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], begin_min: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], end_month: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                end_week: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], end_day: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], end_hour: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ], end_min: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {
                month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                day: [],
                hour: [],
                min: [],
                week: [1, 2, 3, 4, 5, 6, 7],
                task: [],
                frequency: [{
                    id: 1,
                    value: '每年'
                }, {
                    id: 2,
                    value: '每月'
                }, {
                    id: 3,
                    value: '每周'
                }, {
                    id: 4,
                    value: '每日'
                }],
                list: []
            },
            disabled: false
        }
    },
    computed: {
    },
    mounted() {
        this.setStatusStatus = this.status
        this.form.equipment_id = this.equipment
        for (let i = 1; i <= 31; i++) {
            this.prepare.day.push(i)
        }
        for (let i = 0; i < 24; i++) {
            this.prepare.hour.push(i)
        }
        for (let i = 0; i <= 59; i++) {
            this.prepare.min.push(i)
        }
        this.getPrepare()
        switch (this.scene) {
            case 'create':
                this.title = '创建计划'
                break

            case 'update':
                this.title = '编辑计划'
                this.getDetail()
                break

            case 'detail':
                this.disabled = true
                this.title = '计划详情'
                this.getDetail()
                break
        }
    },
    methods: {
        async getPrepare() {
          const res = await equipmentGetTasks({ equipment_id: this.form.equipment_id })
          if (res.code === 1) {
              this.prepare.task = res.data.select_tasks
          }
            /* const res = await inspectionTaskList({})
            if (res.code === 1) {
                this.prepare.task = res.data.data
            } */
            const res2 = await inspectionItems({})
            if (res2.code === 1) {
                this.prepare.list = res2.data.data
            }
        },
        async getDetail() {
            const res = await equipmentGetEquipmentPlan({ id: this.id })
            if (res.code === 1) {
                this.form = res.data.info
                this.form.type = 1
                delete this.form.ctime
                delete this.form.mtime
                delete this.form.dtime
                this.$set(this.form, 'item_ids', [])
                if (this.form.items) {
                    this.form.items.forEach(item => {
                        this.form.item_ids.push(item.id)
                    })
                }
                this.prepare.list = res.data.total_items || []
            }
        },
        // 编辑
        editDetailBox() {
            if (this.step === 1) {
                this.$refs.setDetail.validate(valid => {
                    if (valid) {
                        this.step = 2
                    }
                })
            } else {
                if (this.form.item_ids.length) {
                    this.subBox()
                } else {
                    this.$message.error('必须选择一个项目!')
                }
            }
        },
        subBox() {
            switch (this.scene) {
                case 'create':
                    equipmentAddPlan(this.form).then((res) => {
                        this.callback(res)
                    })
                    break
                case 'update':
                    equipmentEditPlan(this.form).then((res) => {
                        this.callback(res)
                    })
                    break
                default:
                    this.handleClose()
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
            this.$emit('emitOut', 'innerVisible', this.setStatusStatus)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', 'innerVisible', this.setStatusStatus, true)
        }
    }
}
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
    .el-select {
        margin-left: 15px;
    }
    .st {
        text-align: right;
        padding-right: 10px;
        width: 100px !important;
        font-weight: bold;
        line-height: 40px;
        color: #fff;
    }
}
.stepBox {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    .el-steps {
        width: 50%;
    }
}
</style>
