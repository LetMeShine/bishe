import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
//如果echart版本有问题可以改为4.9.0

// 引入全局定义组件
import './components/global'
// 引入全局定义的过滤器
import './filters'
// 路由拦截
import './routerStop'// 退出登录记得清空store
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
