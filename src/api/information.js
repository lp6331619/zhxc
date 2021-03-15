import request from '@/utils/request'

// 设备变量配置管理列表
export function varconfiglist(data) {
    return request({
        url: 'site/Analysis/configList',
        method: 'post',
        data
    })
}
// 添加变量
export function addConfig(data) {
    return request({
        url: 'site/Equipment/addConfig',
        method: 'post',
        data
    })
}
// 编辑变量
export function editConfig(data) {
    return request({
        url: 'site/Equipment/editConfig',
        method: 'post',
        data
    })
}
// 更新变量配置显示状态
export function updConfigShow(data) {
    return request({
        url: 'site/Equipment/updConfigShow',
        method: 'post',
        data
    })
}
// 变量配置管理中的一些配置参数
export function varConfigParam(data) {
    return request({
        url: 'site/Analysis/getSearchParams',
        method: 'post',
        data
    })
}
// 获取区名列表
export function selectPartitionType(data) {
    return request({
        url: 'site/Analysis/selectPartitionType',
        method: 'post',
        data
    })
}
// 获取组名称列表
export function gatewaySelect(data) {
    return request({
        url: 'site/Analysis/gatewaySelect',
        method: 'post',
        data
    })
}

// 获取设备名列表
export function instrumentSelect(data) {
    return request({
        url: 'site/Analysis/instrumentSelect',
        method: 'post',
        data
    })
}
// 获取变量名列表
export function varlistSelect(data) {
    return request({
        url: 'site/Analysis/varlistSelect',
        method: 'post',
        data
    })
}

// 获取区名列表（添加/编辑设备变量中的）
export function getPartitionTypes(data) {
    return request({
        url: 'site/Equipment/getPartitionTypes',
        method: 'post',
        data
    })
}
// 获取组名列表-添加/编辑设备变量中的
export function getGatewayNames(data) {
    return request({
        url: 'site/Equipment/getGatewayNames',
        method: 'post',
        data
    })
}
// 获取设备名列表-添加设备变量中的逸尘凌虚 最后修改于 昨天 16:50
export function getDevNames(data) {
    return request({
        url: 'site/Equipment/getDevNames',
        method: 'post',
        data
    })
}
// 添加编辑区名
export function editPartitionType(data) {
    return request({
        url: 'site/Equipment/editPartitionType',
        method: 'post',
        data
    })
}
// 添加编辑组名
export function editGatewayName(data) {
    return request({
        url: 'site/Equipment/editGatewayName',
        method: 'post',
        data
    })
}
// 添加/编辑设备名
export function editDevName(data) {
    return request({
        url: 'site/Equipment/editDevName',
        method: 'post',
        data
    })
}
// 删除区名/设备名/组名
export function delDeviceConfig(data) {
    return request({
        url: 'site/Equipment/delDeviceConfig',
        method: 'post',
        data
    })
}
// 历史数据列表
export function historyData(data) {
    return request({
        url: 'site/Analysis/historyList.html',
        method: 'post',
        data
    })
}
// 视频分类管理列表
export function classifyList(data) {
    return request({
        url: 'site/Video/classifyList',
        method: 'post',
        data
    })
}
// 编辑视频分类
export function editClassify(data) {
    return request({
        url: 'site/Video/editClassify',
        method: 'post',
        data
    })
}
// 删除视频分类
export function delClassify(data) {
    return request({
        url: 'site/Video/delClassify',
        method: 'post',
        data
    })
}
// 添加视频分类
export function addClassify(data) {
    return request({
        url: 'site/Video/addClassify',
        method: 'post',
        data
    })
}
// 短信列表
export function smsIndex(data) {
    return request({
        url: 'system/Sms/index',
        method: 'post',
        data
    })
}
// 已发送短信列表
export function smsList(data) {
    return request({
        url: 'system/Sms/smsList',
        method: 'post',
        data
    })
}
// 新增模板
export function smsAdd(data) {
    return request({
        url: 'system/Sms/add',
        method: 'post',
        data
    })
}
// 编辑模板
export function smsEdit(data) {
    return request({
        url: 'system/Sms/edit',
        method: 'post',
        data
    })
}
// 删除模板
export function smsDel(data) {
    return request({
        url: 'system/Sms/del',
        method: 'post',
        data
    })
}
// 视频列表
export function videoMonitorIndex(data) {
    return request({
        url: 'site/Video/index',
        method: 'post',
        data
    })
}
// 添加视频
export function videoMonitorAdd(data) {
    return request({
        url: 'site/Video/add',
        method: 'post',
        data
    })
}
// 编辑视频
export function videoMonitorEdit(data) {
    return request({
        url: 'site/Video/edit.html',
        method: 'post',
        data
    })
}
// 删除视频
export function videoMonitorDel(data) {
    return request({
        url: 'site/Video/del',
        method: 'post',
        data
    })
}
// 视频同步
export function asynAllVideos(data) {
    return request({
        url: 'site/Video/asynAllVideos',
        method: 'post',
        data
    })
}

// 站点列表
export function siteIndex(data) {
    return request({
        url: 'site/Index/index',
        method: 'post',
        data
    })
}
// 添加站点
export function siteIndexAdd(data) {
    return request({
        url: 'site/Index/add',
        method: 'post',
        data
    })
}
// 编辑站点
export function siteIndexEdit(data) {
    return request({
        url: 'site/Index/edit',
        method: 'post',
        data
    })
}
// 删除站点
export function siteIndexDel(data) {
    return request({
        url: 'site/Index/del',
        method: 'post',
        data
    })
}
// 站点状态
export function siteIndexStatus(data) {
    return request({
        url: 'site/Index/status',
        method: 'post',
        data
    })
}
// 设备监控列表
export function DeviceMonitorIndex(data) {
    return request({
        url: 'site/Equipment/index.html',
        method: 'post',
        data
    })
}
// 查看视频
export function VideoDetail(data) {
    return request({
        url: 'site/Video/detail',
        method: 'post',
        data
    })
}
// 控制视频转向
export function turnDirection(data) {
    return request({
        url: 'site/Video/turnDirection',
        method: 'post',
        data
    })
}
// 控制视频转向
export function presetMove(data) {
    return request({
        url: 'site/Video/presetMove',
        method: 'post',
        data
    })
}
// 镜像翻转
export function ptzMirror(data) {
    return request({
        url: 'site/Video/ptzMirror',
        method: 'post',
        data
    })
}
// 历史数据折线图
export function HistoryEchart(data) {
    return request({
        url: 'site/Analysis/echart',
        method: 'post',
        data
    })
}
// 故障报警
export function HistoryAlarmList(data) {
    return request({
        url: 'site/Analysis/alarmList',
        method: 'post',
        data
    })
}

// 历史事件回查分析
export function EventList(data) {
    return request({
        url: 'site/Analysis/eventList',
        method: 'post',
        data
    })
}
//-------------------人脸识别相关--------------------------
//通行记录
export function accessLogList(data) {
    return request({
        url: 'site/Face_pass/accessLogList',
        method: 'post',
        data
    })
}
//获取通行记录搜索参数
export function getFpSearchParams(data) {
    return request({
        url: 'site/Face_pass/getSearchParams',
        method: 'post',
        data
    })
}

//通行记录
export function alertTemparetureList(data) {
    return request({
        url: 'site/Face_pass/alertTemperatureList',
        method: 'post',
        data
    })
}
//通行记录曲线
export function temparetureEchart(data) {
    return request({
        url: 'site/Face_pass/temparetureEchart',
        method: 'post',
        data
    })
}
//同步设备信息
export function asynDevice(data) {
    return request({
        url: 'site/Face_pass/asynDevice',
        method: 'post',
        data
    })
}
//获取设备列表
export function deviceList(data) {
    return request({
        url: 'site/Face_pass/deviceList',
        method: 'post',
        data
    })
}
//获取设备查询参数
export function deviceSearchParams(data) {
    return request({
        url: 'site/Face_pass/deviceSearchParams',
        method: 'post',
        data
    })
}
//获取设备查询参数
export function updDeviceLocation(data) {
    return request({
        url: 'site/Face_pass/updDeviceLocation',
        method: 'post',
        data
    })
}

//添加设备
export function addDevice(data) {
    return request({
        url: 'site/Face_pass/addDevice',
        method: 'post',
        data
    })
}

//修改设备
export function updDevice(data) {
    return request({
        url: 'site/Face_pass/updDevice',
        method: 'post',
        data
    })
}
