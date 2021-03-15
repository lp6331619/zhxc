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
        url: 'device/Mdevice/getList',
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
        url: 'device/Mdevice/saveEdit',
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
        url: 'device/Mdevice/show.html',
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
        url: 'device/Mdevice/getWriteVarList',
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
        url: 'device/Mdevice/addControl',
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
        url: 'device/Mdevice/checkPass',
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
        url: 'device/Mdevice/realdataSelect.html',
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
        url: 'device/Mdevice/del',
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
        url: 'device/Mdevice/getVarConfigs',
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
 * @name:获取区名列表
 * @param {type}
 * @return {type}
 */
export function selectPartitionType(data) {
    return request({
        url: 'device/Mdevice/selectPartitionType.html',
        method: 'post',
        data
    })
}
/**
 * @name:获取组名列表
 * @param {type}
 * @return {type}
 */
export function getGroupNames(data) {
    return request({
        url: 'device/Mdevice/getGroupNames.html',
        method: 'post',
        data
    })
}
/**
 * @name:获取设备名列表
 * @param {type}
 * @return {type}
 */
export function getDevNames(data) {
    return request({
        url: 'device/Mdevice/getDevNames.html',
        method: 'post',
        data
    })
}
/**
 * @name:获取变量名列表
 * @param {type}
 * @return {type}
 */
export function getVarAliass(data) {
    return request({
        url: 'device/Mdevice/getVarAliass.html',
        method: 'post',
        data
    })
}

/**
 * @name:获取所有的设备列表
 * @param {type}
 * @return {type}
 */
export function getTotalDevice(data) {
    return request({
        url: 'device/Mdevice/getTotalDevice.html',
        method: 'post',
        data
    })
}

/**
 * @name:获取设备历史记录折线图
 * @param {type}
 * @return {type}
 */
export function getEchart(data) {
    return request({
        url: 'device/Mdevice/echart.html',
        method: 'post',
        data
    })
}

// 历史数据列表
export function historyData(data) {
    return request({
        url: 'device/Mdevice/historyList.html',
        method: 'post',
        data
    })
}