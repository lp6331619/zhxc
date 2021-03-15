/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-20 16:30:14
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-17 22:21:09
 */
import { totalList, delCompany,getSetting } from '@/api/system'
import { SearchList } from '@/components/SearchBox'
import detail from './dialog/detail.vue'
import setting from './dialog/setting.vue'
export default {
    components: {
        SearchList,
        detail,
        setting
    },
    data() {
        return {
            list: {}, // 列表数据
            listData: [],
            loading: false,
            scene: '', // 场景
            diologStatus: false,
            diologSettingStatus: false,
            dialogItem: null,
            prepare: undefined,
            // 搜索的列表数据
            searchForm: {},
            // 其余的数据
            otherData: {
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取数据
        getList() {
            this.loading = true
            const parse = Object.assign({}, this.searchForm, this.otherData)
            totalList(parse).then(res => {
                this.list = res.data
                this.loading = false
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
        // 修改
        edit(item) {
            this.dialogItem = item
            this.scene = 'update'
            this.diologStatus = true
            console.log(item, 222)
        },
        // 修改
        add() {
            this.scene = 'create'
            this.diologStatus = true
        },
        // 删除
        async del(id) {
            const res = await delCompany({ id: id })
            if (res.code === 1) {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getList()
            }
        },
        // 确认
        confirm(id) {
            this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(id)
            }).catch(() => {
            })
        },
        //公司一些配置设置
        async setting(id){
            const res = await getSetting({ id: id })
            if (res.code === 1) {
              this.dialogItem = res.data
              this.scene = 'setting'
              this.diologSettingStatus = true
            }
        },
        emitOut(e, s) {
            this.diologStatus = e
            this.diologSettingStatus = e
            !s ? this.getList() : ''
        }
    }
}
