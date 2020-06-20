export const aixinbao = {
    axbAccountList: (state) => {
        let al = state.aixinbao.axbUserList
        let t = al && al.map(item => {
            let e = []
            e.push(item)
            return e
        })
        return t
    },
    axbCurInfo: state => state.aixinbao.axbCurInfo
}
