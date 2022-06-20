import Cookies from 'js-cookie'

const tonkenKey = 'sessionId'

export function getToken() {
  return Cookies.get(tonkenKey)
}

export function removeToken() {
  return Cookies.remove(tonkenKey)
}
