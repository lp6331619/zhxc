
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <a @click="$router.push(`/vvideo`)"><i class="el-icon-back"></i>返回 | 视频编辑 </a>
            </div>
            <el-form
                ref="setDetail"
                v-loading="loading"
                :model="form"
                :rules="formRules"
                auto-complete="on"
                label-position="right"
                label-width="120px"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item
                            label="视频名称:"
                            prop="name"
                        >
                            <el-input
                                v-model="form.name"
                                placeholder="请输入视频名称"
                                :disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"></el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="封面图:"
                            prop="image_url"
                        >
                            <vue-upload-imgs
                                v-model="files"
                                multiple
                                class="logoUpload"
                                compress
                                :before-read="beforeRead"
                                :limit="limit"
                                :after-read="afterLogo"
                                :type="type"
                                @oversize="oversize"
                            >
                            </vue-upload-imgs>
                        </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item
                          label="视频:"
                          prop="url"
                      >
                          <el-upload class="avatar-uploader"
                                   :action="uploadVideoUrl"
                                   v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                                   v-bind:on-progress="uploadVideoProcess"
                                   v-bind:on-success="handleVideoSuccess"
                                   v-bind:before-upload="beforeUploadVideo"
                                   v-bind:show-file-list="false">
                            <video v-if="form.url !='' && !videoFlag"
                                   v-bind:src="imgUrl +form.url"
                                   class="avatar video-avatar"
                                   controls="controls">
                                您的浏览器不支持视频播放
                            </video>
                            <el-button v-else-if="form.url =='' && !videoFlag"
                                icon="el-icon-plus"
                            >上传视频</el-button>
                            <!-- <i v-else-if="form.url =='' && !videoFlag"
                               class="el-icon-plus avatar-uploader-icon"></i> -->
                            <el-progress v-if="videoFlag == true"
                                         type="circle"
                                         v-bind:percentage="videoUploadPercent"
                                         style="margin-top:7px;"></el-progress>
                        </el-upload>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item
                            label="定位:"
                            prop="longitude"
                        >
                            <el-select
                                v-model="address"
                                class="w100"
                                filterable
                                remote
                                :remote-method="remoteMethod"
                                :loading="loading"
                                @change="handleSelect"
                            >
                                <template v-if="tips.length">
                                    <el-option
                                        v-for="(pois) in tips"
                                        :key="pois.value"
                                        :label="pois.address+'('+pois.value+')'"
                                        :value="pois.value"
                                    >
                                    </el-option>
                                </template>
                            </el-select>
                            <div
                                id="map"
                                class="map"
                            ></div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="备注:"
                            prop="remark"
                        >
                            <el-input
                                v-model="form.remark"
                                placeholder="请输入备注内容"
                                :disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-form-item label="">
                    <div class="mt20">
                        <el-button
                            type="primary"
                            @click="submit"
                        >确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <formDia
            v-if="formStatus && form.site_id"
            :status="formStatus"
            :scene="statusType"
            :mesh="mesh.children"
            :siteid="form.site_id"
            @emitOut="outForm"
        />
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.map {
    height: 400px;
}
.comForm {
    padding: 40px;
    el-form-item {
        width: 50%;
    }
}
.uploadBtn {
    position: relative;
    overflow: hidden;
    input {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
    }
}
.canvasBox {
    height: 600px;
}
</style>
