import Vue from 'vue'
import GLOBAL from "@/utils/GLOBAL";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import VueBus from './vueBus.js'
import loading from './utils/loading'
import TreeView from "vue-json-tree-view"
/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock' // simulation data

Vue.use(ElementUI, { locale })
Vue.use(VueBus)
Vue.use(TreeView)

Vue.config.productionTip = false
Vue.prototype.$global = GLOBAL;
/**
 * 公共表头样式
 */
Vue.prototype.$commonRowClass = function({row, column, rowIndex, columnIndex}) {
    if (rowIndex === 0) {
        return 'background: #F2F2F2; color: #333333'
    } else {
        return ''
    }
}

Vue.prototype.$loading = loading

// 只能输入正整数
Vue.directive('enterNumber', {
    inserted: function(el) {
      el.addEventListener('keypress', function(e) {
        e = e || window.event
        const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
        const re = /\d/
        if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
      })
    }
  })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
