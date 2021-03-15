
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <a @click="$router.push(`/equipmentMonitor`)"><i class="el-icon-back"></i>返回 | 监控详情 </a>
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
                            label="监控名称:"
                            prop="contorl_name"
                        >
                            <el-input
                                v-model="form.contorl_name"
                                placeholder="请输入监控名称"
                                :disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item
                            v-if="prepare.list"
                            label="站点:"
                            prop="site_id"
                        >
                            <el-select
                                v-model="form.site_id"
                                placeholder="请选择站点"
                            >
                                <el-option
                                    v-for="item in prepare.list"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item
                            label="数值背景:"
                            prop="is_back"
                        >
                            <el-radio-group v-model="form.is_back">
                                <el-radio :label="0">关</el-radio>
                                <el-radio :label="1">开</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item
                            label="显示变量名:"
                            prop="is_var"
                        >
                            <el-radio-group v-model="form.is_var">
                                <el-radio :label="0">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col> -->
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
                        <el-form-item label="上传图:">
                            <div>
                                <el-button
                                    type="primary"
                                    plain
                                    @click="openUpload()"
                                >上传.gltf
                                </el-button>
                            </div>
                            注:只支持gltf格式
                            <upload
                                v-if="upLoadStatus"
                                :status="upLoadStatus"
                                :uniquecode="form.unique_code"
                                :init="file"
                                @emitOut="emitOut"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label=" ">
                            <el-button
                                v-if="mesh && form.site_id"
                                type="primary"
                                @click="addForm"
                            >添加设备监控点</el-button>
                            <div
                                v-if="file && file.file"
                                class="canvasBox"
                            >
                                <Canvas
                                    id="three"
                                    ref="canvas"
                                    :row="file"
                                    :status="true"
                                    :cameraposition="camera"
                                    :siteid="form.site_id"
                                    @canvasBack="canvasBack"
                                    @canvaspointlist="canvaspointlist"
                                    @delpointlist="delpointlist"
                                />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="备注说明:"
                            prop="remark"
                        >
                            <el-input
                                v-model="form.remark"
                                placeholder="请输入备注说明"
                                :disabled="disabled"
                                type="textarea"
                                rows="5"
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
