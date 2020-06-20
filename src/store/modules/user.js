import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        editPassword: false,
        permissionPath:[]
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        EDIT_PASSWORD: (state, editPassword) => {
            state.editPassword = editPassword
        },
        SET_PERMISSION_PATH: (state, permissionPath) => {
            state.permissionPath = permissionPath
            console.log("state.permissionPath")
            console.dir(state.permissionPath)
        },
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const token = response.token
                    setToken(token)
                    commit('SET_TOKEN', token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const data = response.data
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    }
                    commit('SET_NAME', data.name)
                    commit('SET_PERMISSION_PATH', data.permission_path)
                    // commit('SET_AVATAR', data.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                sessionStorage.clear()
                removeToken()
                resolve()
            })
        },

        // 修改密码
        editPassword({commit, state}, editPassword) {
            return new Promise(resolve => {
                // state.editPassword = editPassword
                commit('EDIT_PASSWORD', editPassword)
                resolve()
            })
        }
    }
}

export default user
