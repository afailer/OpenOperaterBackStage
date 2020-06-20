import request from '@/utils/request'
import {domain} from './url'

// console.log('环境变量', process.env)
let refund_money
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === 'test') {
    refund_money = 1
}else {
    refund_money = 1000
}

// 获取爱心保用户信息
export function postAxbSearchUser(params) {
    return request({
        url: `${domain}/search/axb/user`,
        method: 'post',
        data: params,
    })
}

// 获取爱心保订单信息
export function postAxbSearchOrder(qsc_id) {
    return request({
        url: `${domain}/search/axb/order`,
        method: 'post',
        data: {
            'qsc_id': qsc_id,
        },
    })
}

// 爱心保退款
export function postAxbRefund(qsc_id, trade_no) {
    return request({
        url: `${domain}/order/axb/refund`,
        method: 'post',
        data: {
            'user_id': qsc_id,
            'trade_no': trade_no,
            'refund_money': refund_money
        }
    })
}
