/**
 *
 */
let host = window.location.host
console.log('host', host)
const checkDomain = function (host) {
    // 测试环境
    if (host.includes('insure-admin-test.qsebao.net')
    || host.includes('insure-admin-test.qingsongchou.net')
    || host.includes('insure-admin-test.qingsongchou.com')
    || host.includes('insure-admin-test.qsebao.com')) {
        return 'https://insure-admin-api-test.qingsongchou.net'
    } else if (host.includes('insure-admin.qingsongchou.net')){
        return 'https://insure-admin-api.qingsongchou.net'
    } else {
        return 'https://insure-admin-api.qsebao.com'
    }
}

export const domain = checkDomain(host)
