<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 14:36:41
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-29 16:20:14
-->
<template>
  <div class="app-container">
      <el-card class="box-card">
          <div
              slot="header"
              class="clearfix"
          >
              <a @click="$router.push(`/vvideo`)"><i class="el-icon-back"></i>返回 | 视频编辑 </a>
          </div>
          <div class="videoDetail">
              <video v-if=" data && data.form_data && data.form_data.url"
                     v-bind:src="imgUrl +data.form_data.url"
                     class="avatar video-avatar"
                     controls="controls">
                  您的浏览器不支持视频播放
              </video>
          </div>
        </el-card>
    </div>
    <!-- <div class="canvasDetail">
        <div class="titleBox">
            <div class="title">
                <a @click="$router.push(`/vvideo`)"><i class="el-icon-back"></i>返回 | </a>
                视频详情 - {{ data && data.form_data && data.form_data.name }}
            </div>
        </div>
        <video v-if=" data && data.form_data && data.form_data.url"
               v-bind:src="imgUrl +data.form_data.url"
               class="avatar video-avatar"
               controls="controls">
            您的浏览器不支持视频播放
        </video>
    </div> -->
</template>

<script>
import { VidelDetail} from '@/api/village'
export default {
    data() {
        return {
            data: undefined, // 列表数据
            loading: true,
            prepare: undefined,
            disabled: false,
            file: {},
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        }
    },
    created() {
        this.getDetail()


        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    },
    beforeDestroy() {

    },
    methods: {
        // 获取数据
        async getDetail() {
            const res = await VidelDetail({ id: this.id })
            this.data = res.data
            this.loading.close()
        },
    }
}
</script>
<style lang="scss" >
.videoDetail {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
