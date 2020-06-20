export const policy = {
    accountList: (state) => {
        let al = state.searchInsur.userInfo.accountList
        let t = al && al.map(item => {
            let e = []
            e.push(item)
            return e
        })
        return t
    },
    policyList: (state) => {
        let p ={}
        p.policyList = state.searchInsur.userInfo.policyList
        p.totalList = state.searchInsur.userInfo.totalList
        return p
    },
    orderList: (state) => {
        let p = {}
        p.orderCurList = state.searchInsur.userInfo.orderList
        p.orderListPage = state.searchInsur.userInfo.orderListPage
        p.orderFailList = state.searchInsur.userInfo.orderFailList
        return p
    },
    tradeFlowDetail: (state) => {
        let p = {}
        p.tradeInfo = [state.searchInsur.tradeFlowDetail.tradeInfo]
        p.relatedOrders = state.searchInsur.tradeFlowDetail.relatedOrders
        return p
    },
    flowDetailDialogVisible: state => state.searchInsur.flowDetailDialogVisible,
    policyDetail: (state) => {
        let p = {}
        p.basis = state.policyDetail.policyDetail
        p.basisArray = [state.policyDetail.policyDetail]
        p.policyPayman = [state.policyDetail.policyDetail.policy_payman]
        p.insuredUsers = state.policyDetail.policyDetail.insured_users
        p.policyPayList = state.policyDetail.policyPayList
        p.policyFailedList = state.policyDetail.policyFailedList
        p.surrenderList = state.policyDetail.surrenderList
        p.sysLogList = state.policyDetail.sysLogList
        p.patch = state.policyDetail.patch
        return p
    },
}
