/**
 * @fileoverview 根据权限展示路由
 */
import {constantRoutes, asyncRoutes} from '@/router'

/**
 * @description 过滤角色
 * 
 * @param {Array} routes 路由集合
 * @param {Array} name 过滤的姓名集合
 * @returns {Array} 过滤后的路由
 */
function filterAsyncRouter(routes, name) {
    // let data = routes.filter(route => {
    //     return route.meta && route.meta.roles && name.some(v => route.meta.roles.includes(v))
    // })
    let data  = routes
    name
    return data;
}

const state = {
    routes: []  //动态路由
}
const getters = {
    get_routes: state => state.routes,
}
const actions = {
    /**
     * @description 通过角色来过滤路由
     * 
     * @param {String} rolesName 角色姓名
     * @returns {Array} 过滤后的路由
     */
    generateroutes({commit}, rolesName) {
        return new Promise((resolve) => {
            let _routes;
            let home = constantRoutes.filter(v => v.path == '/home')[0];   //
            home.children = []; //清除
            if (rolesName.includes('administrator')) {  //是否是管理员
                home.children = asyncRoutes;
            } else {
                let filterRouter = filterAsyncRouter(asyncRoutes, rolesName);
                home.children = filterRouter;
            }
            _routes = [home] || [];
            commit('SET_ROUTES', _routes);
            resolve(_routes)
        })
    }
}
const mutations = {
    /**
     * @description 更新路由
     * 
     * @param {*} state 
     * @param {*} routes 
     */
    SET_ROUTES: (state, routes) => {
        state.routes = routes;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
