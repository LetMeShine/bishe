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
        component: ()=> import('../layout/index.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router