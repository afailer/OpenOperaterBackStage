//保险搜索页
import {postSearchUser, getPolicyView, getPolicyList, 
    getPolicyPayment, getOrderPage, getOrderInfo, 
    getEntrustFailed, postOrderRefund, abnormalPostRefund} from '@/api/policy'
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

const searchInsur = {
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
        user_id: '',
        flowDetailDialogVisible: false,
    },
    mutations: {
        SET_BLOCK(state) {
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
            state.user_id = ''
        },
        SET_ACCOUNT_LIST(state, data) {
            state.userInfo.accountList = data
        },
        SET_POLICY_LIST(state, data) {
            state.userInfo.policyList = data.list
            state.userInfo.totalList = data.total
        },
        SET_ORDER_LIST(state, data) {
            state.userInfo.orderList = data.res
            state.userInfo.orderListPage = data.page
        },
        SET_ORDER_INFO(state, data) {
            state.tradeFlowDetail.tradeInfo = data
            state.tradeFlowDetail.relatedOrders = data["Alias"]
        },
        SET_DIALOG(state) {
            state.flowDetailDialogVisible = true
        },
        CLOSE_DIALOG(state) {
            state.flowDetailDialogVisible = false
        },
        SET_CUR_USER_ID(state, id) {
            state.user_id = id
        },
        SET_FAIL_ORDER_LIST(state, data) {
            state.userInfo.orderFailList = data
        }
    },
    actions: {
        // 点击搜索按钮按钮  暂时不用
        // async SearchInsur({commit, dispatch, state}, params) {
        //     try {
        //         loading()
        //         commit('SET_BLOCK')
        //         let result = await postSearchUser(params)
        //         if(!result.data) {
        //             return false
        //         }
        //         commit('SET_ACCOUNT_LIST', result.data)
        //         let user_id = state.userInfo.accountList[0].id
        //         commit('SET_CUR_USER_ID', user_id)
        //         $global.showLoading = false;
        //         alert(999)
        //         dispatch('GetPolicyList')
        //         $global.showLoading = false;
        //         dispatch('SwitchOrderPage')
        //         $global.showLoading = false;
        //         dispatch('GetEntrustFailed')
        //         await setTimeout(()=> {
        //             loading().close();
        //         }, 1000)
        //     } catch (error) {
        //         commit('SET_BLOCK')
        //         setTimeout(()=> {
        //             loading().close()
        //         }, 1000)
        //         return Promise.reject(error)
        //     }
        // },

        // 点击切换账户按钮
        async SwitchAccountTab({commit, state, rootState, dispatch}, tabNum) {
            try {
                let userInfoList = rootState.common.userList
                commit('SET_ACCOUNT_LIST', userInfoList)

                let user_id = userInfoList[tabNum].id
                commit('SET_CUR_USER_ID', user_id)
                loading()
                dispatch('GetPolicyList')
                dispatch('SwitchOrderPage')
                dispatch('GetEntrustFailed')
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
        async GetPolicyList({commit, state, rootState}, page=1) {
            try {
                // alert(JSON.stringify(rootState.common.exactFlag))
                let user_id = state.user_id
                let result1 = await getPolicyList(user_id, page, rootState.common.exactFlag)
                commit('SET_POLICY_LIST', result1.data)
            } catch (e) {
                console.log(e)
            }
        },

        // 获取账户交易流水分页
        async SwitchOrderPage({commit, state, rootState}, params = 1) {
            try{
                let user_id = state.user_id
                let result2 = await getOrderPage(user_id, params, rootState.common.exactFlag)
                let page = result2.next
                let res = result2.data
                if(page === 0) {
                    page = state.userInfo.orderListPage || 1
                }
                commit('SET_ORDER_LIST', {res, page})
            } catch (e) {
                console.log(e)
            }
        },

        // 获取异常流水
        async GetEntrustFailed({commit, state, rootState}) {
            try{
                let user_id = state.user_id
                let result3 = await getEntrustFailed(user_id, rootState.common.exactFlag)
                commit('SET_FAIL_ORDER_LIST',result3.data)
            } catch (e) {
                console.log(e)
            }
        },

        //刷新交易流水页面
        async UpdateOrderPage({commit, state, rootState}) {
            try{
                let user_id = state.user_id
                let page = state.userInfo.orderListPage - 1 || 1
                let result2 = await getOrderPage(user_id, page, rootState.common.exactFlag)
                let res = result2.data
                let newPage = result2.next
                if(newPage === 0) {
                    newPage = 1
                }
                commit('SET_ORDER_LIST', {res, newPage})
            } catch (e) {
                console.log(e)
            }
        },

        // 点击查看查看保单详情
        async GetOrderInfoDetail({commit}, params) {
            try{
                let res = await getOrderInfo(params)
                commit('SET_ORDER_INFO', res.data)
                commit('SET_DIALOG')
            }catch (e) {
                console.log(e)
            }
        },

        // 退款
        async RefundOrder({commit, state, dispatch}, params) {
            try{
                let {id, entity_type, trade_no, amount} = params
                loading()
                let res = await postOrderRefund(id, entity_type, amount)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                if(res.data.result > 0) {
                    dispatch('GetOrderInfoDetail', trade_no)
                    dispatch('UpdateOrderPage')
                    dispatch('GetEntrustFailed')  
                }
                return Promise.resolve((res))
            } catch (e) {
                console.log(e)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                return Promise.reject(e)
            }
        },


        // 异常流水-退款
        async AbnormalRefundOrder({commit, state, dispatch}, params) {
            try{
                let {id, trade_no} = params
                loading()
                let res = await abnormalPostRefund(id)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                if(res.code===0){
                    dispatch('UpdateOrderPage')
                    dispatch('GetEntrustFailed')
                }
                return Promise.resolve((res))
            } catch (e) {
                console.log(e)
                setTimeout(()=> {
                    loading().close();
                }, 1000)
                return Promise.reject(e)
            }
        },

    }
}

export default searchInsur
