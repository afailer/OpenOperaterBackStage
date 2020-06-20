/**
 * 优惠券信息
 */
import request from '@/utils/request'
import {domain} from './url'

// 查询用户退款信息
export function getCouponList(type, key, page = 1) {
    return request({
        url: `${domain}/coupon/list`,
        method: 'get',
        params: {
            type,
            key,
            page,
        }
    })
}


export function getCouponDetail(coupon_id) {
    return request({
        url: `${domain}/coupon/details`,
        method: 'get',
        params: {
            coupon_id,
        }
    })
}
