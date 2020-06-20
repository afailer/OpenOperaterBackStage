export const policyNew = {
    accountListNew: (state) => {
        let al = state.searchInsurNew.userInfo.accountList
        let t = al && al.map(item => {
            let e = []
            e.push(item)
            return e
        })
        return t
    },
    policyListNew: (state) => {
        let p ={}
        p.policyList = state.searchInsurNew.userInfo.policyList
        p.totalList = state.searchInsurNew.userInfo.totalList
        return p
    },
    orderListNew: (state) => {
        let p = {}
        p.orderCurList = state.searchInsurNew.userInfo.orderList
        p.orderListPage = state.searchInsurNew.userInfo.orderListPage
        p.orderFailList = state.searchInsurNew.userInfo.orderFailList
        return p
    },
    tradeFlowDetailNew: (state) => {
        let p = {}
        p.tradeInfo = [state.searchInsurNew.tradeFlowDetail.tradeInfo]
        p.relatedOrders = state.searchInsurNew.tradeFlowDetail.relatedOrders
        p.couponInfo = state.searchInsurNew.tradeFlowDetail.coupons
        return p
    },
    flowDetailDialogVisibleNew: state => state.searchInsurNew.flowDetailDialogVisible,
    policyDetailNew: (state) => {
        let p = {}
        p.basis = state.policyDetailNew.policyDetail
        p.basisArray = [state.policyDetailNew.policyDetail]
        p.policyPayman = [state.policyDetailNew.policyDetail.policy_payman]
        p.insuredUsers = state.policyDetailNew.policyDetail.insured_users
        p.policyPayList = state.policyDetailNew.policyPayList
        p.policyFailedList = state.policyDetailNew.policyFailedList
        p.surrenderList = state.policyDetailNew.surrenderList
        p.sysLogList = state.policyDetailNew.sysLogList
        return p
    },
}
