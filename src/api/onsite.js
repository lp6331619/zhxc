import request from '@/utils/request'
// 站点列表
export function equipmentGetTasks(data) {
    return request({
        url: 'inspection/Equipment/getTasks',
        method: 'post',
        data
    })
}
// 站点列表
export function equipmentIndex(data) {
    return request({
        url: 'inspection/Equipment/index',
        method: 'post',
        data
    })
}
// 编辑站点
export function equipmentEdit(data) {
    return request({
        url: 'inspection/Equipment/edit',
        method: 'post',
        data
    })
}
// 新增站点
export function equipmentAdd(data) {
    return request({
        url: 'inspection/Equipment/add',
        method: 'post',
        data
    })
}
// 删除站点
export function equipmentDel(data) {
    return request({
        url: 'inspection/Equipment/del',
        method: 'post',
        data
    })
}
// 修改站点状态
export function equipmentStatus(data) {
    return request({
        url: 'inspection/Equipment/status',
        method: 'post',
        data
    })
}
// 复制乡村站点
export function equipmentCopyEquipment(data) {
    return request({
        url: 'inspection/Equipment/copyEquipment',
        method: 'post',
        data
    })
}
// 管理计划：站点计划列表
export function equipmentPlanList(data) {
    return request({
        url: 'inspection/Equipment/planList',
        method: 'post',
        data
    })
}
// 获取站点已选任务列表
export function equipmentGetSelectTasks(data) {
    return request({
        url: 'inspection/Equipment/getSelectTasks',
        method: 'post',
        data
    })
}
// 乡村站点-管理任务-保存任务
export function equipmentAddTask(data) {
    return request({
        url: 'inspection/Equipment/addTask',
        method: 'post',
        data
    })
}
// 乡村站点-管理计划-编辑
export function equipmentGetEquipmentPlan(data) {
    return request({
        url: 'inspection/Equipment/getEquipmentPlan',
        method: 'post',
        data
    })
}
// 站点-计划-执行历史-巡检结果-统计
export function equipmentGetPlanResultCount(data) {
    return request({
        url: 'inspection/Inspection/getPlanResultCount',
        method: 'post',
        data
    })
}
// 站点计划管理：添加计划逸
export function equipmentAddPlan(data) {
    return request({
        url: 'inspection/Equipment/addPlan',
        method: 'post',
        data
    })
}
// 站点管理计划：计划编辑
export function equipmentEditPlan(data) {
    return request({
        url: 'inspection/Equipment/editPlan',
        method: 'post',
        data
    })
}
// 站点计划管理：删除计划
export function equipmentDelPlan(data) {
    return request({
        url: 'inspection/Equipment/delPlan',
        method: 'post',
        data
    })
}
// 单个计划执行历史
export function equipmentPlanHistory(data) {
    return request({
        url: 'inspection/Equipment/planHistory',
        method: 'post',
        data
    })
}
// 巡检结果记录列表
export function equipmentPlanListResult(data) {
    return request({
        url: 'inspection/Inspection/planListResult',
        method: 'post',
        data
    })
}
// 管理负责人：获取已选负责人
export function inspectionEditUsers(data) {
    return request({
        url: 'inspection/Inspection/editUsers',
        method: 'post',
        data
    })
}
// 站点导出模板
export function inspectionExportXlsx(data) {
    return request({
        url: 'inspection/Inspection/exportXlsx',
        method: 'post',
        data
    })
}
// 批量导入巡检项目数据
export function inspectionImportBatch(data) {
    return request({
        url: 'inspection/Inspection/importBatch',
        method: 'post',
        data
    })
}
// 巡检项目列表
export function inspectionItems(data) {
    return request({
        url: 'inspection/Inspection/items',
        method: 'post',
        data
    })
}
// 添加巡检项目
export function inspectionAddItem(data) {
    return request({
        url: 'inspection/Inspection/addItem',
        method: 'post',
        data
    })
}
// 巡检项目编辑
export function inspectionSaveEditItem(data) {
    return request({
        url: 'inspection/Inspection/saveEditItem',
        method: 'post',
        data
    })
}
// 巡检项目编辑：获取填写方式
export function inspectionGetResultTp(data) {
    return request({
        url: 'inspection/Inspection/getResultTp',
        method: 'get',
        params: data
    })
}
// 获取巡检项目编辑信息
export function inspectionEditItem(data) {
    return request({
        url: 'inspection/Inspection/editItem',
        method: 'get',
        params: data
    })
}
// 删除巡检项目
export function inspectionDelItem(data) {
    return request({
        url: 'inspection/Inspection/delItem',
        method: 'post',
        data
    })
}
// 任务列表
export function inspectionTaskList(data) {
    return request({
        url: 'inspection/Inspection/taskList',
        method: 'post',
        data
    })
}
// 添加任务
export function inspectionAddTask(data) {
    return request({
        url: 'inspection/Inspection/addTask',
        method: 'post',
        data
    })
}
// 获取任务详情
export function inspectionEditTask(data) {
    return request({
        url: 'inspection/Inspection/editTask',
        method: 'post',
        data
    })
}
// 任务编辑
export function inspectionSaveTaskEdit(data) {
    return request({
        url: 'inspection/Inspection/saveTaskEdit',
        method: 'post',
        data
    })
}
// 删除任务
export function inspectionDelTask(data) {
    return request({
        url: 'inspection/Inspection/delTask',
        method: 'post',
        data
    })
}
// 任务列表-管理乡村站点
export function inspectionEditEquipment(data) {
    return request({
        url: 'inspection/Inspection/editEquipment',
        method: 'post',
        data
    })
}
// 管理乡村站点：保存
export function inspectionSaveEquipmentt(data) {
    return request({
        url: 'inspection/Inspection/saveEquipment',
        method: 'post',
        data
    })
}
// 根据部门ID获取用户
export function inspectionGetUsers(data) {
    return request({
        url: 'inspection/Inspection/getUsers',
        method: 'post',
        data
    })
}
// 保存管理负责人
export function inspectionSaveInspectors(data) {
    return request({
        url: 'inspection/Inspection/saveInspectors',
        method: 'post',
        data
    })
}
// 管理计划-执行历史-图片列表
export function inspectionPictureList(data) {
    return request({
        url: 'inspection/Inspection/pictureList',
        method: 'post',
        data
    })
}
// 报表管理-报告清单
export function inspectionPlanList(data) {
    return request({
        url: 'inspection/Inspection/planList',
        method: 'post',
        data
    })
}
// 运维信息列表
export function operationIndex(data) {
    return request({
        url: 'inspection/Operation/index',
        method: 'post',
        data
    })
}
// 运维信息添加
export function operationAdd(data) {
    return request({
        url: 'inspection/Operation/add',
        method: 'post',
        data
    })
}
// 运维信息编辑
export function operationEdit(data) {
    return request({
        url: 'inspection/Operation/edit',
        method: 'post',
        data
    })
}
// 运维信息删除
export function operationDel(data) {
    return request({
        url: 'inspection/Operation/del',
        method: 'post',
        data
    })
}
// 运维信息删除
export function operationDetail(data) {
    return request({
        url: 'inspection/Operation/detail',
        method: 'post',
        data
    })
}
// 事件类型列表
export function typeList(data) {
    return request({
        url: 'inspection/Operation/typeList',
        method: 'post',
        data
    })
}
// 添加事件类型
export function addType(data) {
    return request({
        url: 'inspection/Operation/addType',
        method: 'post',
        data
    })
}
// 事件类型编辑
export function editType(data) {
    return request({
        url: 'inspection/Operation/editType',
        method: 'post',
        data
    })
}
// 事件类型删除
export function delType(data) {
    return request({
        url: 'inspection/Operation/delType',
        method: 'post',
        data
    })
}
