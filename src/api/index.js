/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-28 16:16:44
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-05 16:53:52
 */
import request from '@/utils/request'
// 获取地图打点数据列表逸尘凌虚 最后修改于 09-11 09:41
export function getPointList(data) {
    return request({
        url: 'system/index/getPointList.html',
        method: 'post',
        data
    })
}
// 摄像头在线情况统计
export function getVideoOnlineCount(data) {
    return request({
        url: 'system/index/videoOnlineCount',
        method: 'post',
        data
    })
}
// 最新设备变量数据
export function getRecentVarData(data) {
    return request({
        url: 'system/index/recentVarData',
        method: 'post',
        data
    })
}
// 站点任务合格情况
export function getEquipmentTaskCount(data) {
    return request({
        url: 'system/index/getEquipmentTaskCount',
        method: 'post',
        data
    })
}
// 巡检计划执行情况
export function getPlanCheckInfo(data) {
    return request({
        url: 'system/index/getPlanCheckInfo',
        method: 'post',
        data
    })
}
// 最近7天项目计划执行情况
export function getRecentItemCount(data) {
    return request({
        url: 'system/index/getRecentItemCount',
        method: 'post',
        data
    })
}
// 巡检结果不合格列表
export function failNotice(data) {
    return request({
        url: 'system/index/failNotice',
        method: 'post',
        data
    })
}
// 最新报警数据
export function recentAlarmData(data) {
    return request({
        url: 'system/index/recentAlarmData',
        method: 'post',
        data
    })
}
// 获取默认经纬度
export function defaultParams(data) {
    return request({
        url: 'system/index/defaultParams',
        method: 'post',
        data
    })
}
// 今日新增
export function todayIncrease(data) {
    return request({
        url: 'system/index/todayIncrease',
        method: 'post',
        data
    })
}
// 设备最近运行情况
export function recentVarCount(data) {
    return request({
        url: 'system/index/recentVarCount',
        method: 'post',
        data
    })
}
//假数据制造
export function getPieData(data) {
    return request({
        url: 'system/index/getPieData',
        method: 'post',
        data
    })
}
//柱状图
export function getBarData(data) {
    return request({
        url: 'system/index/getBarData',
        method: 'post',
        data
    })
}
//
export function getAlarmData(data) {
    return request({
        url: 'system/index/getAlarmData',
        method: 'post',
        data
    })
}
//视频监控链接获取
export function getVideoUrl(data) {
    return request({
        url: 'system/index/getVideoUrl',
        method: 'post',
        data
    })
}
