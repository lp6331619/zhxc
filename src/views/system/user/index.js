import { getUserList, editStatus, delUser, getDepartments, getRoles } from '@/api/system'
import detail from './dialog/detail.vue'
import { SearchList } from '@/components/SearchBox'
export default {
    components: {
        detail,
        SearchList
    },
    data() {
        return {
            uid:0,
            list: {}, // 列表数据
            diologStatus: false,
            loading: false,
            scene: '', // 场景
            dialogId: null,
            selectList: [],
            prepare: undefined,
            // 搜索的列表数据
            searchForm: {
                keyword: this.$route.query.keyword ? JSON.parse(this.$route.query.keyword) : '',
                username: this.$route.query.username ? JSON.parse(this.$route.query.username) : '',
                department_id: this.$route.query.department_id ? JSON.parse(this.$route.query.department_id) : null,
                role_id: this.$route.query.role_id ? JSON.parse(this.$route.query.role_id) : null
            },
            // 搜索的列表数据类型格式
            formType: [{
                typeName: '用户名',
                type: 'username',
                mode: 'Input'
            }, {
                typeName: '姓名',
                type: 'keyword',
                mode: 'Input'
            }, {
                typeName: '所属部门',
                type: 'department_id',
                prepareType: 'departments',
                selectType: true,
                mode: 'SearchSelect'
            }, {
                typeName: '角色',
                type: 'role_id',
                prepareType: 'role',
                selectType: true,
                mode: 'SearchSelect'
            }],
            // 其余的数据
            otherData: {
                limit: this.$route.query.limit ? JSON.parse(this.$route.query.limit) : 10,
                page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
            }
        }
    },
    created() {
        this.getRule()
        this.getList()
        this.uid = this.$store.state.user.data.user_info.id;
    },
    methods: {
        // 获取数据
        getList() {
            this.loading = true
            const parse = Object.assign({}, this.searchForm, this.otherData)
            getUserList(parse).then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        // 组件返回数据
        emitData(data) {
            if (data.clear) {
                this.$refs.multipleTable.clearSelection()
                this.$refs.multipleTable.clearSort()
                this.$refs.multipleTable.clearFilter()
            } else {
                this.searchForm = data.searchData
                this.otherData = data.otherData
            }
            this.toList()
        },
        signIn(item) {
            this.$confirm('是否确认登录此账号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store
                    .dispatch('user/signIn', { id: item.id, token: item.token })
                    .then(() => {
                        this.$store.dispatch('user/getMenus')
                        setTimeout(() => {
                            this.$router.push({
                                path: this.redirect || '/',
                                query: this.query
                            })
                            this.loading = false
                        }, 1000)
                    })
                    .catch(() => {
                        this.$store.dispatch('user/setCodeStatus')
                        this.getCodeImg()
                        this.loading = false
                    })
            }).catch(() => {
            })
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

        // 获取相关数据
        async getRule() {
            const departments = await getDepartments({})
            const role = await getRoles({})
            this.prepare = {
                departments: departments.data.departments,
                role: role.data.roles
            }
        },
        // 编辑状态
        async changeSwitch(item) {
            if (item) {
                const msg = await editStatus(item)
                this.$message.success(msg.msg)
                this.getList()
            }
        },
        // 改变状态
        changeStatus(type) {
            const id = []
            if (this.selectList.length > 0) {
                this.selectList.forEach(item => {
                    id.push(item.id)
                })
                this.changeSwitch({ id: id, val: type })
            }
        },
        // 修改
        edit(item) {
            this.dialogId = Number(item.id)
            this.scene = 'update'
            this.diologStatus = true
        },
        // 查看详情
        seeDetail(item) {
            this.dialogId = Number(item.id)
            this.scene = 'detail'
            this.diologStatus = true
        },
        // 删除
        delArray() {
            const id = []
            this.selectList.forEach(item => {
                id.push(item.id)
            })
            this.confirm(id)
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        // 删除
        async del(id) {
            const res = await delUser({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getList()
            }
        },
        // 添加
        add() {
            this.scene = 'create'
            this.diologStatus = true
        },
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        },
        handleSelectionChange(item) {
            this.selectList = item
        }
    }
}
