/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-21 17:46:25
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-21 18:53:07
 */
import request from '@/utils/request'
// 所有设备监控列表
export function totalDevice(data) {
    return request({
        url: 'site/Equipment/totalDevice',
        method: 'post',
        data
    })
}
