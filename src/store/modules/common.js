import {postSearchUser} from '@/api/policy'
import {postSearchUserNew} from '@/api/policyNew'

const common = {
    state: {
        userList: [],
        userListNew: [],
        exactFlag: null,
        eBao_id: '',
        qsc_id: '',
    },
    mutations: {
        SET_USER_LIST(state, data) {
            state.userList = data
        },
        SET_USER_LIST_NEW(state, data) {
            state.userListNew = data
        },
        SET_EBAO_ID(state, data) {
            state.eBao_id = data
        },
        SET_QSC_ID(state, data) {
            state.qsc_id = data
        },
        SET_EXACT_FLAG(state, data) {
            state.exactFlag = data
        },
        CLEAR_DATA(state) {
            state.userList = []
            state.userListNew = []
            state.exactFlag = null
            state.eBao_id =''
            state.qsc_id =''
        }
    },
    actions: {
        // 搜索
        async GetUserList({commit, dispatch, state}, params) {
            try {
                commit('CLEAR_DATA')
                commit('SET_EXACT_FLAG', params)
                let result = await postSearchUser(params)
                if(!result.data) {
                    return false
                }
                commit('SET_USER_LIST', result.data)
                let eBao_id = state.userList[0].id
                commit('SET_EBAO_ID', eBao_id)
                let qsc_id = state.userList[0].qsc_id
                commit('SET_QSC_ID', qsc_id)
            } catch (error) {
                commit('CLEAR_DATA')
                console.log('*************', error)
                return Promise.reject(error)
            }
        },
        async GetUserListNew({commit, dispatch, state}, params) {
            try {
                commit('CLEAR_DATA')
                commit('SET_EXACT_FLAG', params)
                let result = await postSearchUserNew(params)
                if(!result.data) {
                    return false
                }
                commit('SET_USER_LIST_NEW', result.data)
                let eBao_id = state.userListNew[0].id
                commit('SET_EBAO_ID', eBao_id)
                let qsc_id = state.userListNew[0].qsc_id
                commit('SET_QSC_ID', qsc_id)
            } catch (error) {
                commit('CLEAR_DATA')
                console.log('*************', error)
                return Promise.reject(error)
            }
        },
    }
}

export default common
