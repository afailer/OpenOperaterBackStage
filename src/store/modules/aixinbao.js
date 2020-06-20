import {postAxbSearchUser, postAxbSearchOrder, postAxbRefund} from '@/api/aixinbao'
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

const aixinbao = {
    state: {
        axbUserList: [],
        axbCurInfo: {},
        axb_qsc_id: '',
    },
    mutations: {
        SET_AXB_BLOCK(state) {
            state.axb_qsc_id = ''
            state.axbCurInfo = {}
            state.axbUserList = []
        },
        SET_AXB_ACCOUNT_LIST(state, data) {
            state.axbUserList = data
        },
        SET_CUR_USER_ID(state, id) {
            state.axb_qsc_id = id
        },
        SET_AXB_CUR_LIST(state, data) {
            state.axbCurInfo = data
        }
    },
    actions: {
        async SearchAXBInfo({commit, dispatch, state}, params) {
            try {
                loading()
                commit('SET_AXB_BLOCK')
                let result = await postAxbSearchUser(params)
                if(!result.data) {
                    return false
                }
                commit('SET_AXB_ACCOUNT_LIST', result.data.list.users)
                let qsc_id = state.axbUserList[0].qsc_id
                commit('SET_CUR_USER_ID', qsc_id)
                dispatch('GetAxbInfo')
                await setTimeout(()=> {
                    loading().close();
                }, 1000)
            } catch (error) {
                console.log('****************',error)
                commit('SET_BLOCK')
                setTimeout(()=> {
                    loading().close()
                }, 1000)
                return Promise.reject(error)
            }
        },

        // 获取爱心保信息
        async GetAxbInfo({commit, state}) {
            try {
                let qsc_id = state.axb_qsc_id
                let result1 = await postAxbSearchOrder(qsc_id)
                commit('SET_AXB_CUR_LIST', result1.data.actives)
            } catch (e) {
                console.log(e)
            }
        },
        // 切换界面
        async SwitchAxbAccountTab({commit, state, dispatch}, tabNum) {
            try {
                let axb_qsc_id = state.axbUserList[tabNum].qsc_id
                commit('SET_CUR_USER_ID', axb_qsc_id)
                loading()
                dispatch('GetAxbInfo')
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
        // 退款接口
        async RefundAXB({commit, state, dispatch}) {
            try {
                let qscId = state.axb_qsc_id
                let tradeNo = state.axbCurInfo.trade_no
                loading()
                let r = await postAxbRefund(qscId, tradeNo)
                dispatch('GetAxbInfo')
                await setTimeout(()=> {
                    loading().close()
                }, 1000)
                console.log('退款状态', r)
                if (r && r.code === 0) {
                    if (r.data.refund_state === 10 || r.data.refund_state === 30) {
                        return Promise.resolve('操作成功')
                    }else {
                        return Promise.reject()
                    }
                }
            } catch (e) {
                console.log('退款状态被catch', e)
                setTimeout(()=> {
                    loading().close()
                }, 1000)
                return Promise.reject()
            }
        }
    },
}

export default aixinbao
