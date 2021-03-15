<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 15:59:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-28 14:07:17
-->
<template>
    <div class="app-container">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <a @click="$router.push(`/video`)"><i class="el-icon-back"></i>返回 | 监控详情 </a>
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
                            prop="name"
                        >
                            <el-input
                                v-model="form.name"
                                placeholder="请输入监控名称"
                                :disabled="disabled"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item
                            v-if="prepare.list"
                            label="所属站点:"
                        >
                            <el-select
                                v-model="form.site_id"
                                placeholder="请选择站点ID"
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
                    <el-col :span="6">
                        <el-form-item
                            v-if="prepare.device_id"
                            label="关联设备:"
                        >
                            <el-select
                                v-model="form.device_id"
                                placeholder="请选择关联设备"
                            >
                                <el-option
                                    label="请选择"
                                    :value="0"
                                >
                                </el-option>
                                <el-option
                                    v-for="item in prepare.device_id"
                                    :key="item.id"
                                    :label="item.contorl_name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            v-if="prepare.class_id"
                            label="视频分类:"
                            prop="class_id"
                        >
                            <el-cascader
                                :show-all-levels="false"
                                :options="prepare.class_id"
                                v-model="searchData"
                                :props="optionProps"
                                change-on-select
                                placeholder="请选择视频分类"
                            >
                            </el-cascader>

                            
                            <el-button
                                icon="el-icon-plus"
                                plain
                                @click="$router.push(`/videoClass`)"
                            >分类管理</el-button>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <el-col :span="24">
                        <el-form-item
                            label="设置监控图片:"
                            prop="pic"
                        >
                            <vue-upload-imgs
                                v-model="files"
                                multiple
                                compress
                                :before-read="beforeRead"
                                :limit="limit"
                                :after-read="afterLicense"
                                :type="type"
                                @oversize="oversize"
                            >
                            </vue-upload-imgs>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="应用appKey:"
                            prop="app_key"
                        >
                            <el-input
                                v-model="form.app_key"
                                placeholder="请输入应用appKey"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="应用appSecret:"
                            prop="app_secret"
                        >
                            <el-input
                                v-model="form.app_secret"
                                placeholder="请输入应用appSecret"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="设备序列号:"
                            prop="device_serial"
                        >
                            <el-input
                                v-model="form.device_serial"
                                placeholder="请输入设备序列号"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="设备验证码:"
                            prop="device_code"
                        >
                            <el-input
                                v-model="form.device_code"
                                placeholder="请输入设备验证码"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="设备通道:"
                            prop="channel_no"
                        >
                            <el-input
                                v-model="form.channel_no"
                                placeholder="请输入设备通道"
                            />
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
.clear {
    clear: both;
}
</style>
