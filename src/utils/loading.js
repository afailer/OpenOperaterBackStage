import {Loading} from 'element-ui'

/**
 * loading
 */

const loading = function () {
    let loadingInstance = Loading.service({
        lock: true,
        text: '玩命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })

    return loadingInstance
}

export default loading
