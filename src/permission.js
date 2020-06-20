import router from './router'
// import store from './store'
// import {Message} from 'element-ui'
// import {getToken} from '@/utils/auth' // getToken from cookie


// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    next()
    // if (getToken()) {
    //     if (to.path === '/login') {
    //         next({path: '/'})
    //         NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    //     } else {
    //         if (store.getters.name.length === 0) {
    //             store.dispatch('GetInfo').then(res => { // 拉取用户信息
    //                 next()
    //             }).catch((err) => {
    //                 store.dispatch('FedLogOut').then(() => {
    //                     Message.error('Verification failed, please login again')
    //                     next({path: '/'})
    //                 })
    //             })
    //         } else {
    //             next()
    //         }
    //     }
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //     } else {
    //         next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    //         NProgress.done()
    //     }
    // }
    // next()


})

router.afterEach((to, from) => {
    if(from.name !== null) {
        sessionStorage.removeItem('SEATCH_PARAMS')
    }
})
