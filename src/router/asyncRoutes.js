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
 * priv :'_menu:member'           该路由的权限
 * tabs :{}                       权限映射表
 * meta : {
    title: 'title'                    侧边栏和面包屑中显示的名称（推荐设置)
    icon: 'svg-name'                  图标显示在侧栏中
    breadcrumb: false                 如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'       如果设置路径，侧边栏将突出显示您设置的路径
 *}
tabs:{}                           权限列表所用
}
*/

/**
 * constantRoutes
 * a base page that does not have permission requirements 没有权限要求的基页
 * all roles can be accessed 可以访问所有角色
 */
/* Layout */
import Layout from '@/layout'
import store from '@/store'
export const asyncRoutes = [
    {
        path: '/system',
        component: Layout,
        redirect: '/system/priv',
        name: 'system',
        priv: '_menu:system',
        meta: { title: '系统设置', icon: 'example' },
        children: [
            {
                path: 'priv',
                name: 'priv',
                priv: 'system:privilege:detail',
                component: () => import('@/views/system/priv/index'),
                meta: { title: '权限管理', icon: 'table' },
                actions: {
                    'system.priv:detail': {
                        title: '权限信息',
                        priv: 'system:privilege:detail'
                    },
                    'system.priv:config': {
                        title: '设置权限',
                        priv: 'system:privilege:set'
                    }
                }
            }
        ]
    }
]

// 递归获取有权限的子菜单
function recursion(item, role) {
    if (item.children && item.children.length) {
        item.children = item.children.filter(child => {
            recursion(child, role)
            return role[child.priv]
        })
    }
    return role[item.priv]
}
// 筛选有权限的路由
export function screenRoutes(role) {
    var routeBox = []
    // 是否有全部权限
    if (store.state.user.data.privileges['_special:all']) {
        routeBox = asyncRoutes
    } else {
        const box = JSON.parse(JSON.stringify(asyncRoutes)) // 深拷贝不完全.
        // 深拷贝component
        asyncRoutes.forEach((item, index) => {
            box[index].component = item.component
            if (item.children && item.children.length) {
                item.children.forEach((t, i) => {
                    box[index].children[i].component = t.component
                    if (t.children && t.children.length) {
                        t.children.forEach((t1, i1) => {
                            box[index].children[i].children[i1].component = t1.component
                        })
                    }
                })
            }
        })
        routeBox = box.filter(item => recursion(item, role))
    }
    routeBox.push({ path: '*', redirect: '/404', hidden: true })
    return routeBox
}
