import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// service.defaults.withCredentials = true
// request拦截器
service.interceptors.request.use(
    config => {
        config.headers['Qsc-Token'] = 'rMgP0?05i:6>Vur^'
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)
export default service