import Vue from 'vue'
import VueRouter from 'vue-router'

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
                component: ()=>import('../views/Home/home/index.vue')
            },
            {
                path: '/loan-input',
                name: 'loan-innput',
                component: ()=>import('../views/Home/loan-input/index.vue')
            },
            {
                path: '/input-manager',
                name: 'input-manager',
                component: ()=>import('../views/Home/input-manager/index.vue')
            },
            {
                path: '/loan-approve',//贷款审批
                name: 'loan-approve',
                component: ()=>import('../views/Home/loan-approve/index.vue'),
                children: [
                    {
                        path: '/first',//初审
                        name: 'first',
                        component: ()=>import('../views/Home/loan-approve/first.vue')
                    },
                    {
                        path: '/second',//复审
                        name: 'second',
                        component: ()=>import('../views/Home/loan-approve/second.vue')
                    },
                    {
                        path: '/end',//终审
                        name: 'end',
                        component: ()=>import('../views/Home/loan-approve/end.vue')
                    },
                ]
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router