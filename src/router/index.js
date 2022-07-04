import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import {Message} from 'element-ui'
import {getToken} from "@/utils/cookie"

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 公共路由
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true
    }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'hash',
    base: process.env.VUE_APP_BASE,
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});

//路由拦截器
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then((res) => {
                    router.addRoutes(res?.data?.routes)
                    next({...to, replace: true})
                }).catch(err => {
                    store.dispatch('LogOut').finally(() => {
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

export default router
