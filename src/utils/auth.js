import Cookies from 'js-cookie'

const TokenKey = 'ADMIN_TOKEN'

export function getToken() {
    let token = window.localStorage.getItem(TokenKey)
    return token
}

export function setToken(token) {
    window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    window.localStorage.removeItem(TokenKey)
}
