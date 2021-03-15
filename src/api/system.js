import request from '@/utils/request'
// 获取菜单列表
export function getMenusList() {
    return request({
        url: 'system/Menu/index.html',
        method: 'post'
    })
}
// 获取菜单的下拉列表
export function getMenusChild() {
    return request({
        url: 'system/Menu/getMenus.html',
        method: 'get'
    })
}
// 保存菜单
export function saveMenu(data) {
    return request({
        url: 'system/Menu/add',
        method: 'post',
        data: data
    })
}
// 保存菜单编辑
export function saveEditMenu(data) {
    return request({
        url: 'system/Menu/edit.html',
        method: 'post',
        data: data
    })
}
// 保存菜单编辑
export function saveEditsort(data) {
    return request({
        url: 'system/Menu/sort',
        method: 'post',
        data: data
    })
}
// 获取单个菜单表单信息
export function getMenuEdit(data) {
    return request({
        url: 'system/Menu/edit.html',
        method: 'get',
        params: data
    })
}
// 菜单状态修改
export function saveStatus(data) {
    return request({
        url: 'system/menu/status',
        method: 'post',
        data: data
    })
}
// 菜单删除
export function saveDel(data) {
    return request({
        url: 'system/menu/del',
        method: 'post',
        data: data
    })
}
// 员工列表
export function getUserList(data) {
    return request({
        url: 'system/User/index',
        method: 'post',
        data: data
    })
}
// 获取单个角色的权限信息：表单/权限列表
export function getAuthInfo(data) {
    return request({
        url: 'system/User/getAuthInfo',
        method: 'get',
        params: data
    })
}
// 保存角色权限编辑
export function editRole(data) {
    return request({
        url: 'system/User/editRole.html',
        method: 'post',
        data: data
    })
}
// 保存新增用户
export function addUser(data) {
    return request({
        url: 'system/User/addUser',
        method: 'post',
        data: data
    })
}
// 获取所有部门ID和名称
export function getDepartments(data) {
    return request({
        url: 'system/User/getDepartments',
        method: 'get',
        params: data
    })
}
// 部门列表
export function getDepartmentsIndex(data) {
    return request({
        url: 'system/department/index.html',
        method: 'post',
        data: data
    })
}
// 添加部门
export function addDepartments(data) {
    return request({
        url: 'system/department/add.html',
        method: 'post',
        data: data
    })
}
// 编辑部门
export function editDepartments(data) {
    return request({
        url: 'system/department/edit.html',
        method: 'post',
        data: data
    })
}
// 删除部门
export function delDepartments(data) {
    return request({
        url: 'system/department/del.html',
        method: 'post',
        data: data
    })
}
// 获取所有用户列表
export function getUsers(data) {
    return request({
        url: 'system/User/getUsers',
        method: 'post',
        data: data
    })
}
// 获取所有用户详情
export function getUsersDetail(data) {
    return request({
        url: 'system/User/detail',
        method: 'post',
        data: data
    })
}
// 获取角色列表
export function getRoles(data) {
    return request({
        url: 'system/User/getRoles',
        method: 'post',
        data: data
    })
}
// 编辑用户信息保存
export function editUser(data) {
    return request({
        url: 'system/User/editUser',
        method: 'post',
        data: data
    })
}
// 员工状态编辑
export function editStatus(data) {
    return request({
        url: 'system/User/status.html',
        method: 'post',
        data: data
    })
}
// 用户删除
export function delUser(data) {
    return request({
        url: 'system/User/delUser',
        method: 'post',
        data: data
    })
}
// 角色列表
export function role(data) {
    return request({
        url: 'system/User/role',
        method: 'post',
        data: data
    })
}
// 角色状态编辑
export function statusRole(data) {
    return request({
        url: 'system/User/statusRole.html',
        method: 'post',
        data: data
    })
}
// 角色删除
export function delRole(data) {
    return request({
        url: 'system/User/delRole.html',
        method: 'post',
        data: data
    })
}
// 添加角色
export function addRole(data) {
    return request({
        url: 'system/User/addRole',
        method: 'post',
        data: data
    })
}
// 公司列表
export function totalList(data) {
    return request({
        url: 'system/Company/totalList',
        method: 'post',
        data: data
    })
}
// 添加公司
export function addCompany(data) {
    return request({
        url: 'system/Company/add',
        method: 'post',
        data: data
    })
}
// 公司编辑
export function editCompany(data) {
    return request({
        url: 'system/Company/edit',
        method: 'post',
        data: data
    })
}
// 删除公司
export function delCompany(data) {
    return request({
        url: 'system/Company/del',
        method: 'post',
        data: data
    })
}
// 获取公司设置详情
export function getSetting(data) {
    return request({
        url: 'system/Company/getSetting',
        method: 'post',
        data: data
    })
}
// 保存公司设置详情
export function saveSetting(data) {
    return request({
        url: 'system/Company/saveSetting',
        method: 'post',
        data: data
    })
}
