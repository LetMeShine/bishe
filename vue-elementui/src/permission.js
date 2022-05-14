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
        // 2.正常登录,用户信息 判断是否登录了，如果登录了，那么store会把用户信息存储下来
        let role = store && store.getters.roles && store.getters.roles.length > 0;
        if (role) {
            next();
        } else {
            // 获取角色，发请求 await  没有登陆，那就是需要获取用户信息
            let {roles} = await store.dispatch('user');
            if(!roles){ 
                // 请求不到说明token不对，跳转登录页面
                next({path: '/login'})
            } else { 
                // 能请求到的，就是token对的 那么就可以访问了
                //取出当前角色的权限
                let rolesName= roles.map(v => v.type);
                //过滤角色 根据当前拥有的权限，去store里面动态取出当前的路由
                let filterRoutes = await store.dispatch('generateroutes',rolesName);
                //动态添加
                router.addRoutes(filterRoutes);
            }
            if (roles) {
                // 页面刷新的话，保持在当前页面
                next({...to});
            } else {
                next({path: '/login'})
            }
        }
    }
})