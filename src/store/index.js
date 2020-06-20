import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import common from './modules/common'
import searchInsur from './modules/searchInsur'
import searchInsurNew from './modules/searchInsurNew'

import policyDetail from './modules/policyDetail'
import policyDetailNew from './modules/policyDetailNew'

import aixinbao from './modules/aixinbao'
import youth from './modules/youth'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        common,
        searchInsur,
        searchInsurNew,
        policyDetail,
        policyDetailNew,
        aixinbao,
        youth,
    },
    getters
})

export default store
