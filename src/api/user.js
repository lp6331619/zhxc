import request from '@/utils/request'
// 登录
export function login(data) {
    return request({
        url: 'system/Publics/login.html',
        method: 'post',
        data
    })
}
// 获取token
export function loginSchema() {
    return request({
        url: 'system/Publics/token.html',
        method: 'post'
    })
}
// 获取menu
export function getMenuApi(params) {
    return request({
        url: 'system/system/getMenus',
        method: 'get',
        params
    })
}
// 退出登录
export function logout() {
    return request({
        url: 'system/Publics/logout',
        method: 'get'
    })
}
// 修改个人信息
export function userInfo(data) {
    return request({
        url: 'system/user/info.html',
        method: 'post',
        data
    })
}
// 上传图片
export function upload(data) {
    return request({
        url: 'system/annex/upload.html',
        method: 'post',
        data
    })
}
// 一键登录
export function signIn(data) {
    return request({
        url: 'system/publics/loginByToken.html',
        method: 'get',
        params: data
    })
}
