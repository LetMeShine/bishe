/**
 * @fileoverview 将token存在localStorage
 */
const tokenKey = 'token'
// 存
export function setToken(token) {
    return localStorage.setItem(tokenKey,token);
}
//取
export function getToken() {
    return localStorage.getItem(tokenKey);
}
//删
export function removeToken() {
    return localStorage.removeItem(tokenKey)
}