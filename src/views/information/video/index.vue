<template>
    <div class="app-container">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix flexBetween"
            >
                <span>
                    分类管理
                </span>
                <div class="btnArr">
                    <el-button
                        plain
                        icon="el-icon-plus"
                        @click="add({pid:0})"
                    >新增一级菜单</el-button>
                </div>
            </div>
            <el-table
                ref="multipleTable"
                :data="list"
                row-key="id"
            >
                <el-table-column
                    prop="name"
                    label="分类名称"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="edit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            v-if="scope.row.pid===0"
                            size="mini"
                            type="primary"
                            plain
                            @click="add({pid:scope.row.id})"
                        >添加菜单 </el-button>
                        <el-button
                            v-if="scope.row.id"
                            size="mini"
                            type="danger"
                            plain
                            @click="confirm(scope.row.id,scope.row.name)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 详情 -->
        <detail
            v-if="diologStatus"
            :item="dialogItem"
            :status="diologStatus"
            :scene="scene"
            @emitOut="emitOut"
        />
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.w200 {
    width: 200px;
}
</style>
