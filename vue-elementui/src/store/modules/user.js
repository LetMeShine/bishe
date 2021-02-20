import Vue from 'vue'
import Vuex from 'vuex'
import {userInfo,logout} from '@/api/http'
Vue.use(Vuex)

const state = {
    roles:[]//用户角色
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
    //异步
    // userInfo({commit}){
    //     commit
    //     return new Promise((resolve,reject)=>{
    //         resolve,reject
    //         //调用获取用户详情接口
    //         // userInfo().then()
    //         // 拿到数据后就存储在mutations里面
    //     })
    // }

    user({commit}){
        return new Promise((resolve,reject)=>{
            userInfo().then(res=>{
                console.log(res);
                let {data} = res.data;
                commit('SETROLES',data.roles)
                resolve(data);
            }).catch(error=>{
                reject(error)
            })
        })
    },
    // user logout
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