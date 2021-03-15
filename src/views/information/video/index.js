import { classifyList, addClassify, editClassify, delClassify } from '@/api/information'
import detail from './dialog/detail.vue'
export default {
    components: {
        detail
    },
    data() {
        return {
            list: [], // 列表数据
            loading: false,
            diologStatus: false,
            dialogItem: {},
            scene: 'create',
            prepare: undefined
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取数据
        async getList() {
            this.loading = true
            const res = await classifyList({})
            this.list = res.data.list.map(this.child, this)
            this.loading = false
        },
        child(item) {
            this.$set(item, 'children', item.children_class)
            this.$set(item, 'status', true)
            if (item.children_class && item.children_class.length > 0) {
                item.children_class.map(child => {
                    this.$set(child, 'children', child.children_class)
                    this.$set(child, 'status', true)
                })
            }
            return item
        },
        // 添加
        add(item) {
            this.dialogItem = item
            this.scene = 'create'
            this.diologStatus = true
        },
        // 修改
        edit(item) {
            this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true
        },
        // 删除
        async del(id) {
            const res = await delClassify({ id: id })
            this.message(res)
        },
        async sub(row) {
            if (row.id) {
                const res = await editClassify({ name: row.name, id: row.id, type: 1, pid: row.pid })
                this.message(res)
            } else {
                const res = await addClassify({ name: row.name, type: 1 })
                this.message(res)
            }
        },
        message(res) {
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
