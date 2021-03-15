import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: 子菜单仅在route children.length>=1时出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时,
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则breadcrumb中不会重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置)
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements 没有权限要求的基页
 * all roles can be accessed 可以访问所有角色
 */
// 固定路由
const constantRoutesFixed = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: '首页',
            component: () => import('@/views/home/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    }, {
        path: '',
        component: Layout,
        name: 'system',
        meta: { title: '系统设置', icon: 'example' },
        children: [
            {
                path: 'role',
                name: 'role',
                component: () => import('@/views/system/role/index.vue'),
                meta: { title: '角色管理' }
            }, {
                path: 'role/detail',
                name: 'role',
                hidden: true,
                component: () => import('@/views/system/role/detail/index.vue'),
                meta: { title: '角色详情' }
            }, {
                path: 'user',
                name: 'user',
                component: () => import('@/views/system/user/index.vue'),
                meta: { title: '员工列表' }
            }, {
                path: 'department',
                name: 'department',
                component: () => import('@/views/system/department/index.vue'),
                meta: { title: '部门列表' }
            }, {
                path: 'menus',
                name: 'menus',
                component: () => import('@/views/system/menus/index.vue'),
                meta: { title: '系统菜单' }
            }, {
                path: 'company',
                name: 'company',
                component: () => import('@/views/system/company/index.vue'),
                meta: { title: '公司管理' }
            }, {
                path: 'userInfo',
                name: 'userInfo',
                component: () => import('@/views/system/userInfo/index.vue'),
                meta: { title: '修改个人信息' }
            },
            // 事件管理
            {
                path: 'shortMessage',
                name: 'shortMessage',
                component: () => import('@/views/event/shortMessage/index.vue'),
                meta: { title: '短信记录' }
            },
            {
                path: 'site',
                name: 'site',
                component: () => import('@/views/event/site/index.vue'),
                meta: { title: '站点管理' }
            },
            {
                path: 'equipmentMonitor',
                name: 'equipmentMonitor',
                component: () => import('@/views/event/equipment/index.vue'),
                meta: { title: '设备监控' }
            },
            {
                path: 'equipmentCreate',
                name: 'equipmentCreate',
                hidden: true,
                component: () => import('@/views/event/equipment/create/index.vue'),
                meta: { title: '设备新建/修改' }
            },
            {
                path: 'equipmentDetail',
                name: 'equipmentDetail',
                hidden: true,
                component: () => import('@/views/event/equipment/detail/index.vue'),
                meta: { title: '设备详情' }
            },
            {
                path: 'video',
                name: 'video',
                component: () => import('@/views/event/video/index.vue'),
                meta: { title: '视频监控' }
            },
            {
                path: 'videoCreate',
                name: 'videoCreate',
                hidden: true,
                component: () => import('@/views/event/video/create/index.vue'),
                meta: { title: '视频新建/修改' }
            },
            {
                path: 'videoDetail',
                name: 'videoDetail',
                hidden: true,
                component: () => import('@/views/event/video/detail/index.vue'),
                meta: { title: '视频详情' }
            },
            // 趋势分析
            {
                path: 'trend',
                name: 'trend',
                component: () => import('@/views/trend/index.vue'),
                meta: { title: '趋势分析' }
            },
            // 趋势分析
            {
                path: 'fault',
                name: 'fault',
                component: () => import('@/views/fault/index.vue'),
                meta: { title: '故障报警' }
            },
            // 信息管理
            {
                path: 'equipment',
                name: 'equipment',
                component: () => import('@/views/information/equipment/index.vue'),
                meta: { title: '设备变量配置管理' }
            },
            {
                path: 'history',
                name: 'history',
                component: () => import('@/views/information/history/index.vue'),
                meta: { title: '历史数据列表' }
            },
            {
                path: 'event_history',
                name: 'event_history',
                component: () => import('@/views/history/index.vue'),
                meta: { title: '事件回查分析' }
            },
            {
                path: 'message',
                name: 'message',
                component: () => import('@/views/information/message/index.vue'),
                meta: { title: '短信模板' }
            },
            {
                path: 'videoClass',
                name: 'videoClass',
                component: () => import('@/views/information/video/index.vue'),
                meta: { title: '视频分类' }
            },
            {
                path: 'access_log_list',
                name: 'access_log_list',
                component: () => import('@/views/facepass/accessLog/index.vue'),
                meta: { title: '通行记录' }
            },
            {
                path: 'alert_tempareture_list',
                name: 'alert_tempareture_list',
                component: () => import('@/views/facepass/alertTempareture/index.vue'),
                meta: { title: '防疫告警' }
            },
            {
                path: 'tempareture_echart',
                name: 'tempareture_echart',
                component: () => import('@/views/facepass/temparetureEchart/index.vue'),
                meta: { title: '温度分析' }
            },
            {
                path: 'fp_device',
                name: 'fp_device',
                component: () => import('@/views/facepass/device/index.vue'),
                meta: { title: '温感设备列表' }
            },
            // 运维管理
            {
                path: 'inspection',
                name: 'inspection',
                component: () => import('@/views/maintenance/inspection/index.vue'),
                meta: { title: '巡检站点管理' }
            }, {
                path: 'task',
                name: 'task',
                component: () => import('@/views/maintenance/task/index.vue'),
                meta: { title: '任务管理' }
            },
            {
                path: 'inspectionItem',
                name: 'inspectionItem',
                component: () => import('@/views/maintenance/inspectionItem/index.vue'),
                meta: { title: '巡检项目' }
            }, {
                path: 'report',
                name: 'report',
                component: () => import('@/views/maintenance/report/index.vue'),
                meta: { title: '报告清单' }
            },
            {
                path: 'maintenance',
                name: 'maintenance',
                component: () => import('@/views/maintenance/maintenance/index.vue'),
                meta: { title: '运维信息' }
            },
            {
                path: 'maintenanceDetail',
                name: 'maintenanceDetail',
                hidden: true,
                component: () => import('@/views/maintenance/maintenance/dialog/detail.vue'),
                meta: { title: '运维信息编辑' }
            },
            //接沈工的小型设备功能
            {
                path: 'mdevice',
                name: 'mdevice',
                component: () => import('@/views/device/mdevice/index.vue'),
                meta: { title: '设备列表' }
            },
            {
                path: 'mdeviceHistory',
                name: 'mdeviceHistory',
                component: () => import('@/views/device/history/index.vue'),
                meta: { title: '智能设备历史记录' }
            },
            {
                path: 'mtrend',
                name: 'mtrend',
                component: () => import('@/views/device/trend/index.vue'),
                meta: { title: '智能设备趋势分析' }
            },
            {
                path: 'mdeviceCreate',
                name: 'mdeviceCreate',
                hidden: true,
                component: () => import('@/views/device/mdevice/create/index.vue'),
                meta: { title: '设备新建/修改' }
            },
            {
                path: 'mdeviceDetail',
                name: 'mdeviceDetail',
                hidden: true,
                component: () => import('@/views/device/mdevice/detail/index.vue'),
                meta: { title: '设备详情' }
            },
            //乡村模块
            {
                path: 'beekeeping',
                name: 'beekeeping',
                component: () => import('@/views/village/beekeeping/index.vue'),
                meta: { title: '养蜂情况' }
            },
            {
                path: 'vvideo',
                name: 'vvideo',
                component: () => import('@/views/village/video/index.vue'),
                meta: { title: '宣传视频' }
            },
            {
                path: 'vvideoDetail',
                name: 'vvideoDetail',
                hidden: true,
                component: () => import('@/views/village/video/create/index.vue'),
                meta: { title: '视频编辑' }
            },
            {
                path: 'vvideoShow',
                name: 'vvideoShow',
                hidden: true,
                component: () => import('@/views/village/video/detail/index.vue'),
                meta: { title: '视频播放' }
            },
            {
                path: 'fupin',
                name: 'fupin',
                component: () => import('@/views/village/fupin/index.vue'),
                meta: { title: '精准扶贫' }
            },
            {
                path: 'viewpoint',
                name: 'viewpoint',
                component: () => import('@/views/village/viewpoint/index.vue'),
                meta: { title: '乡村景点' }
            },
            {
                path: 'product',
                name: 'product',
                component: () => import('@/views/village/product/index.vue'),
                meta: { title: '特色农产品' }
            },
        ]
    }]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutesFixed
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router
