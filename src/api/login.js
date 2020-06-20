import request from '@/utils/request'
import {domain} from './url'
// console.log(host)
// let domain = ''
// if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === 'test') {
//     domain = 'http://insure-admin-api.qsebao.com'
// } else {
//     domain = 'https://insure-admin-api.qsebao.com'
// }

export function login(username, password) {
    return request({
        url: `${domain}/login`,
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: `${domain}/admin/user/info`,
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

// export function authHello() {
//     return request({
//         url: '/auth/hello',
//         method: 'get',
//     })
// }
