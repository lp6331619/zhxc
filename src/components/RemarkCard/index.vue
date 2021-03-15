<template>
    <div v-if="remarkUrls">
        <v-collapse title="备注信息">
            <el-button
                slot="titleRight"
                v-operatePriv="{priv:remarkUrls.addPrive}"
                type="primary"
                size="mini"
                plain
                @click.stop.native="addNote"
            >
                <i class="el-icon-circle-plus blue mr5"></i>添加
            </el-button>
            <template slot="content">
                <div v-operatePriv="{priv:remarkUrls.listPrive}" class="p20 pb0">
                    <template v-if="list.length>0">
                        <div v-for="(item,index) in list" :key="index" class="item">
                            {{ item.date +" " +"(" +item.user +")" +" " +item.note }}
                            <el-button
                                v-operatePriv="{priv:remarkUrls.delPrive}"
                                size="mini"
                                class="ml10"
                                type="danger"
                                plain
                                @click.stop.native="del(item.id)"
                            >删除</el-button>
                        </div>
                    </template>
                    <div v-else>暂无数据</div>
                </div>
            </template>
        </v-collapse>
        <!-- <el-card class="box-card collapse">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="备注信息" name="1" :accordion="true">
                    <template slot="title" class="p20">
                        备注信息
                        <el-button
                            v-operatePriv="{priv:remarkUrls.addPrive}"
                            class="ml20"
                            type="primary"
                            size="mini"
                            plain
                            @click.stop.native="addNote"
                        >
                            <i class="el-icon-circle-plus blue mr5"></i>添加
                        </el-button>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </el-card>-->
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
    name: 'RemarkCard',
    props: {
        userId: {
            type: Number,
            default: null
        },
        remarkUrls: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            dataBox: {},
            activeNames: ['1'],
            list: []
        }
    },
    computed: {
        user() {
            return this.userId
        }
    },
    mounted() {
        this.dataBox = this.initData
        this.getList()
    },
    methods: {
        getList() {
            request({
                url: this.remarkUrls.noteList,
                method: 'post',
                data: { id: this.user }
            }).then(res => {
                if (res.result.isSuccess) {
                    this.list = res.data
                }
            })
        },
        // 删除
        del(id) {
            this.$confirm('是否确认删除该备注?', '删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    request({
                        url: this.remarkUrls.delNote,
                        method: 'post',
                        data: { logId: id, id: this.user }
                    }).then(res => {
                        if (res.result.isSuccess) {
                            this.$message.success(res.result.message)
                            this.getList()
                        }
                    })
                })
                .catch(() => {})
        },
        addNote() {
            this.$prompt('请输入备注内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '不能为空!'
            })
                .then(({ value }) => {
                    request({
                        url: this.remarkUrls.addNote,
                        method: 'post',
                        data: { note: value, id: this.user }
                    }).then(res => {
                        if (res.result.isSuccess) {
                            this.$message.success(res.result.message)
                            this.getList()
                        }
                    })
                })
                .catch(() => {})
        }
    }
}
</script>

<style lang="scss">
.p0 {
    .el-card__body {
        padding: 0;
    }
    .el-collapse-item__header {
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        height: 55px;
    }
}
.item {
    line-height: 40px;
}
</style>
