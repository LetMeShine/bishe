import Vue from 'vue'
import Vuex from './vuex'

// 使用，就需要install
Vue.use(Vuex)

// new 的是Vuex.Store
export default new Vuex.Store({
    state: {
        name: 'wht'
    },
    getters: {
        getName(state) {
            return state.name
        }
    },
    mutations: {// 同步
        // payload——传入的参数
        syncGood(state, payload) {
            state.name += payload
        }
    },
    actions: {// 异步
        asyncGood({ commit }, payload) {
            setTimeout(() => {
                commit('syncGood', payload)
            }, 1000)
        }
    },
    modules: {
        it: {
            state: {
                count: 100
            },
            getters: {
                getCount(state) {
                    return state.count
                }
            },
            mutations: {
                addCount(state, payload) {
                    state.count += payload
                }
            },
            actions: {
                asyncAddCount(state, payload) {
                    state.count += payload
                }
            },
            modules: {
                java: {
                    state: {
                        n: 10
                    }
                }
            }
        },
        hr: {
            state: {
                count: 8
            },
        },
    }
})
