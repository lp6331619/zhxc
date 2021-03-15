<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:36:41
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-29 16:20:14
-->
<template>
    <div class="canvasDetail">
        <div
          ref="titleBox"
          class="titleBox"
        >
            <div class="title">
                <a @click="$router.push(`/equipmentMonitor`)"><i class="el-icon-back"></i>返回 | </a>
                设备监控 - {{ data && data.form_data && data.form_data.contorl_name }}
            </div>
            <div
                v-if="btnList.length"
                class="btnGrop"
            >
                <el-button
                    v-for="(item,i) in btnList"
                    :key="i"
                    size="mini"
                    @click="subFun(item.var_value,item.id)"
                >{{ item.var_alias }}</el-button>
            </div>
            <div
                v-if="btnSelect.length"
                class="ctitle"
            >写入值操作</div>
            <div
                v-if="btnSelect.length"
                class="searchBox"
            >

                <el-select
                    v-if="btnSelect.length"
                    v-model="var_id"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in btnSelect"
                        :key="item.id"
                        :label="item.var_alias"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>

                <el-input
                    v-model="control_value"
                    placeholder="请输入内容"
                ></el-input>

                <el-button
                    type="primary"
                    @click="subFun(control_value,var_id)"
                >确定发送</el-button>
            </div>
            <div
             v-if="data.form_data && data.form_data.remark"
                class="ctitle"
            >备注说明</div>
          </div>
            <div
              id="remark"
                v-if="data.form_data && data.form_data.remark"
                :style="{'top':top+'px'}"
                style="position:absolute;z-index:10"
                class="searchBox textContent"
                v-html="data.form_data.remark"
            >
            </div>
        <Canvas
            v-if="file&&file.file && data.form_data"
            id="three"
            ref="canvas"
            type="radio"
            :row="file"
            :realdata="realdata"
            :detail="data.form_data"
            :cameraposition="camera"
            @canvasBack="canvasBack"
        />
    </div>
</template>

<script>
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" >
.canvasDetail {
    position: fixed;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    .titleBox {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 10;
        .title {
            color: #808d9d;
            font-size: 14px;
        }
    }
    .btnGrop {
        margin-top: 20px;
        button {
            background: #252525;
            color: #fff;
            border-color: rgba(255, 255, 255, 0.6);
            margin-bottom: 5px;
            &:hover {
                opacity: 0.7;
            }
        }
    }
    .ctitle {
        position: relative;
        color: #fff;
        margin: 15px 0;
        line-height: 40px;
        font-size: 16px;
        display: flex;
        align-items: center;
        &:before {
            content: '';
            display: block;
            width: 6px;
            height: 18px;
            background: #218bf3;
            border-radius: 20px;
            margin-right: 16px;
        }
    }
    .searchBox {
        display: flex;
        .el-select,
        .el-input {
            width: 300px;
            margin-right: 20px;
        }
        .el-input__inner {
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            background-color: #191c2b;
        }
    }
    .textContent {
      color: #fff;
      font-size: 15px;
      margin: 15px 2vw;
    }
}
</style>
