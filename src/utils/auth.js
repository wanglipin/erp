import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies(TokenKey)
}

export function setToken() {
  return Cookies(TokenKey)
}

export function removeToken() {
  return Cookies(TokenKey)
}
