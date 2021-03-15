import { getMenusList, saveDel, saveStatus, saveEditsort } from '@/api/system'
import detail from './dialog/detail.vue'
export default {
    components: {
        detail
    },
    data() {
        return {
            list: {}, // 列表数据
            active: '0',
            loading: false,
            scene: '', // 场景
            diologStatus: false,
            dialogItem: null,
            dialogId: null,
            prepare: undefined,
            selectList: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取数据
        getList() {
            this.loading = true
            getMenusList({}).then(res => {
                this.list = res.data
                this.list.menu_list.map(item => {
                    return this.child(item)
                })
                this.loading = false
            })
        },
        child(item) {
            item.childs.map(child => {
                this.$set(child, 'children', child.childs)
                if (child.children && child.children.length > 0) {
                    this.child(child)
                }
                return child
            })
        },
        handleClick(e) {
            // 添加一级分类
            if (e.name === '999') {
                this.scene = 'create'
                this.dialogItem = {
                    id: 0
                }
                this.diologStatus = true
                setTimeout(() => {
                    this.active = '0'
                }, 100)
            }
        },
        // 添加
        add(row) {
            this.scene = 'create'
            const module = this.list.menu_list[this.active].module
            const id = row ? row.id : null
            this.dialogItem = {
                id: id,
                module: module
            }
            this.diologStatus = true
        },
        // 修改
        edit(item) {
            this.dialogId = item.id
            this.scene = 'update'
            this.diologStatus = true
        },
        handleSelectionChange(item) {
            this.selectList = item
        },
        // 列表排序
        async saveEditsort(item) {
            if (item) {
                const res = await saveEditsort({ id: item.id, val: item.sort, field: 'sort' })
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.getList()
                }
            }
        },
        // 编辑状态
        async changeSwitch(item) {
            if (item) {
                const msg = await saveStatus(item)
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
                this.changeSwitch({ id: id, val: type, field: 'status' })
            }
        },
        // 删除
        delArray() {
            const id = []
            const name = []
            this.selectList.forEach(item => {
                id.push(item.id)
                name.push(item.title)
            })
            this.confirm(id, name)
        },
        // 删除
        async del(id) {
            const res = await saveDel({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getList()
            }
        },
        // 确认
        confirm(id, name) {
            this.$confirm(`此操作将永久删除 ${name}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        emitOut(e, s) {
            this.diologStatus = e
            !s ? this.getList() : ''
        }
    }
}
