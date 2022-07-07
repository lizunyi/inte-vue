import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import { getToken } from '@/utils/cookie'

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
        path: '',
        children: [{
            name:'login',
            component: () => import('@/views/login'),
            path: '/login'
        }],
        hidden: true
    },
    {
        component: Layout2,
        path: '',
        children: [{
            name:'manager',
            component: () => import('@/views/manager'),
            path: '/manager'
        }],
        hidden: true
    },
    {
        component: Layout,
        path: '',
        children: [{
            name:'index',
            component: () => import('@/views/index'),
            path: '/index'
        }],
        hidden: true
    }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'hash',
    base: process.env.VUE_APP_BASE,
    routes: constantRoutes
})

//路由拦截器
const whiteList = ['/login', 'logout']
router.beforeEach((to, from, next) => {
    if (getToken('username')) {
        if (store.getters.moduleList === 0) {
            store.dispatch('GetInfo').then((res) => {
                next({ ...to, replace: true })
            }).catch(err => {
                store.dispatch('LogOut').finally(() => {
                    next({ path: '/login' })
                })
            })
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

export default router
