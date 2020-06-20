import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// service.defaults.withCredentials = true
// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = "Bearer " + getToken() // 让每个请求携带自定义token
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 0) {
            /**
             * 登录成功的时候code也会返回200
             * 要和后端约定好 错误的code 不要使用200
             **/
            if (res.code === 200) {
                Message({
                    message: '登录成功',
                    type: 'success',
                    duration: 3 * 1000
                })
                return res
            } else if (res.code === 999) {  // 新增11.13 权限不足 非超级管理员 直接跳到 首页
                location.href = '/'
                return
            } else {
                Message({
                    message: res.message,
                    type: 'error',
                    duration: 3 * 1000
                })
                return Promise.reject(res.message)
            }
        } else {
            let _temp = response.headers
            if (_temp && _temp.authorization && _temp.authorization.match(/Bearer (\S*)/)[1]) {
                let _token = _temp.authorization.match(/Bearer (\S*)/)[1]
                if (_token !== getToken()) {
                    setToken(_token)
                }
            }
            return res
        }
    },
    error => {
        let status = error.response.status
        // console.log(1, error)
        // console.log(2, JSON.stringify(error))
        // console.log(3, JSON.stringify(error.response.data.message))
        if (status === 401) {
            let a = window.location.hash
            let curUrl = a.split('?')[0]
            //登录页面做特殊处理
            if (curUrl === '#/login') {
                Message({
                    // message: 'incorrect username / password',
                    message: error.response.data.message,
                    type: 'error',
                    duration: 3 * 1000
                })
            } else {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                }).catch(() => {
                    Message({
                        message: '已取消',
                        type: 'info',
                        duration: 2 * 1000
                    })
                })
            }
            return Promise.reject(error)
        } else if (status === 403) {
            Message({
                message: '权限不足',
                type: 'error',
                duration: 2 * 1000
            })
            return Promise.reject(error)
        } else {
            Message({
                message: '网络错误，请稍后重试或联系开发人员',
                type: 'error',
                duration: 2 * 1000
            })
            return Promise.reject(error)
        }
    }
)

export default service
