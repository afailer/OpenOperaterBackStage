import searchInsur from '../modules/searchInsur'

export const youth = {
    youthAccountList: (state) => {
        let al = state.youth.youthUserList
        let t = al && al.map(item => {
            let e = []
            e.push(item)
            return e
        })
        return t
    },
    youthPolicyList: state => state.youth.youthPolicyList,
    youthTotalPremium: state => [state.youth.youthTotalPremium],
    youthPremiumList: state => state.youth.youthPremiumList,
    youthPremiumPage: state => state.youth.youthPremiumPage,
    youthUserStepList: state => state.youth.youthUserStepList,
    youthUserStepPage: state => state.youth.youthUserStepPage,
    youthUserDonationList: state => state.youth.youthUserDonationList,
    youthUserDonationPage: state => state.youth.youthUserDonationPage,
    youthUserRedPacket: state => state.youth.youthUserRedPacket
}

