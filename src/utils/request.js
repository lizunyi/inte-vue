import axios from 'axios'

import { Message } from 'element-ui'
import router from '@/router'

const axo = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, timeout: 30000
})

window.axios = {
    before: function(cb) {
        cb()
        return this
    },
    reqComm: function(url, data = {}, type = 'json', method = 'post') {
        return axo.request({
            url: url,
            method: method,
            headers: {
                'Content-Type': ({
                    'form': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'json': 'application/json;charset=utf-8',
                    'multipart': 'multipart/form-data'
                }[type])
            },
            data: ({
                'form': params(data),
                'json': data,
                'multipart': data
            }[type])
        })
    },
    reqGet: function(url, data = null) {
        return this.reqComm(url + (data ? '?' + params(data) : ''), 'form', 'get')
    },
    reqPost: function(url, data, type) {
        return this.reqComm(url, data, type, 'post')
    }
}

// request拦截器
axo.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)
    return Promise.reject(error || '服务器异常')
})

// 响应拦截器
axo.interceptors.response.use(res => {
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data
    }
    let status
    if (res.data.code == 0) {
        status = 200
    } else if (res.status != 200) {
        status = res.status
    }

    if (status == 500) {
        console.log(res.data.msg)
        return Promise.reject(res.data.msg || '服务器异常')
    } else {
        return res.data
    }
}, error => {
    if (error.response.status == 401) {
        Message.error('登录超时，请重新登录')
        setTimeout(()=>{
            router.push('/login')
        },2000)
        return Promise.reject('登录超时，请重新登录')
    } else if (error.response.status == 403) {
        Message.error('没有权限')
        return Promise.reject('没有权限')
    }
    return Promise.reject('服务器异常')
})
