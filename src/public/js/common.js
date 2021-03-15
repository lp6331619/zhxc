/*
 * @Descripttion: 
 * @Author: Ray Huang
 * @Date: 2020-07-06 17:35:45
 * @LastEditors: Teemor
 * @LastEditTime: 2020-10-30 09:58:23
 */
import router from '@/router'
import { isObj } from "@/utils/filters"
export default {
    // 打开新窗口
    openWindow(url, query) {
        let routeUrl = router.resolve({
            path: url,
            query: query
        })
        window.open(routeUrl.href, '_blank');
    },
    // 转换数组
    FilterArray(data) {
        if (data) {
            const box = []
            for (const i in data) {
                box.push({
                    text: data[i],
                    value: i
                })
            }
            return box
        }
    },
    // 赋值 url 参数
    toList(searchForm, otherData, cb) {
        const query = {}
        const box = Object.assign({}, searchForm, otherData)
        for (const i in box) {
            query[i] = ((data) => {
                return data ? typeof data : false
            })(box[i]) ? JSON.stringify(box[i]) : ''
        }
        router.push({
            path: router.path,
            query: query
        })
        cb && cb()
    },
    // 递归添加所有id
    familyTree(arr1, id, type) {
        const temp = []
        const forFn = function (arr, id) {
            for (var i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.id === id) {
                    temp.push(item)
                    forFn(arr1, item.pid)
                    break
                } else {
                    if (item[type || 'childs']) {
                        forFn(item[type || 'childs'], id)
                    }
                }
            }
        }
        forFn(arr1, id)
        if (temp.length) {
            const arr = []
            temp.forEach(item => {
                arr.unshift(item.id)
            })
            return arr
        }

    },
    // 判断数据类型
    objType(typeStr) {
        let typeName = ''
        switch (Object.prototype.toString.call(typeStr)) {
            case '[object String]':
                typeName = 'string';
                break;
            case '[object Number]':
                typeName = 'number';
                break;
            case '[object Boolean]':
                typeName = 'boolean';
                break;
            case '[object Undefined]':
                typeName = 'undefined';
                break;
            case '[object Object]':
                typeName = 'object';
                break;
            case '[object Array]':
                typeName = 'array';
                break;
            case '[object Null]':
                typeName = 'null';
                break;
            case '[object RegExp]':
                typeName = 'RegExp';
                break;
            case '[object Symbol]':
                typeName = 'symbol';
                break;
            case '[object JSON]':
                typeName = 'json';
                break;
            case '[object Math]':
                typeName = 'math';
                break;
            default:
                typeName = 'object';
        }
        return typeName
    }
}
