/**
 * @fileoverview 全局store
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import user from './modules/user'
import permission from './modules/permission'
const state = {

}
const mutations = {

}
const actions = {

}
const modules = {
    user,
    permission
}
const router = new Vuex.Store({
    state,
    mutations,
    actions,
    modules
});
export default router