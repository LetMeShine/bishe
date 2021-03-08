/**
 * @fileoverview 注册全局的过滤器，也可以用这种方式注册全局的组件
 */
import Vue from 'vue'
import * as filters from './filters'  //相当于取出所有的过滤器  filters是一个对象

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])
})

