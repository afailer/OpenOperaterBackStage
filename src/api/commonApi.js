import request from '@/utils/request'
import {domain} from './url'

export default {
    // 获取admin用户列表
    getAdminList: (params) => {
        return request({
            url: `${domain}/admin/user/list`,
            method: 'get',
            params: params,
        })
    },
    // admin系统添加用户
    addUser: (params) => {
        return request({
            url: `${domain}/admin/user/create`,
            method: 'post',
            data: params,
        })
    },
    // admin系统编辑用户
    editUser: (params) => {
        return request({
            url: `${domain}/admin/user/update`,
            method: 'post',
            data: params,
        })
    },
    // 获取角色列表
    getRolesList: () => {
        return request({
            url: `${domain}/admin/roles/list`,
            method: 'get'
        })
    },
    // user用户修改密码
    userUpdatePass: (params) => {
        return request({
            url: `${domain}/admin/user/update_pass`,
            method: 'post',
            data: params,
        })
    },
    // 获取退款列表
    getRefundList: (params) => {
        return request({
            url: `${domain}/refund/newlist`,
            method: 'get',
            params: params
        })
    },
    // 获取退款详情信息
    getRefundDetail: (params) => {
        return request({
            url: `${domain}/refund/newdetail`,
            method: 'get',
            params: params
        })
    },
    // 获取退款列表
    getRefundProgress: (params) => {
        return request({
            url: `${domain}/refund/queryRefund`,
            method: 'get',
            params: params
        })
    },

    // 保单异常单-退保记录
    getSurrenderList: (params) => {
        return request({
            url: `${domain}/order_new/policy/surrender`,
            method: 'get',
            params: params
        })
    },
    // 保单异常单-投保失败记录
    getPolicyFailedList: (params) => {
        return request({
            url: `${domain}/order_new/policy/fails`,
            method: 'get',
            params: params
        })
    },
    // 系统日志
    getSysLogList: (params) => {
        return request({
            url: `${domain}/order_new/policy/logs`,
            method: 'get',
            params: params
        })
    },
    // 新保单详情-自动续费、自动续保
    changeEntrust: (policy_id,type,value) => {
        return request({
            url: `${domain}/v2/policy/close_auto`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'type': type,
                'value': value
            }
        })
    },
    // 保单详情(旧)-自动续费、自动续保
    changeOldEntrust: (policy_id,type,value) => {
        return request({
            url: `${domain}/v1/policy/close_auto`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'type': type,
                'value': value
            }
        })
    },
    // V1保单修改止期接口
    modifyValidityPeriod: (id,value) => {
        return request({
            url: `${domain}/v1/policy/end_at`,
            method: 'post',
            data: {
                'id': id,
                'value': value
            }
        })
    },
    // 点击“恢复保单状态”按钮，展示弹窗里面的信息
    recoverPop: (params) => {
        return request({
            url: `${domain}/v1/policy/query_state_info`,
            method: 'get',
            params: params
        })
    },
    // 修改保单状态
    modifyState: (policy_id,state) => {
        return request({
            url: `${domain}/v1/policy/recover_state`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'state': state
            }
        })
    },
    // 异常续期情况-重试
    retry: (id,period) => {
        return request({
            url: `${domain}/v1/policy/tryrenew`,
            method: 'post',
            data: {
                'id': id,
                'period': period
            }
        })
    },
    // 新保单详情--修改保单状态
    modifyStateNew: (policy_id) => {
        return request({
            url: `${domain}/v2/policy/reinstate`,
            method: 'post',
            data: {
                'policy_id': policy_id
            }
        })
    },

    // 新保单详情--客户主动退保
    activeReturnNew: (policy_id,state) => {
        return request({
            url: `${domain}/v2/policy/ineffective`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'state': state
            }
        })
    },
    // 旧保单详情--客户主动退保
    activeReturnOld: (policy_id,state) => {
        return request({
            url: `${domain}/v1/policy/ineffective`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'state': state
            }
        })
    },
    // 旧保单详情--尝试重建
    rebuild: (policy_id) => {
        return request({
            url: `${domain}/v1/policy/pushrenew`,
            method: 'post',
            data: {
                'policy_id': policy_id
            }
        })
    },
    // 新保险统一查询->系统日志->重试操作
    newRetry: (policy_id,begin_at,end_at) => {
        return request({
            url: `${domain}/v3/policy/tryinsure`,
            method: 'post',
            data: {
                'policy_id': policy_id,
                'begin_at': begin_at,
                'end_at': end_at
            }
        })
    }
}
