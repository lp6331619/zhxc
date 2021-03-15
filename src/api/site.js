/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-10-16 11:53:17
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-04 15:19:59
 */
import request from '@/utils/request'
/**
 * @name: 站点列表
 * @param {type} 
 * @return {type} 
 */
export function getIndexIndex(data) {
    return request({
        url: 'site/Index/index',
        method: 'post',
        data
    })
}
/**
 * @name: 添加站点
 * @param {type} 
 * @return {type} 
 */
export function IndexAdd(data) {
    return request({
        url: 'site/Index/add',
        method: 'post',
        data
    })
}
/**
 * @name: 编辑站点
 * @param {type} 
 * @return {type} 
 */
export function IndexEdit(data) {
    return request({
        url: 'site/Index/edit',
        method: 'post',
        data
    })
}
/**
 * @name: 改变站点状态
 * @param {type} 
 * @return {type} 
 */
export function getIndexStatus(data) {
    return request({
        url: 'site/Index/status',
        method: 'post',
        data
    })
}
/**
 * @name: 删除站点
 * @param {type} 
 * @return {type} 
 */
export function getIndexDel(data) {
    return request({
        url: 'site/Index/del',
        method: 'post',
        data
    })
}
/**
 * @name: 设备监控列表
 * @param {type} 
 * @return {type} 
 */
export function getEquipmentIndex(data) {
    return request({
        url: 'site/Equipment/index',
        method: 'post',
        data
    })
}
/**
 * @name: 添加/编辑设备监控
 * @param {type} 
 * @return {type} 
 */
export function getEquipmentSaveEdit(data) {
    return request({
        url: 'site/Equipment/saveEdit',
        method: 'post',
        data
    })
}
/**
 * @name: 查看设备监控详情
 * @param {type} 
 * @return {type} 
 */
export function getDeviceShow(data) {
    return request({
        url: 'site/Device/show.html',
        method: 'post',
        data
    })
}
/**
 * @name: 设置操作按钮、选项列表
 * @param {type} 
 * @return {type} 
 */
export function getWriteVarList(data) {
    return request({
        url: 'site/Device/getWriteVarList',
        method: 'post',
        data
    })
}
/**
 * @name: 操作控制设备接口
 * @param {type} 
 * @return {type} 
 */
export function addControl(data) {
    return request({
        url: 'site/Device/addControl',
        method: 'post',
        data
    })
}
/**
 * @name: 控制设备验证密码
 * @param {type} 
 * @return {type} 
 */
export function checkPass(data) {
    return request({
        url: 'site/Device/checkPass',
        method: 'post',
        data
    })
}
/**
 * @name: 定时获取设备监控点数据
 * @param {type} 
 * @return {type} 
 */
export function realdataSelect(data) {
    return request({
        url: 'site/Device/realdataSelect.html',
        method: 'post',
        data
    })
}
/**
 * @name: 删除设备监控
 * @param {type} 
 * @return {type} 
 */
export function getEquipmentDel(data) {
    return request({
        url: 'site/Equipment/del',
        method: 'post',
        data
    })
}
/**
 * @name: 获取默认设备监控点
 * @param {type} 
 * @return {type} 
 */
export function getEquipmentGetDefaultPoint(data) {
    return request({
        url: 'site/Equipment/getDefaultPoint',
        method: 'post',
        data
    })
}
/**
 * @name: 获取设备监控点变量配置
 * @param {type} 
 * @return {type} 
 */
export function getVarConfigs(data) {
    return request({
        url: 'site/Device/getVarConfigs',
        method: 'post',
        data
    })
}
/**
 * @name: 所有站点列表
 * @param {type} 
 * @return {type} 
 */
export function getEquipmentSiteList(data) {
    return request({
        url: 'site/Equipment/siteList',
        method: 'post',
        data
    })
}
/**
 * @name: 3d图上传（obj,mtl）
 * @param {type} 
 * @return {type} 
 */
export function annexUpload3d(data) {
    request({
        url: 'system/annex/upload3d',
        method: 'post',
        type: 'formdata',
        data: data
    })
}
/**
 * @name: 视频列表
 * @param {type} 
 * @return {type} 
 */
export function classVideoList(data) {
    return request({
        url: 'site/Video/classVideoList',
        method: 'post',
        data
    })
}

/**
 * @name: 编辑视频
 * @param {type} 
 * @return {type} 
 */
export function getVideoMonitorEdit(data) {
    return request({
        url: 'site/Video/editClassify',
        method: 'post',
        data
    })
}
/**
 * @name: 删除视频
 * @param {type} 
 * @return {type} 
 */
export function getVideoMonitorDel(data) {
    return request({
        url: 'site/Video/delClassify',
        method: 'post',
        data
    })
}
/**
 * @name: 查看视频
 * @param {type} 
 * @return {type} 
 */
export function getVideoMonitorDetail(data) {
    return request({
        url: 'site/Video/detail',
        method: 'post',
        data
    })
}
/**
 * @name: 设备监控列表
 * @param {type} 
 * @return {type} 
 */
export function getDeviceMonitorIndex(data) {
    return request({
        url: 'site/DeviceMonitor/index.html',
        method: 'post',
        data
    })
}
/**
 * @name: 视频分类列表
 * @param {type} 
 * @return {type} 
 */
export function getVideoMonitorClassifyList(data) {
    return request({
        url: 'site/VideoMonitor/classifyList',
        method: 'post',
        data
    })
}
/**
 * @name: 添加视频分类
 * @param {type} 
 * @return {type} 
 */
export function getVideoMonitorAddClassify(data) {
    return request({
        url: 'site/Video/addClassify',
        method: 'post',
        data
    })
}
/**
 * @name: 事件回查分析-搜索参数
 * @param {type} 
 * @return {type} 
 */
export function getSearchParams(data) {
    return request({
        url: 'site/Analysis/getSearchParams',
        method: 'post',
        data
    })
}
