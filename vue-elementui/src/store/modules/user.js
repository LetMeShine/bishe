/**
 * @fileoverview 登录限制，未登录或token过期不能访问网站
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {userInfo, logout} from '@/api/http'
Vue.use(Vuex)

const state = {
    roles:[] //用户角色
}
const getters = {
    roles:state =>state.roles
}
const mutations = {
    SETROLES:(state,d)=>{
        state.roles = d;
    }
}
const actions = {
    /**
     * @description 判断当前登录的状态
     */
    user({commit}){
        return new Promise((resolve,reject)=>{
            userInfo().then(({data})=>{
                commit('SETROLES',data.roles)
                resolve(data);
            }).catch(error=>{
                reject(error)
            })
        })
    },
    /**
     * @description 退出登录
     */
    logout({ commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SETROLES', [])
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}