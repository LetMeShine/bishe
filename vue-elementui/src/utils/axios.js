/**
 * @fileoverview axios拦截
 */
import axios from 'axios'
import {getToken} from "./token";
import {Message} from 'element-ui'

const tokenKey = 'token'

axios.defaults.baseURL = 'http://139.196.42.209:5004/api';
// 添加请求拦截器 在发送请求之前做些什么
axios.interceptors.request.use((config) => {
    // 将token加入到请求头
    config.headers[tokenKey] = getToken();
    return config;
});

//添加响应拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    let {code,msg} = response.data;
    // let {message} = response.data.data;
    if(code !== 200){
        Message({
            message: msg,
            type: 'warning',
            duration: 2000
        })
    }
    return response;
},err => {
    // 对响应错误做点什么
    Message({
        message: '请求错误',
        type: 'error',
        duration: 2000
    })
    return Promise.reject(err);
})

export default axios