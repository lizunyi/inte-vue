import {getToken, removeToken} from '@/utils/cookie'
import {constantRoutes} from "@/router"
import Layout from "@/layout";

function cycle(x) {
    if (x.component == "Layout") {
        x.component = Layout
    } else if (x.component) {
        x.component = loadView(`${x.component}`)
    }
    x?.children?.map(y => {
        return cycle(y)
    })
    return x
}

function transferRoutes(routes) {
    function cycle(tiledRoutes, x, paths = [], names = [], titles = []) {
        //path路径
        paths.push(x.path)
        //name路径
        names.push(x.name)
        //title路径
        titles.push(x.meta.title)

        tiledRoutes.push(
            (function ({name, path, title = x.meta.title}) {
                return {name, path, title, names, paths, titles}
            })(x)
        )

        x?.children?.map(y => {
            return cycle(tiledRoutes, y, Object.assign([], paths), Object.assign([], names), Object.assign([], titles))
        })
    }

    let tiledRoutes = []
    routes?.map(x => {
        cycle(tiledRoutes, x)
    })
    return tiledRoutes
}

export const loadView = (view) => {
    if (process.env.NODE_ENV === 'development') {
        return (resolve) => require([`@/views/${view}`], resolve)
    } else {
        return () => import(`@/views/${view}`)
    }
}

const login = {
    state: {
        token: getToken(),
        name: '',
        roles: [],
        permissions: [],
        routes: [],
        tiledRoutes: []
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
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            const username = userInfo.username
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                axios.reqPost('/login', {
                    username, password
                }, 'form').then(res => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.reqPost('/userInfo', {}, 'form').then(res => {
                    let routes = res?.data?.routes
                    routes?.map(x => {
                        return cycle(x)
                    })
                    commit('SET_NAME', res?.data?.name)
                    commit('SET_ROLES', res?.data?.roles)
                    commit('SET_ROUTES', res?.data?.routes)
                    commit('SET_TILEDROUTES', transferRoutes([...routes]))
                    commit('SET_PERMISSIONS', res?.data?.permissions)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.reqGet('/logout').then(() => {
                    commit('SET_NAME', null)
                    commit('SET_ROLES', null)
                    commit('SET_ROUTES', null)
                    commit('SET_TILEDROUTES', null)
                    commit('SET_PERMISSIONS', null)
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default login
