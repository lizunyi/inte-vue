import { getToken, setToken, removeToken } from '@/utils/cookie'
import { constantRoutes } from '@/router'

const login = {
    state: {
        token: getToken(),
        name: '',
        roles: [],
        permissions: [],
        routes: [],
        tiledRoutes: [],
        moduleList: []
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        },
        SET_ROUTES: (state, routes) => {
            state.routes = constantRoutes.concat(routes)
        },
        SET_TILEDROUTES: (state, routes) => {
            state.tiledRoutes = routes
        },
        SET_MODULE: (state, moduleList) => {
            state.moduleList = moduleList
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                axios.reqPost('/user/login', {
                    username, password
                }).then(res => {
                    if (res.code == 0) {
                        commit('SET_NAME', username)
                        setToken('username', username)
                        resolve(res)
                    } else {
                        reject(res.msg)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.reqPost('/module/search').then(res => {
                    commit('SET_MODULE', res?.data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.reqGet('/user/logout').then(() => {
                    commit('SET_MODULE', null)
                    removeToken('username')
                    resolve()
                }).catch(error => {
                    reject(error)
                }).finally(() => {
                    removeToken('username')
                })
            })
        }
    }
}

export default login
