<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:36:41
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-30 14:13:35
-->
<template>
    <div class="canvasDetail">
        <div class="titleBox">
            <div class="title">
                <a @click="$router.push(`/video`)"><i class="el-icon-back"></i>返回 | </a>
                视屏监控- <b> {{ device_name }}</b>
            </div>
        </div>
        <div class="box">
            <iframe
                :src="url"
                frameborder="0"
                id="ysOpenDevice"
                allowfullscreen
            ></iframe>
            <div class="btnBox">
                <div
                    v-if="tab===1"
                    class="btnBoxbtn"
                >
                    <div class="title">
                        <span class="t"> 站点列表</span>
                        <a
                          @click="tab=3"
                          title="视频操作">
                          <i class="iconfont icon-shipin1"></i>
                        </a>
                        <a v-if="button.write_text_list&&button.write_text_list.length"
                          @click="tab=2"
                          title="设备操作">
                          <i class="iconfont icon-shebei"></i>
                        </a>
                        <!-- <el-button
                            v-if="button.write_text_list&&button.write_text_list.length"
                            icon="el-icon-setting"
                            size="mini"
                            @click="tab=2"
                        >设备操作</el-button> -->
                    </div>
                    <el-collapse
                        v-model="activeNames"
                        accordion
                        @change="handleChange"
                    >
                        <el-collapse-item
                            v-for="(item,i) in list"
                            :title="item.name"
                            :name="i"
                            :key="i"
                        >
                            <div
                                v-for="(child,c) in item.videos"
                                :key="c"
                                class="item"
                                :class="active === child.id?'active':''"
                                @click="open(child)"
                            >
                                {{ c+1 }}.
                                <span>
                                    {{ child.name }}
                                </span>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div
                    v-if="tab===2"
                    class="btnBoxbtn"
                >
                    <div class="title">
                        <span class="t"> 设备操作</span>
                        <a
                          @click="tab=1"
                          title="站点列表">
                          <i class="iconfont icon-liebiao"></i>
                        </a>
                        <a
                          @click="tab=3"
                          title="视频操作">
                          <i class="iconfont icon-shipin1"></i>
                        </a>
                    </div>
                    <div class="btnArray">
                        <el-button
                            v-for="(item,i) in button.write_btn_list"
                            :key="i"
                            @click="subFun(item.var_value,item.id)"
                        >{{ item.var_alias }}</el-button>
                    </div>
                    <div
                        v-if="button.write_text_list&&button.write_text_list.length"
                        class="searchBox"
                    >

                        <el-select
                            v-model="var_id"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in button.write_text_list"
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
                    </div>
                    <div
                        v-else
                        class="btnBoxbtn"
                    >
                        <div class="title">
                            <span class="t"> 视频操作</span>
                            <a
                              @click="tab=1"
                              title="站点列表">
                              <i class="iconfont icon-liebiao"></i>
                            </a>
                            <a v-if="button.write_text_list&&button.write_text_list.length"
                              @click="tab=2"
                              title="设备操作">
                              <i class="iconfont icon-shebei"></i>
                            </a>

                        </div>
                        <div class="btnArray">
                            <el-row style="margin-top: 20px;">
                              <el-col :span="8"><div class="grid-content" @click="trunDir(4)" style="text-align: right;"><i class="iconfont icon-jiantou_zuoshang_o"></i></div></el-col>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(0)" style="text-align: center;"><i class="iconfont icon-jiantou_xiangshang_o"></i></div></el-col>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(6)"><i class="iconfont icon-jiantou_youshang_o"></i></div></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(2)" style="text-align: right;"><i class="iconfont icon-jiantou_xiangzuo_o"></i></div></el-col>
                              <el-col :span="8">
                                <div class="grid-content" @click="turnOnAnOff()" style="text-align: center;">
                                  <i v-if="is_open" class="iconfont icon-tingzhi"></i>
                                  <i v-if="!is_open" class="iconfont icon-bofang"></i>
                                </div>
                              </el-col>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(3)"><i class="iconfont icon-jiantou_xiangyou_o"></i></div></el-col>
                            </el-row>
                            <el-row style="margin-bottom: 30px;">
                              <el-col :span="8"><div class="grid-content" @click="trunDir(5)" style="text-align: right;"><i class="iconfont icon-jiantou_zuoxia_o"></i></div></el-col>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(1)" style="text-align: center;"><i class="iconfont icon-jiantou_xiangxia_o"></i></div></el-col>
                              <el-col :span="8"><div class="grid-content" @click="trunDir(7)"><i class="iconfont icon-jiantou_youxia_o"></i></div></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8"><div class="grid-content btn_up" @click="trunDir(8)"><span>放大</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_up" @click="trunDir(10)"><span>焦距+</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_up" @click="presetMove(39)"><span>白天</span></div></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8"><div class="grid-content btn_up btn_down" @click="trunDir(9)"><span>缩小</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_up btn_down" @click="trunDir(11)"><span>焦距-</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_up btn_down" @click="presetMove(40)"><span>黑夜</span></div></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8"><div class="grid-content btn_pzt" @click="ptzMirror(0)"><span>上下翻转</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_pzt" @click="ptzMirror(2)"><span>中心翻转</span></div></el-col>
                              <el-col :span="8"><div class="grid-content btn_pzt" @click="ptzMirror(1)"><span>左右翻转</span></div></el-col>
                            </el-row>
                        </div>
                </div>
            </div>
        </div>
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
        margin: 20px 0 0 20px;
        .title {
            color: #808d9d;
            font-size: 14px;
        }
    }
    .box {
        position: relative;
        margin-top: 20px;
        height: calc(100% - 106px);
        padding: 0 374px 0 20px;
        .btnBox {
            position: absolute;
            right: 20px;
            top: 0;
            bottom: 0;
            width: 354px;
            padding: 25px 38px;
            background: #2d303b;
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                button {
                    color: #bbb;
                    border: none;
                    background: #3e404b;
                }
                .t {
                    display: flex;
                    align-items: center;
                    &:before {
                        content: '';
                        width: 5px;
                        height: 20px;
                        margin-right: 10px;
                        border-radius: 40px;
                        background: #218bf3;
                    }
                }
            }
        }
        iframe {
            width: 100%;
            height: 100%;
        }
    }
    .btnBoxbtn {
        .item {
            display: flex;
            padding: 0 20px;
            cursor: pointer;
            span {
                margin-left: 20px;
            }
            opacity: 0.5;
            &.active,
            &:hover {
                opacity: 1;
            }
        }
    }
    .btnArray {
        padding: 10px 0;
        button {
            margin: 10px 0 0 0;
            color: #bbb;
            border: none;
            background: #3e404b;
            width: 100%;
            &:hover {
                opacity: 0.7;
            }
        }
    }
    .searchBox {
        .el-select,
        .el-input,
        .el-button {
            width: 100%;
            margin-top: 10px;
        }
    }
}
  .el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
  }

  .grid-content {
    border-radius: 0px;
    min-height: 36px;
    background: #3e404b;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .btn_up{
        float: left;
        width: 60px;
        height: 55px;
        margin-left: 15px;
        display: flex;
        background: #373737;
        border-radius: 6px 6px 0 0;
        box-shadow: 1px 1px 3px #000;
  }
  .btn_up span{
        margin: auto;
  }
  .btn_down{
    border-radius:0 0 6px 6px;
    margin-top:1px;
  }
  .btn_pzt{
        float: left;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 30px;
        margin-left: 6.5px;
        margin-top: 20px;
        background: #373737;
        border-radius: 4px;
        box-shadow: 1px 1px 3px #000;
  }
</style>
