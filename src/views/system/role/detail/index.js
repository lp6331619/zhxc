import { getAuthInfo, addRole, editRole } from '@/api/system'
export default {
    components: {
    },
    data() {
        return {
            data: undefined, // 列表数据
            loading: false,
            prepare: undefined,
            activeName: '1',
            disabled: false,
            checkStrictly: false,
            form: {
                name: '',
                intro: '',
                status: 1
            },
            formRules: {
                name: [
                    {
                        required: true,
                        max: '64',
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ],
                intro: [
                    {
                        required: true,
                        trigger: 'change',
                        message: '不能为空!'
                    }
                ]
            },
            defaultProps: {
                label: 'title'
            },
            treeData: []
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        scene() {
            return this.$route.query.scene || 'update'
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        // 获取数据
        getDetail() {
            getAuthInfo({ id: this.id }).then(res => {
                this.data = res.data
                if (this.data.form_data) {
                    this.checkStrictly = true
                    this.$nextTick(() => {
                        this.treeData = Object.values(this.data.form_data.auth)
                        this.$refs.tree.setCheckedKeys(this.treeData) //给树节点赋值
                        this.checkStrictly = false
                    })
                    this.form = {
                        name: this.data.form_data.name,
                        intro: this.data.form_data.intro,
                        status: this.data.form_data.status
                    }
                }
                this.loading = false
            })
        },
        submit() {
            this.$refs.setDetail.validate(valid => {
                if (valid) {
                    this.subFun()
                } else {
                    this.activeName = '1'
                }
            })
        },
        checkCHange(e, i, c) {
            console.log(e, i, c)
        },
        async subFun() {
            const p = this.$refs.tree.getCheckedKeys()
            const b = this.$refs.tree.getHalfCheckedKeys()
            const params = Object.assign({}, this.form, { auth: p.concat(b), id: this.id })
            if (this.scene === 'update') {
                const res = await editRole(params)
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$router.push('/role')
                }
            } else if (this.scene === 'create') {
                const res = await addRole(params)
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.$router.push('/role')
                }
            }
        }
    }
}
