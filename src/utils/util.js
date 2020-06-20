export default {
    roleNamed (state) {
        let _name = ''
        state = Number(state)
        switch (state) {
            case 1:
                _name = '超级管理员'
                break
            case 2:
                _name = '客服管理员'
                break
            case 3:
                _name = '产品管理员'
                break
            case 4:
                _name = '财务管理员'
                break
            case 5:
                _name = '一线客服'
                break
            case 6:
                _name = '二线客服'
                break
            case 7:
                _name = '保险退款'
                break
            default:
                _name = '未知状态'
                break
        }
        return _name
    },
    getAccountState (state) {
        let _name = ''
        state = Number(state)
        switch (state) {
            case 1:
                _name = '正常'
                break
            case 2:
                _name = '禁用'
                break
            default:
                _name = '未知状态'
                break
        }
        return _name
    },
    deepClone (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}