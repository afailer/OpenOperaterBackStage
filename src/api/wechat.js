/**
 * 微信支付状态查询
 */
import request from '@/utils/request'
import {domain} from './url'

// 查询微信支付状态
export function getWechatState(order_no, type) {
    return request({
        url: `${domain}/v1/order/payinfo`,
        method: 'get',
        params: {
            order_no,
            type,
        }
    })
}
