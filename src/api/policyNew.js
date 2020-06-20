import request from '@/utils/request'
import {domain} from './url'


// 获取用户信息
export function postSearchUserNew(params) {
    return request({
        url: `${domain}/ebao_policy/user`,
        method: 'post',
        data: params,
    })
}

// 获取保单详情
export function getPolicyViewNew(policy_id) {
    return request({
        url: `${domain}/ebao_policy/view`,
        method: 'get',
        params: {
            'policy_id': policy_id
        }
    })
}

// 获取保单列表
export function getPolicyListNew(user_id, page = 1, searchData) {
    let params = {
        'user_id': user_id,
        'page_size': 10,
        'page': page,
    }
    if (searchData && searchData.exactFlag) {
        Object.assign(params, searchData)
        delete params.exactFlag
    }
    return request({
        url: `${domain}/ebao_policy/list`,
        method: 'get',
        params: params
    })
}

// 获取用户订单列表
export function getOrderPageNew(user_id, page, searchData) {
    let params = {
        'user_id': user_id,
        'page_size': 10,
        'page': page,
    }
    if (searchData && searchData.exactFlag) {
        Object.assign(params, searchData)
        delete params.exactFlag
    }
    return request({
        url: `${domain}/order_new/order`,
        method: 'get',
        params: params
    })
}

// 异常订单列表
export function getEntrustFailedNew(user_id, searchData) {
    let params = {
        'user_id': user_id,
        'page': 1,
        'page_size': 20,
    }
    if (searchData && searchData.exactFlag) {
        Object.assign(params, searchData)
        delete params.exactFlag
    }
    return request({
        url: `${domain}/order/user/entrust/failed/list`,
        method: 'get',
        params: params
    })
}

// 获取保单缴费记录（新）
export function getPolicyPaymentNew(policy_id, page = 1) {
    return request({
        url: `${domain}/order_new/payment`,

        // url:'http://172.16.60.110:8080/order_new/payment_list',
        method: 'get',
        params: {
            'policy_id': policy_id,
            'page_size': 20,
            'page': page,
        }
    })
}

// 订单查看详情
export function getOrderInfoNew(trade_no) {
    return request({
        url: `${domain}/order_new/orderdetail`,
        method: 'get',
        params: {
            trade_no,
        }
    })
}

// 订单退款
export function postOrderRefundNew(trade_no, refund_type,amount) {
    return request({
        url: `${domain}/order_new/refund`,
        method: 'get',
        params: {
            'trade_no': trade_no,
            'refund_type': refund_type,
            'amount': amount
        },
    })
}

// 获取异常记录
export function getPolicyFailedList(policy_id) {
    return request({
        url: `${domain}/policy/failedList`,
        method: 'get',
        params: {
            'policy_id': policy_id,
        }
    })
}
// 获取保单系统操作记录
export function getSysLogList(policy_id) {
    return request({
        url: `${domain}/policy/policyLogs`,
        method: 'get',
        params: {
            'policy_id': policy_id,
        }
    })
}
// 重新投保重试
export function retryInsure(policy_id) {
    return request({
        url: `${domain}/policy/retryInsure`,
        method: 'get',
        params: {
            'policy_id': policy_id,
        }
    })
}
