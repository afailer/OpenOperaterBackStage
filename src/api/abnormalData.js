/**
 * 异常数据查询
 */
import request from '@/utils/request'
import {domain} from './url'

export default {
    // 异常数据列表
    getAbnormalList:(params)=>{
        return request({
            url: `${domain}/v3/policy/canrenew`,
            method: 'get',
            params: params
        })
    },
    // V3续期日志记录查询
    v3Log:(policy_id,period,page,page_size)=>{
        return request({
            url: `${domain}/v3/policy/logsrenew`,
            method: 'get',
            params: {
                policy_id:policy_id,
                period:period,
                page:page,
                page_size:page_size
            }
        })
    },
    // 点击“重试”按钮
    retry:(policy_id,period)=>{
        return request({
            url: `${domain}/v3/policy/tryrenew`,
            method: 'post',
            data: {
                policy_id:policy_id,
                period:period
            }
        })
    }
}