/**
 * @fileoverview 访问拦截
 */
import router from './router'
import store from './store'
// 后端传递用户信息
// 路由拦截
router.beforeEach(async (to, from, next) => {
    // 1.是否是登录页
    if (to.path === '/login') {
        next();
    } else {
        // 正常登录,用户信息
        let role = store && store.getters.roles && store.getters.roles.length > 0;
        if (role) {
            next();
        } else {
            // 获取角色，发请求 await
            let {roles} = await store.dispatch('user');
            if(!roles){
                next({path: '/login'})
            } else {
                //取出角色
                let rolesName= roles.map(v=>v.name);
                //过滤角色
                let filterRoutes = await store.dispatch('generateroutes',rolesName);
                // console.log(roles,rolesName,filterRoutes,123)
                //动态添加
                router.addRoutes(filterRoutes);
            }
            if (roles) {
                next({...to});// 页面刷新的话，保持在当前页面
            } else {
                next({path: '/login'})
            }
        }
    }
})