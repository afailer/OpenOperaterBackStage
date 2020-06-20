//因为state的数据要做请求使用，所以对页面数据的处理放在getter里，state只用来储存原数据

import {policy} from './getters/policy'
import {policyNew} from './getters/policyNew'

import {aixinbao} from './getters/aixinbao'
import {common} from './getters/common'
import {youth} from './getters/youth'

const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    editPassword: state => state.user.editPassword
}
Object.assign(getters, common)
Object.assign(getters, policy)
Object.assign(getters, policyNew)

Object.assign(getters, aixinbao)
Object.assign(getters, youth)

export default getters
