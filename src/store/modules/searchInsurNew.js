//保险搜索页
import {postSearchUser, getPolicyView, getPolicyList, getPolicyPayment, getOrderPage, getOrderInfo, getEntrustFailed, postOrderRefund} from '@/api/policy'
import {postSearchUserNew, getPolicyListNew, getOrderPageNew, getEntrustFailedNew, getOrderInfoNew, postOrderRefundNew} from '@/api/policyNew'
import { Loading } from 'element-ui'
import $global from "@/utils/GLOBAL";

const loading = function () {
    let loadingInstance = Loading.service({
        lock: true,
        text: '玩命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return loadingInstance
}

const searchInsurNew = {
    state: {
        userInfo: {
            accountList: [],
            policyList: [],
            orderList:  [],
            totalList: 1,
            orderFailList: [],
            orderListPage: 1,
        },
        tradeFlowDetail: {
            tradeInfo: {},
            relatedOrders: []
        },
        qsc_id: '',
        flowDetailDialogVisible: false,
    },
    mutations: {
        SET_BLOCK_NEW(state) {
           state.userInfo = {
                accountList: [],
                policyList: [],
                orderList:  [],
                totalList: 1,
                orderFailList: [],
                orderListPage: 1,
            }
            state.tradeFlowDetail = {
                tradeInfo: {},
                relatedOrders: []
            }
            state.qsc_id = ''
        },
        SET_ACCOUNT_LIST_NEW(state, data) {
            state.userInfo.accountList = data
        },
        SET_POLICY_LIST_NEW(state, data) {
            state.userInfo.policyList = data.list
            state.userInfo.totalList = data.total
        },
        SET_ORDER_LIST_NEW(state, data) {
            state.userInfo.orderList = data.res
            state.userInfo.orderListPage = data.page
        },
        SET_ORDER_INFO_NEW(state, data) {
            state.tradeFlowDetail.tradeInfo = data
            state.tradeFlowDetail.relatedOrders = data["Alias"]
            state.tradeFlowDetail.coupons = data['Coupons']
        },
        SET_DIALOG_NEW(state) {
            state.flowDetailDialogVisible = true
        },
        CLOSE_DIALOG_NEW(state) {
            state.flowDetailDialogVisible = false
        },
        SET_CUR_USER_ID_NEW(state, qsc_id) {
            state.qsc_id = qsc_id
        },
        SET_FAIL_ORDER_LIST_NEW(state, data) {
            state.userInfo.orderFailList = data
        }
    },
    actions: {
        // 点击搜索按钮按钮
        // async SearchInsurNew({commit, dispatch, state}, params) {
        //     try {
        //         loading()
        //         commit('SET_BLOCK_NEW')
        //         let result = await postSearchUserNew(params)
        //         if(!result.data) {
        //             return false
        //         }
        //         commit('SET_ACCOUNT_LIST_NEW', result.data)
        //         let qsc_id = state.userInfo.accountList[0].qsc_id
        //         commit('SET_CUR_USER_ID_NEW', qsc_id)
        //         $global.showLoading = false;
        //         dispatch('GetPolicyListNew')
        //         $global.showLoading = false;
        //         dispatch('SwitchOrderPageNew')
        //         $global.showLoading = false;
        //         dispatch('GetEntrustFailedNew')
        //         await setTimeout(()=> {
        //             loading().close();
        //         }, 1000)
        //     } catch (error) {
        //         commit('SET_BLOCK_NEW')
        //         setTimeout(()=> {
        //             loading().close()
        //         }, 1000)
        //         return Promise.reject(error)
        //     }
        // },

        // 点击切换账户按钮
        async SwitchAccountTabNew({commit, state, rootState, dispatch}, tabNum) {
            try {
                let userInfoList = rootState.common.userListNew
                commit('SET_ACCOUNT_LIST_NEW', userInfoList)

                let qsc_id = userInfoList[tabNum].qsc_id
                commit('SET_CUR_USER_ID_NEW', qsc_id)
                loading()
                dispatch('GetPolicyListNew')
                dispatch('SwitchOrderPageNew')
                dispatch('GetEntrustFailedNew')
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
            } catch (e) {
                setTimeout(()=> {
                    loading().close()
                }, 1000)
                console.log(e)
            }
        },

        // 获取保单列表
        async GetPolicyListNew({commit, state, rootState}, page=1) {
            try {
                let qsc_id = state.qsc_id
                let result1 = await getPolicyListNew(qsc_id, page, rootState.common.exactFlag)
                commit('SET_POLICY_LIST_NEW', result1.data)
            } catch (e) {
                console.log(e)
            }
        },

        // 获取账户交易流水分页
        async SwitchOrderPageNew({commit, state, rootState}, params=1) {
            try{
                let qsc_id = state.qsc_id
                let result2 = await getOrderPageNew(qsc_id, params, rootState.common.exactFlag)
                let page = result2.next
                let res = result2.data
                if(page === 0) {
                    page = state.userInfo.orderListPage || 1
                }
                commit('SET_ORDER_LIST_NEW', {res, page})
            } catch (e) {
                console.log(e)
            }
        },

        // 获取异常流水
        async GetEntrustFailedNew({commit, state, rootState}) {
            // 暂时没有异常流水
            return
            try{
                let qsc_id = state.qsc_id
                let result3 = await getEntrustFailedNew(qsc_id, rootState.common.exactFlag)
                commit('SET_FAIL_ORDER_LIST_NEW',result3.data)
            } catch (e) {
                console.log(e)
            }
        },

        //刷新交易流水页面
        async UpdateOrderPageNew({commit, state, rootState}) {
            try{
                let qsc_id = state.qsc_id
                let page = state.userInfo.orderListPage - 1 || 1
                let result2 = await getOrderPageNew(qsc_id, page, rootState.common.exactFlag)
                let res = result2.data
                let newPage = result2.next
                if(newPage === 0) {
                    newPage = 1
                }
                commit('SET_ORDER_LIST_NEW', {res, newPage})
            } catch (e) {
                console.log(e)
            }
        },

        // 点击查看查看保单详情
        async GetOrderInfoDetailNew({commit}, params) {
            try{
                let res = await getOrderInfoNew(params)
                commit('SET_ORDER_INFO_NEW', res.data)
                commit('SET_DIALOG_NEW')
            }catch (e) {
                console.log(e)
            }
        },

        // 退款
        async RefundOrderNew({commit, state, dispatch}, params) {
            try{
                let {trade_no_child,refund_type, trade_no, amount} = params
                loading()
                let res = await postOrderRefundNew(trade_no_child, refund_type, amount)
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
                if(res.code == 0) {
                    dispatch('GetOrderInfoDetailNew', trade_no)
                    dispatch('UpdateOrderPageNew')
                    dispatch('GetEntrustFailedNew')
                    return Promise.resolve(('操作成功'))
                }
            } catch (e) {
                console.log(e)
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
                return Promise.reject(e)
            }
        },
    }
}

export default searchInsurNew
