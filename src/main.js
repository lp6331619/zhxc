/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-09 10:40:57
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-28 16:13:36
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/animate.css'

import request from '@/utils/request'
import App from './App'
import store from './store'
import router from './router'
import operatePriv from '@/public/js/btnPermissions.js' // 权限判断
// import 'default-passive-events' //会导致地图报错

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from '@/utils/filters'

// 上传图片插件
import VueUploadImgs from 'vue-upload-imgs'
Vue.use(VueUploadImgs)

// 公用变量图片 url
let imgUrl = ''
if (process.env.NODE_ENV === 'production') {
    imgUrl = process.env.VUE_APP_BASE_API
} else {
    imgUrl = 'http://smartymn.youminai.com/admin.php/'
}
Vue.prototype.imgUrl = imgUrl.split('admin.php/')[0]
Vue.prototype.apiUrl = imgUrl
Vue.prototype.facepassUrl = 'https://facepass.reconova.com'

import common from '@/public/js/common.js'
Vue.prototype.common = common

import { Collapse } from '@/components' // 全局注册组件
Vue.component('v-collapse', Collapse)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false
// 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
new Vue({
    el: '#app',
    store,
    request,
    router,
    operatePriv,
    render: h => h(App)
})
