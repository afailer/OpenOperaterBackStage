import request from '@/utils/request'
import {domain} from './url'

// 获取用户信息
export function postSearchUser(params) {
    return request({
        url: `${domain}/search/user`,
        method: 'post',
        data: params,
    })
}

// 获取保单详情
export function getPolicyView(policy_id) {
    return request({
        url: `${domain}/policy/view`,
        method: 'get',
        params: {
            'policy_id': policy_id
        }
    })
}

// 获取保单列表
export function getPolicyList(user_id, page = 1, searchData) {
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
        url: `${domain}/policy/list`,
        method: 'get',
        params: params
    })
}

// 获取用户订单列表
export function getOrderPage(user_id, page, searchData) {
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
        url: `${domain}/order/user/list`,
        method: 'get',
        params: params
    })
}

// 异常订单列表
export function getEntrustFailed(user_id, searchData) {
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

// 获取保单缴费记录
export function getPolicyPayment(policy_id) {
    return request({
        url: `${domain}/policy/payment`,
        method: 'get',
        params: {
            'policy_id': policy_id,
        }
    })
}

// 订单查看详情
export function getOrderInfo(trade_no) {
    return request({
        url: `${domain}/order/info/number/${trade_no}`,
        method: 'get',
    })
}

// 订单退款
export function postOrderRefund(id, type, amount) {
    return request({
        url: `${domain}/v1/refund/apply`,
        method: 'post',
        data: {
            'id': id,
            'type': type,
            'amount': amount
        },
    })
}

// 异常流水退款
export function abnormalPostRefund(id) {
    return request({
        url: `${domain}/v1/refund/entrust/apply`,
        method: 'post',
        data: {
            'entrust_payed_id':id
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

// 查询用户退款信息
export function getRefundList(type, key, page = 1, page_size = 10) {
    return request({
        url: `${domain}/refund/list`,
        method: 'get',
        params: {
            type,
            key,
            page,
            page_size,
        }
    })
}

// 查询退款信息详情
export function getRefundDetail(policy_id) {
    return request({
        url: `${domain}/refund/details`,
        method: 'get',
        params: {
            policy_id,
        }
    })
}

// 查询退款信息详情
export function getRefundQuery(refund_no) {
    return request({
        url: `${domain}/refund/query`,
        method: 'get',
        params: {
            refund_no,
        }
    })
}
