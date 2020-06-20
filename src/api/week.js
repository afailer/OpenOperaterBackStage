/**
 * 周周领查询
 */
import request from '@/utils/request'
import {domain} from './url'

export default {
    // 周周领查询
    weekQuery: (type,key) => {
        return request({
            url: `${domain}/ebao_policy/user`,
            method: 'post',
            data: {
                type:type,
                key:key
            }
        })
    },
    // 保单信息
    // ebaoPolicyList: (user_id,page,page_size) => {
    //     return request({
    //         url: `${domain}/ebao_policy/list`,
    //         method: 'get',
    //         params: {
    //             user_id:user_id,
    //             page:page,
    //             page_size:page_size,
    //             sku:'zhonghui-gift-weekillness'
    //         }
    //     })
    // },
    ebaoPolicyList: (params) => {
        return request({
            url: `${domain}/ebao_policy/list`,
            method: 'get',
            params: params
        })
    },
    // 批改记录
    correctionRecord: (policy_id,page,page_size) => {
        return request({
            url: `${domain}/v3/weekly/policy/correctlist`,
            method: 'get',
            params: {
                policy_id:policy_id,
                page:page,
                page_size:page_size
            }
        })
    },
    // 邀请记录
    invitationRecord: (user_id,page,page_size) => {
        return request({
            url: `${domain}/v3/weekly/user/sharelist`,
            method: 'get',
            params: {
                user_id:user_id,
                page:page,
                page_size:page_size
            }
        })
    },
}
