//保险详情页
import {getPolicyView, getPolicyList, getPolicyPayment, getOrderPage, getOrderInfo, postOrderRefund, getPolicyFailedList, getSysLogList, retryInsure} from '@/api/policy'
import { Loading } from 'element-ui'
const loading = function () {
    let loadingInstance = Loading.service({
        lock: true,
        text: '玩命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return loadingInstance
}

const policyDetail = {
    state: {
        policyDetail: {},
        policyPayList: [],
        surrenderList: [],
        policyFailedList: [],
        sysLogList: [],
        patch:[]
    },
    mutations: {
        SET_POLICY_DETAIL(state, data) {
            state.policyDetail = data
        },
        SET_POLICY_PAYMENT(state, data) {
            state.policyPayList = data
        },
        SET_POLICY_FAILED(state, data) {
            state.policyFailedList = data.policyFailedList
            state.surrenderList = data.surrenderList
        },
        SET_SYS_LOG_LIST(state, data) {
            state.sysLogList = data.list
        },
        SET_PATCH(state, data) {
            state.patch = data
        }
    },
    actions: {
        async GetPolicyDetail({commit, state}, policyId = null) {
            if (policyId) {
                try{
                    loading()
                    let res = await getPolicyView(policyId.toString())
                    commit('SET_POLICY_DETAIL', res.data)
                    let policy_id = state.policyDetail.policy_id
                    let res2 = await getPolicyPayment(policy_id)
                    commit('SET_POLICY_PAYMENT', res2.data.list)
                    commit('SET_PATCH', res2.data.patch)
                    setTimeout(()=> {
                        loading().close()
                    }, 1000)
                } catch (e) {
                    console.log(e)
                    setTimeout(()=> {
                        loading().close()
                    }, 1000)
                }
            }else {
                this.$message.error('获取保单信息错误')
            }
        },
        async GetPolicyView({commit}) {
            let p = sessionStorage.getItem('INSUE_DETAIL')
            try{
                let l = JSON.parse(p).toString()
                let res = await getPolicyView(l)
                commit('SET_POLICY_DETAIL', res.data)
            } catch (e) {
                console.log(e)
            }
        },
        async GetPolicyPayment({commit, state}) {
            try{
                let policy_id = state.policyDetail.policy_id
                let res2 = await getPolicyPayment(policy_id)
                commit('SET_POLICY_PAYMENT', res2.data.list)
                commit('SET_PATCH', res2.data.patch)
            } catch (e) {
                console.log(e)
            }
        },
        async RefundPolicy({commit, dispatch}, params) {
            try{
                let {refund_id, refund_type, policy_id} = params
                loading();
                let res = await postOrderRefund(refund_id, refund_type)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                if(res.data.Result == 0) {
                    return Promise.resolve(res.data.Result)
                }if(res.data.Result == -1) {
                    return Promise.resolve(res.data.Result)
                }else{
                    dispatch('GetPolicyPayment', policy_id)
                    return Promise.resolve('操作成功')
                }
            } catch (e) {
                console.log(e)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                return Promise.reject(e)
            }
        },
        async GetPolicyFailedList({commit, state}) {
            loading()
            try{
                let policy_id = state.policyDetail.policy_id
                console.log("policy_id:" + policy_id)
                let res2 = await getPolicyFailedList(policy_id)
                commit('SET_POLICY_FAILED', res2.data)
            } catch (e) {
                console.log(e)
            }
            setTimeout(()=> {
                loading().close();
            }, 1000)
        },
        async GetSysLogList({commit, state}) {
            loading()
            try{
                let policy_id = state.policyDetail.policy_id
                let res2 = await getSysLogList(policy_id)
                commit('SET_SYS_LOG_LIST', res2.data)

            } catch (e) {
                console.log(e)
            }
            setTimeout(()=> {
                loading().close();
            }, 1000)
        },
    }
}

export default policyDetail
