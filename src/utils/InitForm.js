/*
 * @Descripttion: 表单数据整理
 * @Author: Ray Huang
 * @Date: 2020-07-27 14:30:32
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-07-29 15:15:02
 */
const getRequiredData = (message, type, trigger = 'change') => {
    return {
        message,
        trigger,
        required: true,
        ...type ? { type } : {}
    }
}
/**
 * 必填
 * @param {*} message
 * @param {*} trigger
 */
const _required = (message, trigger = 'change') => {
    return getRequiredData(message, undefined, trigger)
}
/**
 * 必填(时间)
 * @param {*} message
 */
const _requiredByDate = (message) => {
    return getRequiredData(message, 'date')
}
/**
 * 数字
 * @param {*} message
 */
const _number = (message) => {
    return {
        message,
        type: 'number'
    }
}
/**
 * 自定义
 * @param {*} validator
 * @param {*} trigger
 */
const _custom = (validator, trigger = 'change') => {
    return {
        validator,
        trigger
    }
}
/**
 * 获取表单字段及规则
 * @param {*} data 表单数据
 */
const _getFormAndRules = (data) => {
    const form = {}
    const rules = {}
    if (data) {
        const keys = Object.keys(data)
        keys.map(k => {
            const d = data[k]
            form[k] = d[0]
            if (d[1]) {
                rules[k] = d[1]
            }
        })
    }
    return {
        form,
        rules
    }
}
/**
 * 公共规则
 * @param {
 * message 消息
 * type 类型
 * trigger 事件
 * required 是否必填
 * min 最小值
 * max 最大值
 * validator 自定义校验方法
 * } param 验证参数
 */
const _rule = ({ message, type, trigger, required, min, max, validator }) => {
    const rule = {}
    if (message) {
        rule['message'] = message
    }
    if (type) {
        rule['type'] = type
    }
    if (trigger) {
        rule['trigger'] = trigger
    }
    if (required) {
        rule['required'] = required
    }
    if (min) {
        rule['min'] = min
    }
    if (max) {
        rule['max'] = max
    }
    if (validator) {
        rule['validator'] = validator
    }
    return rule
}
export { _required, _requiredByDate, _number, _custom, _getFormAndRules, _rule }
