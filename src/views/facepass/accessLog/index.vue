<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-15 10:00:50
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-16 09:33:51
-->
<template>
    <div class="app-container">
        <el-card class="box-card searchFlex">
            <SearchList
                :prepare-data="prepare"
                :search-data="searchForm"
                :search-list-data="formType"
                :other-data="otherData"
                @emitData="emitData($event)"
                @linkageData="linkageData($event)"
            />
            <div class="btnArr">
                <el-button @click="outExcel()">导出数据</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="list.list"
            >
                <el-table-column
                    prop="capture_face_image_url"
                    label="现场照片"
                >
                <template slot-scope="scope">
                    <img
                        v-if="scope.row.capture_face_image_url"
                        class="maxImg"
                        :src="imgUrl+scope.row.capture_face_image_url"
                        @click="bigImg(imgUrl+scope.row.capture_face_image_url)"
                        alt=""
                    >
                </template>
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="相似度"
                ></el-table-column>
                <el-table-column
                    prop="hit_face_image_url"
                    label="识别结果"
                >
                <template slot-scope="scope">
                    <img
                        v-if="scope.row.hit_face_image_url"
                        class="maxImg"
                        :src="imgUrl+scope.row.hit_face_image_url"
                        @click="bigImg(imgUrl+scope.row.hit_face_image_url)"
                        alt=""
                    >
                </template>
                </el-table-column>
                <el-table-column
                    prop="access_time"
                    label="通行时间"
                ></el-table-column>
                <el-table-column
                    prop="verify_result"
                    label="是否通行"
                ></el-table-column>
                <el-table-column
                    prop="person_name"
                    label="人员身份"
                >
                </el-table-column>
                <el-table-column
                    prop="group_name"
                    label="人员组"
                ></el-table-column>
                <el-table-column
                    prop="device_name"
                    label="设备名称"
                ></el-table-column>
                <el-table-column
                    prop="temperature_status"
                    label="体温状态"
                ></el-table-column>
                <el-table-column
                    prop="direction"
                    label="进出方向"
                ></el-table-column>
                <el-table-column
                    prop="body_temperature"
                    label="体温"
                ></el-table-column>
                <el-table-column
                    prop="is_mask"
                    label="是否戴口罩"
                ></el-table-column>
            </el-table>
            <div
                v-if="list"
                class="pageBox flex pt20"
            >
                <el-pagination
                    background
                    :total="list.count"
                    :current-page="otherData.page"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="otherData.limit"
                    layout="total, sizes, prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </el-card>
        <el-dialog
            title="图片"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <div class="bigImg">
                <img
                    :src="bigUrl"
                    alt=""
                >
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
</style>
