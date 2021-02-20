import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import user from './modules/user'
const state = {

}
const mutations = {

}
const actions = {

}
const modules = {
    user,
}
const router = new Vuex.Store({
    state,
    mutations,
    actions,
    modules
});
export default router