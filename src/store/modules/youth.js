//年轻保 数据展示页
import {getYouthUserInfo, getYouthPolicyList, getYouthPremiumDetail, getYouthUserStep, getYouthUserDonation} from '@/api/youth'

import {getYouthUserRedPacket} from '@/api/redPacket'

import { Loading } from 'element-ui'

const loading = function () {
    let loadingInstance = Loading.service({
        lock: true,
        text: '玩命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return loadingInstance
}

const youth = {
    state: {
        youthUserList: [],
        youthPolicyList: [],
        youthTotalPremium: {},
        youthPremiumList: [],
        youthUserStepList: [],
        youthUserDonationList: [],
        youthPremiumPage: 1,
        youthUserStepPage: 1,
        youthUserDonationPage: 1,
        eBaoId: '',
        qscId: '',
        youthUserRedPacket: {}
    },
    mutations: {
        SET_YOUTH_BLOCK(state) {
            state = {}
        },
        SET_YOUTH_POLICY_LIST(state, data) {
            state.youthPolicyList = data
        },
        SET_YOUTH_USER_LIST(state, data) {
            state.youthUserList = []
            state.youthUserList = data
        },
        SET_CUR_EBAO_ID(state, data) {
            state.eBaoId = data
        },
        SET_CUR_QSC_ID(state, data) {
            state.qscId = data
        },
        SET_YOUTH_TOTAL_PREMIUM(state, data) {
            state.youthTotalPremium = data
        },
        SET_YOUTH_PREMIUM_LIST(state, data) {
            state.youthPremiumList = data.res.list
            state.youthPremiumPage = data.next
        },
        SET_YOUTH_USER_STEP_LIST(state, data) {
            state.youthUserStepList = data.res.list
            state.youthUserStepPage = data.next
        },
        SET_YOUTH_USER_DONATION_LIST(state, data) {
            state.youthUserDonationList = data.res.list
            state.youthUserDonationPage = data.next
        },
        SET_USER_RED_PACKET(state, data) {
            state.youthUserRedPacket = data
        }
    },
    actions: {
        // 切换账户tab
        async SwitchYouthAccountTab({commit, state, rootState, dispatch}, tabNum) {
            try {
                commit('SET_YOUTH_BLOCK')
                let userInfoList = rootState.common.userList
                let qscId = userInfoList[tabNum].qsc_id
                let eBaoId = userInfoList[tabNum].id
                commit('SET_CUR_QSC_ID', qscId)
                commit('SET_CUR_EBAO_ID', eBaoId)
                loading()
                await getYouthUserInfo(qscId).then((res) => {
                    let userInfo = res.data
                    if (userInfo) {
                        let {gender, weight, height, age} = userInfo
                        gender = parseInt(gender) === 1 ? '男' : '女'
                        userInfoList[tabNum].gender = gender
                        userInfoList[tabNum].weight = weight
                        userInfoList[tabNum].height = height
                        userInfoList[tabNum].age = age
                    }
                    commit('SET_YOUTH_USER_LIST', userInfoList)
                })
                dispatch('GetYouthPolicyList')
                dispatch('SwitchYouthPremiumPage')
                dispatch('GetYouthUserStep')
                dispatch('GetYouthUserDonation')
                dispatch('GetYouthUserRedPacket')
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
            } catch (e) {
                commit('SET_YOUTH_BLOCK')
                setTimeout(()=> {
                    loading().close()
                }, 1000)
                console.log(e)
            }
        },
        // 获取年轻保保单列表
        async GetYouthPolicyList({commit, state}) {
            try {
                let eBaoId = state.eBaoId
                let result1 = await getYouthPolicyList(eBaoId)
                if(JSON.stringify(result1.data.policys) === '{}') {
                    commit('SET_YOUTH_POLICY_LIST', [])
                } else {
                    commit('SET_YOUTH_POLICY_LIST', result1.data.policys)
                }
            } catch (e) {
                console.log(e)
            }
        },
        // 获取当前用户保费奖励列表, 分页
        async SwitchYouthPremiumPage({commit, state}, params=1) {
            try{
                let qscId = state.qscId
                // let qscId = 534235208
                if(params <= 0) {
                    params = 1
                }
                let result2 = await getYouthPremiumDetail(qscId, params)
                let res = result2.data
                if(res.total && params === 1) {
                    commit('SET_YOUTH_TOTAL_PREMIUM', res.total)
                }
                // next 为下一页, 将 next 动态的处理为总页数
                let next = res.next
                if(next === 0) {
                    next = state.youthPremiumPage || 1
                }
                commit('SET_YOUTH_PREMIUM_LIST', {res, next})
            } catch (e) {
                console.log('*************', e)
            }
        },
        // 获取用户步数记录
        async GetYouthUserStep({commit, state}, params=1) {
            try{
                let qscId = state.qscId
                if(params <= 0) {
                    params = 1
                }
                let result3 = await getYouthUserStep(qscId, params)
                let res = result3.data
                let next = res.next
                if(next === 0) {
                    next = state.youthUserStepPage || 1
                }
                commit('SET_YOUTH_USER_STEP_LIST', {res, next})

            } catch (e) {
                console.log('*************', e)

            }
        },
        // 获取用户步数记录
        async GetYouthUserDonation({commit, state}, params=1) {
            try{
                let qscId = state.qscId
                // let qscId = 534235208
                if(params <= 0) {
                    params = 1
                }
                let result3 = await getYouthUserDonation(qscId, params)
                let res = result3.data
                let next = res.next
                if(next === 0) {
                    next = state.youthUserDonationPage || 1
                }
                commit('SET_YOUTH_USER_DONATION_LIST', {res, next})
            } catch (e) {
                console.log('*************', e)

            }
        },
        // 获取用户红包记录
        async GetYouthUserRedPacket({commit, state}) {
            try {
                let qscId = state.qscId
                let result = await getYouthUserRedPacket(qscId)
                if(result.code === 0) {
                    commit('SET_USER_RED_PACKET', result.data)
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
}

export default youth
