/**
 * @description 全局组件的入口文件
 */
import Vue from 'vue';

const componentsContext = require.context('./',true, /\.js$/);

//注册全局组件
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component);
    // 兼容import export 和require module.export两种规范
    const ctrl = componentConfig.default || componentConfig;
    //加载全局组件
    if(ctrl && ctrl.name) {
        Vue.component(ctrl.name, ctrl);
    }
})