import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import {Message} from 'element-ui'
import {getToken} from "@/utils/cookie"

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Layout2 from '@/layout/layout2'

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
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true
    },
    {
        component: Layout2,
        path: '/',
        children: [{
            component: () => import('@/views/manager'),
            path: '/manager'
        }],
        hidden: true
    },
    {
        component: Layout,
        path: '/',
        children: [{
            component: () => import('@/views/index'),
            path: '/index'
        }],
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
const whiteList = ['/login', '/index', '/manager']
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
                    store.dispatch('LogOut').then(() => {
                        Message.error(err)
                        next({path: '/'})
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

export default router
