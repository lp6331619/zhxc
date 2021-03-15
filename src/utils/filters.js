/*
 * @Descripttion: 过滤器
 * @Author: Ray Huang
 * @Date: 2020-07-28 11:27:52
 * @LastEditors: Ray Huang
 * @LastEditTime: 2020-08-06 12:27:17
 */

/**
 * 对象转数组
 * @param {*} data
 */
const objToArr = (data) => {
    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            return data
        } else {
            const keys = Object.keys(data || {})
            const arr = []
            keys.map(k => {
                arr.push({
                    key: k,
                    text: data[k]
                })
            })
            return arr
        }
    }
    return []
}

const isObj = (data) => {
    return Object.prototype.toString.call(data) === '[object Object]'
}

const IsJsonString = (str) => {
    try {
        if (typeof JSON.parse(str) === 'object') {
            return true
        }
    } catch (e) {
        console.log(e)
    }
    return false
}

const exportFile = (url, params) => {
    const PARAMS = params
    var temp = document.createElement('form')
    temp.action = process.env.VUE_APP_BASE_API + url + '?_csv=1'
    temp.method = 'post'
    temp.enctype = 'application/json'
    temp.style.display = 'none'
    if (params) {
        for (var x in PARAMS) {
            var opt
            if (IsJsonString(JSON.stringify(PARAMS[x]))) {
                for (const a in PARAMS[x]) {
                    const chenOpt = document.createElement('textarea')
                    chenOpt.name = x + '[' + a + ']'
                    chenOpt.value = PARAMS[x][a]
                    temp.appendChild(chenOpt)
                }
            } else {
                opt = document.createElement('textarea')
                opt.name = x
                opt.value = PARAMS[x]
                temp.appendChild(opt)
            }
        }
    }
    document.body.appendChild(temp)
    temp.submit()
    return temp
}

export { objToArr, isObj, exportFile }
