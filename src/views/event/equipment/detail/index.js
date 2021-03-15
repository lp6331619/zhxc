/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:36:41
 * @LastEditors: Teemor
 * @LastEditTime: 2021-03-04 14:33:28
 */
import { getDeviceShow, getWriteVarList, addControl, checkPass, realdataSelect } from '@/api/site'
import { Canvas } from '@/components'
export default {
    components: {
        Canvas
    },
    data() {
        return {
            data: { form_data: {} }, // 列表数据
            loading: true,
            prepare: undefined,
            disabled: false,
            btnList: [],
            btnSelect: [],
            control_value: '',
            var_id: '',
            file: {},
            mesh: undefined,
            realdata: undefined,
            setInterval: undefined,
            top: 0
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    created() {
        this.getDetail()
        this.getrealdataSelect()
        this.setInterval = setInterval(() => {
            this.getrealdataSelect()
        }, 8000)

        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    },
    beforeDestroy() {
        clearInterval(this.setInterval)
    },
    methods: {
        // 获取数据
        async getDetail() {
            const res = await getDeviceShow({ id: this.id })
            this.data = res.data
            if (!this.data.form_data) return
            this.camera = {
                x: this.data.form_data.camera_x && Number(this.data.form_data.camera_x),
                y: this.data.form_data.camera_y && Number(this.data.form_data.camera_y),
                z: this.data.form_data.camera_z && Number(this.data.form_data.camera_z)
            }
            if (this.data.form_data.back_img) {
                this.file = {
                    file: this.data.form_data.back_img
                }
            }
            if (this.data.form_data.remark) {
                this.data.form_data.remark = this.data.form_data.remark.replace(/\n/g, '<br/>')
            }
            this.getWriteVarListF()
        },
        async getrealdataSelect() {
            const res = await realdataSelect({ control_id: this.id })
            if (res.code === 1) {
                this.realdata = res.data.list
                if (this.mesh) {
                    const mesh = this.returnMesh()
                    this.$refs.canvas.clear(mesh)
                    this.$refs.canvas.addDIan(mesh, this.data.point_list,'realdata')
                }
            }
        },
        async getWriteVarListF() {
            const res = await getWriteVarList({ site_id: this.data.form_data.site_id })
            this.btnList = res.data.write_btn_list
            this.btnSelect = res.data.write_text_list
            this.$nextTick(() => {
                this.top = this.$refs.titleBox.offsetHeight
                console.log(this.top, 22)
            })
        },
        /**
         * @name: 返回 mesh
         * @param {*}
         * @return {*}
         */
        returnMesh() {
            const mesh = []
            this.data.point_list.forEach(item => {
                const m = this.mesh.children.filter(me => me.name === item.mesh_name)
                if (m.length > 0) {
                    mesh.push(...m)
                }
            })
            return mesh
        },
        /**
         * @name: canvas返回的数据
         * @param {*} e
         * @return {*}
         */
        canvasBack(e) {
            this.mesh = e
            const mesh = this.returnMesh()
            this.$refs.canvas.addDIan(mesh, this.data.point_list)
            this.loading.close()
        },
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
