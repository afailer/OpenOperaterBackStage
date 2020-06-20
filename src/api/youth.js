import request from '@/utils/request'
import {domain} from './url'



// 获取年轻保用户基本信息
export function getYouthUserInfo(userId) {
    return request({
        url: `${domain}/youth/getUserInfo`,
        method: 'get',
        params: {
            userId,
        },
    })
}

// 获取年轻保用户保单信息
export function getYouthPolicyList(user_id) {
    return request({
        url: `${domain}/search/young/policy`,
        method: 'post',
        data: {
            'user_id': user_id,
        }
    })
}

// 获取年轻保用户保费奖励列表
export function getYouthPremiumDetail(userId, page) {
    return request({
        url: `${domain}/youth/getPremiumDetails`,
        method: 'get',
        params: {
            'userId': userId,
            'currentPage': page,
            'pageSize': 10,
        }
    })
}

// 获取用户步数列表
export function getYouthUserStep(userId, page) {
    return request({
        url: `${domain}/youth/getUserSteps`,
        method: 'get',
        params: {
            'userId': userId,
            'currentPage': page,
            'pageSize': 10,
        }
    })
}

// 获取用户捐步列表
export function getYouthUserDonation(userId, page) {
    return request({
        url: `${domain}/youth/getUserDonations`,
        method: 'get',
        params: {
            'userId': userId,
            'currentPage': page,
            'pageSize': 10,
        }
    })
}

// 获取捐步配置
export function getDonationConfig() {
    return request({
        url: `${domain}/youth/getDonationConfig`,
        method: 'get',
    })
}

// 修改配捐总预算
export function saveDonationQuotaConfig(quota) {
    return request({
        url: `${domain}/youth/saveDonationQuotaConfig`,
        method: 'get',
        params: {
            'quota': quota,
        }
    })
}

// 修改预警值
export function saveDonationThresholdConfig(warningThreshold) {
    return request({
        url: `${domain}/youth/saveDonationThresholdConfig`,
        method: 'get',
        params: {
            warningThreshold,
        }
    })
}

// 捐步活动开关
export function saveDonationStateConfig(state) {
    return request({
        url: `${domain}/youth/saveDonationStateConfig`,
        method: 'get',
        params: {
            state,
        }
    })
}

// 修改兑换规则
export function saveDonationRuleConfig(params) {
    return request({
        url: `${domain}/youth/saveDonationRuleConfig`,
        method: 'get',
        params,
    })
}

// 修改限制规则
export function saveDonationLimitConfig(params) {
    return request({
        url: `${domain}/youth/saveDonationLimitConfig`,
        method: 'get',
        params,
    })
}
