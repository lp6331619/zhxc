<template>
    <div class="app-container">
        <el-card class="box-card">
            <el-tabs
                v-model="active"
                type="card"
                @tab-click="handleClick"
            >
                <el-tab-pane
                    v-for="(item,i) in list.menu_list"
                    :key="item.id"
                    :label="item.title"
                    :name="i.toString()"
                >
                    <el-card class="box-card searchFlex">
                        <div class="btnArr">
                            <el-button
                                icon="el-icon-plus"
                                @click="edit(item)"
                            >编辑本菜单</el-button>
                            <el-button @click="add(item)"> 新增菜单 </el-button>
                            <el-button
                                :disabled="selectList.length===0"
                                @click="changeStatus(1)"
                            >启用</el-button>
                            <el-button
                                :disabled="selectList.length===0"
                                @click="changeStatus(0)"
                            >禁用</el-button>
                            <el-button
                                :disabled="selectList.length===0"
                                @click="delArray()"
                            >删除</el-button>
                            <el-button @click="confirm(item.id,item.title)">删除本菜单</el-button>
                        </div>
                    </el-card>
                    <div class="p20">

                        <el-table
                            ref="multipleTable"
                            tooltip-effect="dark"
                            :data="item.childs"
                            :expand-row-keys="[4]"
                            row-key="id"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                prop="title"
                                label="菜单名称"
                            ></el-table-column>
                            <el-table-column
                                prop="sort"
                                label="排序"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-model="scope.row.sort"
                                        style="width:5vw"
                                        size="mini"
                                        type="number"
                                        @blur="saveEditsort(scope.row)"
                                    ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="sort"
                                label="状态"
                            >
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.status"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-text="正常"
                                        inactive-text="禁用"
                                        @change="changeSwitch({id:scope.row.id,val:scope.row.status})"
                                    ></el-switch>
                                </template>
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
                                        size="mini"
                                        type="primary"
                                        plain
                                        @click="add(scope.row)"
                                    >添加菜单</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        plain
                                        @click="confirm(scope.row.id,scope.row.title)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    name="999"
                    label="+"
                ></el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 详情 -->
        <detail
            v-if="diologStatus"
            :id="dialogId"
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
</style>
