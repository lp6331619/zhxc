<template>
    <div>
        <el-dialog
            :title="title"
            width="40%"
            append-to-body
            :visible.sync="setStatusStatus "
            :before-close="handleClose"
        >
            <el-form
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
                    label="3D绑定对象:"
                    prop="mesh"
                >
                    <el-select
                        v-model="form.mesh"
                        filterable
                        placeholder="请选择3d图物体绑定对象"
                    >
                        <el-option
                            v-for="item in mesh"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleClose">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addSub"
                >添加设备监控点</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { gatewaySelect, instrumentSelect, varlistSelect } from '@/api/information'
// import { getEquipmentGetDefaultPoint } from '@/api/site'
export default {
    name: 'EditUpdate',
    props: {
        scene: {
            type: String,
            default: 'create' // create update detail
        },
        status: {
            type: Boolean,
            default: false
        },
        siteid: {
            type: Number,
            default: null
        },
        mesh: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            // 修改密码表单
            setStatusStatus: false,
            title: '添加设备监控点',
            form: {
                // var_name: '',
                // site_id: '',
                // group_name: '',
                // dev_name: '',
                mesh: ''
            },
            formRules: {
                // var_name: [
                //     {
                //         required: true,
                //         trigger: 'change',
                //         message: '不能为空!'
                //     }
                // ],
                // site_id: [
                //     {
                //         required: true,
                //         trigger: 'change',
                //         message: '不能为空!'
                //     }
                // ],
                // group_name: [
                //     {
                //         required: true,
                //         trigger: 'change',
                //         message: '不能为空!'
                //     }
                // ],
                // dev_name: [
                //     {
                //         required: true,
                //         trigger: 'change',
                //         message: '不能为空!'
                //     }
                // ],
                mesh: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            loading: false,
            prepare: {},
            disabled: false
        }
    },
    computed: {
    },
    mounted() {
        this.form.site_id = this.siteid
        this.getPrepare()
        switch (this.scene) {
            case 'create':
                this.title = '创建设备监控点'
                break
        }
        this.setStatusStatus = this.status
    },
    methods: {
        edit() {
        },
        async getPrepare() {
            // this.form.group_name = ''
            // this.form.dev_name = ''
            // this.form.var_name = ''
            // const group_name = await gatewaySelect({ site_id: this.siteid, district_name: this.form.district_name })
            // if (group_name.code === 1) {
            //     this.$set(this.prepare, 'group_name', group_name.data.list)
            // }
        },
        addSub() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    this.loading = true
                    // const params = JSON.parse(JSON.stringify(this.form))
                    const mesh = this.mesh.filter(item => item.id === this.form.mesh)
                    if (mesh.length) {
                        const data = {
                            mesh_id: this.form.mesh,
                            mesh_name: mesh[0].name
                        }
                        this.emitOut(data)
                    }
                    // getEquipmentGetDefaultPoint(params).then(res => {
                    //     this.callback(res)
                    // })
                }
            })
        },
        // async selectGateway_name(e) {
        //     this.form.dev_name = ''
        //     this.form.var_name = ''
        //     const dev_name = await instrumentSelect({ site_id: this.siteid, district_name: this.form.district_name, group_name: this.form.group_name })
        //     if (dev_name.code === 1) {
        //         this.$set(this.prepare, 'dev_name', dev_name.data.list)
        //     }
        // },
        // async selectDev_name(e) {
        //     this.form.var_name = ''
        //     const var_name = await varlistSelect({
        //         site_id: this.siteid,
        //         district_name: this.form.district_name,
        //         group_name: this.form.group_name,
        //         dev_name: this.form.dev_name
        //     })
        //     if (var_name.code === 1) {
        //         this.$set(this.prepare, 'var_name', var_name.data.list)
        //     }
        // },
        // 成功后
        // callback(res, type) {
        //     if (res.code === 1) {
        //         this.$message({
        //             type: 'success',
        //             message: res.msg
        //         })
        //         const mesh = this.mesh.filter(item => item.id === this.form.mesh)
        //         const data = Object.assign({}, res.data, {
        //             mesh_id: this.form.mesh,
        //             mesh_name: mesh[0].name
        //         })
        //         this.emitOut(data)
        //     }
        //     this.loading = false
        // },
        emitOut(data) {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus, data)
        },
        handleClose() {
            this.setStatusStatus = false
            this.$emit('emitOut', this.setStatusStatus)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
