import {getTimeString} from '@/utils/time'
let Time = {

    //获取当前时间戳
    getUnix: function () {
        let date = new Date()
        return date.getTime()
    },
    //有效期为一年
    validityPeriodYear: function (t) {
        let startDate = Date.parse(t.toString().replace(/-/g, '/'))
        let endDate = startDate + (1000 * 60 * 60 * 24 * 365)
        return endDate - this.getUnix() > 0
    },
    //有效期为一个月
    validityPeriodMonth: function (t) {
        let endDate = Date.parse(t.toString().replace(/-/g, '/'))
        return endDate - this.getUnix() > 0
    },
    //一年以后的时间
    afterAYear: function (t) {
        let startDate = Date.parse(t.toString().replace(/-/g, '/'))
        let endDate = (startDate + (1000 * 60 * 60 * 24 * 365))
        let f = new Date(endDate)
        return getTimeString('yyyy-MM-dd hh:mm:ss', f)
    },
    //30天以后的时间
    afterMonth: function (t) {
        let startDate = Date.parse(t.toString().replace(/-/g, '/'))
        let endDate = (startDate + (1000 * 60 * 60 * 24 * 30))
        let f = new Date(endDate)
        return getTimeString('yyyy-MM-dd hh:mm:ss', f)
    }
}
export default Time
