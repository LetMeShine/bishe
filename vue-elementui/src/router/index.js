import Vue from 'vue'
import VueRouter from 'vue-router'
import permission from './modules/permission'

Vue.use(VueRouter);

const  routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/index',
        component: ()=> import('../layout/index.vue'),
        children:[
            {
                path: '/index',
                name: 'index',
                meta: {title: '首页', roles:['input','approve']},// 允许用户角色是input和approve的用户登录
                component: ()=>import('../views/Home/home/index.vue')
            },
            {
                path: '/loan-input',
                name: 'loan-innput',
                meta: {title: '贷款申请', roles:['input']},// 允许用户角色是approve的用户登录  是后端返回的
                component: ()=>import('../views/Home/loan-input/index.vue')
            },
            {
                path: '/input-manager',
                name: 'input-manager',
                meta: {title: '申请管理', roles:['input']},// 允许用户角色是approve的用户登录  是后端返回的
                component: ()=>import('../views/Home/input-manager/index.vue')
            },
            {
                path: '/loan-approve',//贷款审批
                name: 'loan-approve',
                meta: {title:'贷款审批'},
                component: ()=>import('../views/Home/loan-approve/index.vue'),
                children: [
                    {
                        path: '/first',//初审
                        name: 'first',
                        meta: {title:'初审'},
                        component: ()=>import('../views/Home/loan-approve/first.vue')
                    },
                    {
                        path: '/end',//终审
                        name: 'end',
                        meta: {title:'终审'},
                        component: ()=>import('../views/Home/loan-approve/end.vue')
                    },
                ]
            },
            {
                path: '/contract-manager',
                name: 'contract-manager',
                meta: {title: '标的管理', roles:['input']},// 允许用户角色是approve的用户登录  是后端返回的
                component: ()=>import('../views/Home/contract-manager/index.vue')
            },
            {
                path: '/permission',//权限管理
                name: 'permission',
                meta: {title:'权限管理'},
                component: ()=>import('../views/Home/permission/index.vue'),
                children: [
                    {
                        path: '/create',//创建用户
                        name: 'create',
                        meta: {title:'创建用户'},
                        component: ()=>import('../views/Home/permission/Create.vue')
                    },
                    {
                        path: '/userList',//列表展示
                        name: 'userList',
                        meta: {title:'列表展示'},
                        component: ()=>import('../views/Home/permission/UserList.vue')
                    }
                ]
            },
        ]
    },
    permission,  // 去掉注释会报错
]

const router = new VueRouter({
    routes
})

export default router

/*
* 路由拦截
* 本地存储  不安全
* */