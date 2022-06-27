/**
 * 通用js方法封装处理
 * Copyright (c) 2019
 */

window.parseDate = function (time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '')
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate()
    }
    const date_str = format.replace(/{(y|m|d)+}/g, (result, key) => {
        let value = formatObj[key]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return date_str
}

window.parseTime = function (time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

window.params = function (params) {
    let result = []
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        if (value ?? '') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] ?? '') {
                        let params = propName + '[' + key + ']'
                        result.push(encodeURIComponent(params) + '=' + encodeURIComponent(value[key]))
                    }
                }
            } else {
                result.push(encodeURIComponent(propName) + '=' + encodeURIComponent(value))
            }
        }
    }
    return result.join('&')
}


/***
 * 数组转KV
 * @param arr
 * @returns {{}}
 */
window.arr2kv = function (arr = []) {
    let map = {}
    arr.map(x => {
        let val = String(x.value)
        if (val.includes(',')) {
            val.split(',').map(y => {
                map[y] = x.label
            })
        } else {
            map[val] = x.label
        }
    })
    return map
}

/***
 * 数组转map
 * @param arr
 * @returns {{}}
 */
window.arr2map = function (arr = [], keyName, valueName) {
    let map = {}
    arr.map(x => {
        let key = String(x[keyName])
        let val = x[valueName]
        map[key] = val
    })
    return map
}

/***
 * 公共表单验证
 * @param map
 * @param valueProp
 * @returns {[]}
 */
function formValid(map, valueProp) {
    let obj = {}
    for (let key in map) {
        let item = map[key]
        if (!item.valid || item.valid.length == 0) {
            continue
        }
        item.valid.map(x => {
            obj[x] = obj[x] || []
            let val = getValueByType(item[valueProp])
            if (x == 'required') {
                if (!val) obj[x].push(key)
            }
            if (x == 'number') {
                if (val && isNaN(val)) obj[x].push(key)
            }
        })
    }
    let arr = []
    let keys = []
    for (let type in obj) {
        if (!obj[type] || obj[type].length == 0) {
            continue
        }
        obj[type].map(x => {
            if (!keys.includes(x)) {
                keys.push(x)
            }
        })
        switch (type) {
            case 'required':
                arr.push(obj[type].map(x => map[x].label).join('、') + '不能为空！')
                break
            case 'number':
                arr.push(obj[type].map(x => map[x].label).join('、') + '请输入正确的数字格式！')
                break
        }
    }
    return {
        keys: keys,
        tips: arr.length > 0 ? arr : null
    }
}

function getValueByType(val) {
    let v = val
    if (v) {
        let type = isArray(v) ? 'array' : (typeof v == 'object' ? 'object' : 'string')
        if (type == 'array') {
            v = String(v)
        } else if (type == 'object') {
            v = JSON.stringify(v) == '{}' ?? ''
        } else if (type == 'string') {
            v = String(v)
        }
        v = v.trim()
    }
    return v
}

/***
 * 比较函数
 * @type
 * fixed 使用get时每次都返回原值
 */
window.initCompare = function () {
    return {
        map: {},
        reset: function () {
            this.map = {}
        },
        common: function ({key, val, label, valid, fixed = false, logger = false}) {
            let item = this.map[key]
            if (!item) {
                this.map[key] = {
                    key: key,
                    label: label,
                    oldVal: val,
                    valid: valid,
                    fixed: fixed,
                    logger: logger
                }
            } else {
                item.newVal = val
                let oldVal = getValueByType(item.oldVal)
                let newVal = getValueByType(item.newVal)
                if (oldVal != newVal) {
                    item['tip'] = item['label'] + '由【' + oldVal + '】更改为【' + val + '】'
                }
            }
        },
        set: function (arr) {
            arr.map(x=>{
                this.common(deepClone(x))
            })
            for (let key in this.map) {
                let item = this.map[key]
                if (item.tip) return true
            }
            return false
        },
        get: function () {
            let obj = {}
            for (let key in this.map) {
                let item = this.map[key]
                if (item.fixed) {
                    obj[key] = item.newVal ?? item.oldVal
                } else {
                    if (item.tip) {
                        obj[key] = item.newVal
                    }
                }
            }
            return obj
        },
        log: function () {
            let arr = []
            for (let key in this.map) {
                let item = this.map[key]
                if (item.tip) {
                    arr.push(item.tip)
                } else if (item.logger) {
                    arr.push(item['label'] + '值为【' + (getValueByType(item.newVal) || '') + '】')
                }
                item.oldVal = item.newVal
                item.newVal = null
            }
            return arr.length > 0 ? arr : null
        },
        valid: function () {
            return formValid(this.map, 'newVal')
        }
    }
}

/***
 * 计算累和函数
 */
window.sum = function (numberArray = []) {
    let sum = 0
    numberArray.map((x = 0) => {
        if (isNaN(x)) {
            x = 0
        } else if (typeof x != 'number') {
            x = parseFloat(x)
        }
        sum += x
    })
    return sum
}

Array.prototype.distinct = function () {
    let arr = this
    let result = []
    arr?.filter(x => x).map(x => !result.includes(x) ? result.push(x) : '')
    return result
}

/***
 * 自定义弹出框
 */
export function openDialog(title, resource, config) {
    this.active.dialog = Object.assign({
        title: title,
        list: typeof resource == 'string' ? [resource] : resource,
        visible: true
    }, config || {})
}

/***
 * 重新渲染
 * @param target
 * @param key
 * @param val
 */
export function reRender(target, key, val) {
    this.$set(target, key, undefined)
    this.$set(target, key, val)
}
