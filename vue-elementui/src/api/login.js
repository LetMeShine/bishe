import request from '@/utils/request'

export function login(data) { //登录
    return request({
        method: 'post',
        url:'/user/login',
        data: data
    })
}

export function logout(data) { //退出
    return request({
        method: 'post',
        url:'/user/logout',
        data
    })
}
