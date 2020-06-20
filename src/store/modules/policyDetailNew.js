//保险详情页
import {getPolicyView, getPolicyList, getPolicyPayment, getOrderPage, getOrderInfo, postOrderRefund, getPolicyFailedList, getSysLogList, retryInsure} from '@/api/policy'

import {getPolicyPaymentNew, getPolicyViewNew} from '@/api/policyNew'
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

const policyDetailNew = {
    state: {
        policyDetail: {},
        policyPayList: [],
        surrenderList: [],
        policyFailedList: [],
        sysLogList: [],
    },
    mutations: {
        SET_POLICY_DETAIL_NEW(state, data) {
            state.policyDetail = data
        },
        SET_POLICY_PAYMENT_NEW(state, data) {
            state.policyPayList = data
        },
        SET_POLICY_FAILED_NEW(state, data) {
            state.policyFailedList = data.policyFailedList
            state.surrenderList = data.surrenderList
        },
        SET_SYS_LOG_LIST_NEW(state, data) {
            state.sysLogList = data.list
        }
    },
    actions: {
        async GetPolicyDetailNew({commit, state}, policyId = null) {
            if (policyId) {
                try{
                    loading()
                    // console.log('ok')
                    let res = await getPolicyViewNew(policyId.toString())
                    // console.log('getPolicyView', res)
                    commit('SET_POLICY_DETAIL_NEW', res.data)
                    let policy_id = state.policyDetail.policy_id
                    let res2 = await getPolicyPaymentNew(policy_id)
                    commit('SET_POLICY_PAYMENT_NEW', res2.data.list)
                    await setTimeout(()=> {
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
        async GetPolicyViewNew({commit}) {
            let p = sessionStorage.getItem('INSUE_DETAIL')
            try{
                let l = JSON.parse(p).toString()
                console.log('l', l)
                let res = await getPolicyViewNew(l)
                commit('SET_POLICY_DETAIL_NEW', res.data)
            } catch (e) {
                console.log(e)
            }
        },
        async GetPolicyPaymentNew({commit, state}) {
            try{
                let policy_id = state.policyDetail.policy_id
                let res2 = await getPolicyPaymentNew(policy_id)
                commit('SET_POLICY_PAYMENT_NEW', res2.data.list)
            } catch (e) {
                console.log(e)
            }
        },
        async RefundPolicyNew({commit, dispatch}, params) {
            try{
                let {refund_id, refund_type, policy_id} = params
                loading();
                let res = await postOrderRefund(refund_id, refund_type)
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
                if(res.data.Result == 0) {
                    return Promise.resolve(res.data.Result)
                }if(res.data.Result == -1) {
                    return Promise.resolve(res.data.Result)
                }else{
                    dispatch('GetPolicyPaymentNew', policy_id)
                    return Promise.resolve('操作成功')
                }
            } catch (e) {
                console.log(e)
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
                return Promise.reject(e)
            }
        },
        async GetPolicyFailedListNew({commit, state}) {
            loading()
            try{
                let policy_id = state.policyDetail.policy_id
                // console.log("policy_id:" + policy_id)
                let res2 = await getPolicyFailedList(policy_id)
                commit('SET_POLICY_FAILED_NEW', res2.data)
            } catch (e) {
                console.log(e)
            }
            await setTimeout(()=> {
                loading().close();
            }, 1000)
        },
        async GetSysLogListNew({commit, state}) {
            loading()

            try{
                let policy_id = state.policyDetail.policy_id

                let res2 = await getSysLogList(policy_id)
                commit('SET_SYS_LOG_LIST_NEW', res2.data)

            } catch (e) {
                console.log(e)
            }
            await setTimeout(()=> {
                loading().close();
            }, 1000)
        },
    }
}

export default policyDetailNew
