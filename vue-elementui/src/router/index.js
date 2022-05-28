/*
* 路由拦截
* 本地存储  不安全
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import permission from './modules/permission'
import Layout from '../layout/index.vue'
import Home from '../views/Home/home/index.vue'

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 常规配置
export const constantRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: '/index',
                name: 'index',
                meta: { title: '首页' },// 允许用户角色是input和approve的用户登录
                component: Home
            },
        ]
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: () => import('../views/Home/user/index.vue')
    }
]

// 动态配置
export const asyncRoutes = [
    {
        path: '/index',
        name: 'index',
        meta: { title: '首页', roles: ['input', 'approve'] },// 允许用户角色是input和approve的用户登录
        component: Home
    },
    {
        path: '/loan-input',
        name: 'loan-innput',
        meta: { title: '贷款申请', roles: ['input', 'input-manager'] },// 允许用户角色是approve的用户登录  是后端返回的
        component: () => import('../views/Home/loan-input/index.vue')
    },
    {
        path: '/input-manager',
        name: 'input-manager',
        meta: { title: '申请管理', roles: ['input'] },
        component: () => import('../views/Home/input-manager/index.vue')
    },
    {
        path: '/loan-approve',//贷款审批
        name: 'loan-approve',
        meta: { title: '贷款审批', roles: ['approve'] },
        component: () => import('../views/Home/loan-approve/index.vue'),
        children: [
            {
                path: '/first',//初审
                name: 'first',
                meta: { title: '初审' },
                component: () => import('../views/Home/loan-approve/first.vue')
            },
            {
                path: '/end',//终审
                name: 'end',
                meta: { title: '终审' },
                component: () => import('../views/Home/loan-approve/end.vue')
            },
        ]
    },
    {
        path: '/contract-manager',
        name: 'contract-manager',
        meta: { title: '标的管理', roles: ['approve'] },// 允许用户角色是approve的用户登录  是后端返回的
        component: () => import('../views/Home/contract-manager/index.vue')
    },
    permission,
]
const router = new VueRouter({
    routes: constantRoutes// 默认常规配置
})

export default router