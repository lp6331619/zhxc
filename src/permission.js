import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
// 权限路由
// import { screenRoutes } from './router/asyncRoutes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 白名单
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)
    // determine whether the user has logged in
    if (store.getters.token && store.getters.data && store.getters.menu) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.data) {
                next()
            } else {
                try {
                    // get user info
                    // await store.dispatch('user/getInfo')
                    // const asyncRoutes = screenRoutes(store.getters.priv)
                    // router.options.routes.push(...asyncRoutes)
                    // router.addRoutes(asyncRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}&query=${JSON.stringify(to.query)}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}&query=${JSON.stringify(to.query)}`) // 否则全部重定向到登录页
        }
        NProgress.done()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
