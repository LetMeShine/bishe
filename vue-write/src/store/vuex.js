let Vue
const forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}
// 构建想要的树状结构
class ModuleCollection {
    constructor(options) {
        this.root = {}
        this.register([], options);// []---root
    }
    // pathArr---[it,java] 将子模块注册到根模块
    register(pathArr, rootModule) {
        let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        // 记录根节点
        if (pathArr.length === 0) {
            // 初始对象
            this.root = newModule
        } else {
            // 子模块——需要取到父模块——然后将 newModule 赋给父模块的_children
            // pathArr.slice(0,-1)父模块的路径
            let parent = pathArr.slice(0, -1).reduce((root, current) => {
                return this.root._children[current]
            }, this.root)
            parent._children[pathArr[pathArr.length - 1]] = newModule
            parent == this.root
        }
        // 递归
        if (rootModule.modules) {
            forEach(rootModule.modules, (moduleName, module) => {
                //pathArr---[it]
                this.register(pathArr.concat(moduleName), module);
            })
        }
    }
}
//递归模块树,安装所有模块的getters, mutations actions
//把所有的state放在一块{num:1,it:{count:100}}
//store---当前store  state---当前state  pathArr---模块路径  rootModule--根模块
const installModule = (store, state, pathArr, rootModule) => {
    //安装child state
    if (pathArr.length > 0) {
        //[it] {count: 100}
        //[it, java] {count: 100, it:{n:10}}
        //需要根据当前state找父state
        let parent = pathArr.slice(0, -1).reduce((state, current) => {
            return state[current];
        }, state);
        //把子state添加到父的state中
        Vue.set(parent, pathArr[pathArr.length - 1], rootModule.state);
    }
    //for getters
    let getters = rootModule._raw.getters;
    if (getters) {
        //把getters中属性定义到this.getters
        forEach(getters, (getterName, fn) => {
            Object.defineProperty(store.getters, getterName, {
                get: () => {
                    return fn(rootModule.state);
                }
                // get() { // 这个两个get方法有什么区别？ 为什么this纸箱不一样？？
                //     return fn(rootModule.state);
                // }
            })
        })
    }
    //for mutation
    let mutations = rootModule._raw.mutations;
    if (mutations) {//同名 {syncAdd:[fn,fn]}
        forEach(mutations, (mutationName, fn) => {
            let arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
            arr.push((payload) => {
                fn(rootModule.state, payload);
            })
        })
    }
    //for actions
    let actions = rootModule._raw.actions;
    if (actions) {//同名{asyncAdd:[fn,fn]}
        forEach(actions, (actionName, fn) => {
            let arr = store.actions[actionName] || (store.actions[actionName] = []);
            arr.push(payload => {
                fn(store, payload);
            })
        })
    }
    //递归
    forEach(rootModule._children, (moduleName, module) => {
        installModule(store, state, pathArr.concat(moduleName), module);
    })
}


// 手写vuex 
class Store {
    // options是我们使用的时候配置的参数
    constructor(options) {
        // 实现响应式 处理state
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })
        // 处理getter
        this.getters = {}
        // 处理 mutations
        this.mutations = {}
        // 处理 actions
        this.actions = {}

        // for getters
        // 1.
        // let getters = options.getters || {}
        // 把getters中属性定义到this.getters
        // Object.keys(getters).forEach(getterName => {
        //     Object.defineProperty(this.getters, getterName, {
        //         get() {
        //             return getters[getterName](this.state)
        //         }
        //     })
        // })
        // 2.
        // forEach(getters, (getterName, fn) => {
        //     Object.defineProperty(this.getters, getterName, {
        //         get: () => {
        //             return fn(this.state)
        //         }
        //     })
        // })

        // for mutations
        // 1.
        // let mutations = options.mutations || {}
        // 把mutations中属性定义到this.mutations
        // Object.keys(mutations).forEach(mutationName => {
        //     this.mutations[mutationName] = payload => {
        //         mutations[mutationName](this.state, payload)
        //     }
        // })
        // 2.
        // forEach(mutations, (mutationName, fn) => {
        //     this.mutations[mutationName] = payload => {
        //         // 这里的this是store实例，this.vm是vue实例
        //         fn(this.state, payload)
        //     }
        // })

        // for actions
        // 1.
        // let actions = options.actions || {}
        // 把mutations中属性定义到this.actions
        // Object.keys(actions).forEach(actionoName => {
        //     this.actions[actionoName] = payload => {
        //         actions[actionoName](this, payload)
        //     }
        // })
        // 2.
        // forEach(actions, (actionoName, fn) => {
        //     this.actions[actionoName] = payload => {
        //         fn(this, payload)
        //     }
        // })

        // 处理 modules 拿到模块树
        this.modules = new ModuleCollection(options || {})
        // 安装模块
        // 安装插件后会进入这里给vue挂在store
        installModule(this, this.state, [], this.modules.root);
    }
    get state() {
        return this.vm.state;
    }
    // 处理modules 树状结构
    dispatch(type, payload) {
        // this.actions[type](payload);
        // 重构modules后
        this.actions[type].forEach(fn => fn(payload));
    }
    commit = (type, payload) => {
        // this.mutations[type](payload)
        // 重构modules后
        this.mutations[type].forEach(fn => fn(payload));
    }

    //modules数据处理---树状结构---
    // let root = {
    //     _raw: rootModule,
    //     state: {num: 1},
    //     _children: {
    //         it: {
    //             _raw: itModule,
    //             state: {},
    //             _children: {}
    //         },
    //         hr: {
    //             _raw: hrModule,
    //             state: {},
    //             _children: {}
    //         }
    //     }
    // }
}

// 安装插件
// 目的：让每一个组件都注册一个beforeCreate
const install = (_Vue) => {
    Vue = _Vue
    // 给每一个组件都注册一个beforeCreate
    // 第一次进入是赋值给 this.$store 是 undefined
    // 然后会进入 Store 的构造函数里面去
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                // 根
                this.$store = this.$options.store
            } else {
                // 子
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}

export default {
    install, Store
}