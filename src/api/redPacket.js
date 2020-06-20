// 裂变红包相关接口
import request from '@/utils/request'
import Qs from 'qs'


let domain = 'https://redenvelope.qschou.com'

// 获取用户红包信息
export function getYouthUserRedPacket(user_id) {
    return request({
        url: `${domain}/inner/admin/search`,
        method: 'get',
        params: {
            user_id,
        },
    })
}


/**
 * 获取活动组详情
 * @param {string} id 活动组ID
 */
export function activityGroupDetail(id=''){
    return request({
        url: `${domain}/inner/admin/group/show`,
        method: 'get',
        params: {
            id: String(id)
        }
    })
}


/**
 * 获取活动列表
 * @param {string} id 活动组ID
 */
export function activityList(id=''){
    return request({
        url: `${domain}/inner/admin/activity/list`,
        method: 'get',
        params: {
            group_id: String(id)
        }
    })
}

/**
 * 创建活动
 * @param {object} params 数据对象
 * @param {string} params.group_id 此活动所属活动组ID
 * @param {string} params.time_begin 今天活动开始时间
 * @param {string} params.time_end 今天活动结束时间
 * @param {string} params.seed_amount 种子红包金额
 * @param {string} params.max_follower 裂变次/人数
 * @param {string} params.follower_amount_uplimit 裂变金额上限
 * @param {string} params.follower_amount_lowlimit 裂变金额下限
 * @param {string} params.total_amount 今天总金额
 * @param {number} params.notify_rate 今天预警百分
 */
export function createActivity(params={}){
    return request({
        url: `${domain}/inner/admin/activity/add`,
        method: 'POST',
        data: params,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}

/**
 * 更新活动
 * @param {object} updateParams 数据对象
 * @param {string} updateParams.av_id 活动ID
 * @param {string} updateParams.time_begin 今天活动开始时间
 * @param {string} updateParams.time_end 今天活动结束时间
 * @param {string} updateParams.seed_amount 种子红包金额
 * @param {string} updateParams.max_follower 裂变次/人数
 * @param {string} updateParams.follower_amount_uplimit 裂变金额上限
 * @param {string} updateParams.follower_amount_lowlimit 裂变金额下限
 * @param {string} updateParams.total_amount 今天总金额
 * @param {number} updateParams.notify_rate 今天预警百分比
 */
export function editActivity(updateParams={}){
    return request({
        url: `${domain}/inner/admin/activity/edit`,
        method: 'POST',
        data: updateParams,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}


/**
 * 更新活动组
 * @param {object} updateParams 更新的活动对象
 * @param {string} updateParams.id 活动组ID
 * @param {string} updateParams.title 活动名称
 * @param {string} updateParams.holder 负责人名字
 * @param {string} updateParams.amount 总金额
 * @param {boolean} updateParams.is_open 是否开启
 * @param {string} updateParams.desc 描述
 * @param {string} updateParams.start_time 活动开始时间
 * @param {string} updateParams.end_time 活动结束时间
 * @param {string} updateParams.period_number 总期数, 一天为一期
 */
export function editActivityGroup(updateParams={}){
    let id = updateParams.id;
    delete updateParams.id;
    return request({
        url: `${domain}/inner/admin/group/edit?id=${id}`,
        method: 'POST',
        data: updateParams,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
}

