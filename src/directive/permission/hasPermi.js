/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019
 */

import store from '@/store'

export default {
    inserted(el, binding, vnode) {
        let {value} = binding
        value = typeof value == 'string' ? [value] : value
        let hasPermissions = false
        if (value && value.length > 0) {
            const all_permission = '*'
            const permissions = store.getters && store.getters.permissions
            hasPermissions = permissions.some(permission => {
                return all_permission === permission || value.includes(permission)
            })
        }
        if (!hasPermissions) {
            el.remove()
        }
    }
}