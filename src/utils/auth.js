import Cookies from 'js-cookie'
import Storage from './storage'
const TokenKey = 'wy_admin_token'
const nameKey = 'wy_admin_name'
const codeStatus = 'wy_admin_status'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getName() {
    return Cookies.get(nameKey)
}
// 设置获取 登录错误次数
export function getStatus() {
    return Cookies.get(codeStatus)
}
export function setStatus(status) {
    return Cookies.set(codeStatus, status)
}
export function removeStatus(status) {
    return Cookies.remove(codeStatus)
}
const storage = new Storage()
// 设置user data
export function getData() {
    const data = storage.getItem('userInfo')
    return data || undefined
}
export function setData(value) {
    return storage.setItem({ name: 'userInfo', value: value })
}
export function removeData() {
    return storage.removeItem('userInfo')
}
// 设置user data
export function getMenu() {
    const data = storage.getItem('menus')
    return data || undefined
}
export function setMenu(value) {
    return storage.setItem({ name: 'menus', value: value })
}
export function removeMenu() {
    return storage.removeItem('munes')
}
// 设置权限
export function getPriv() {
    const data = storage.getItem('priv')
    return data || undefined
}
export function setPriv(value) {
    return storage.setItem({ name: 'priv', value: value })
}
