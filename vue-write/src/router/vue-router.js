// 手写vue-router
// 路由有两种模式
// // 1.hash
// // 1.1 带# 界面加载完成 刷新不报错，因为是在已有资源后面加的#
// window.addEventListener('load', () => {
//     let hashUrl = location.hash.slice(1);// 去掉#
//     console.log(hashUrl)
// })
// // 1.2 hash改变的时候监听
// window.addEventListener('hashchange', () => {
//     let hashUrl = location.hash.slice(1);// 去掉#
//     console.log(hashUrl)
// })

// // 2. history 刷新会报错404，因为资源不存在，需要后端支持
// // 2.1 监听回退
// window.addEventListener('popstate', () => {
//     let historyUrl = location.pathname
//     console.log(historyUrl)
// })
// // 2.2 点击用history跳转
// function go(pathname) {
//     // state 可通过history.state读取
//     // title 标题
//     // url  改变后的url
//     // 入栈
//     history.pushState({}, null, pathname)
//     console.log(pathname)
// }


// 1.vuerouter实例 每个组件都有$router(当前路由实例，可跳转)  $route(当前的路由)
// 2.初始化页面模式 hash还是history
// 3.根据routes创建路由表
// 4.<router-link>---router--path
// 5.<router-view>---router--component

// 记录当前的页面的url状态
class HistoryRoutes {
    constructor() {
        this.current = null;// 存储当前路由的状态
    }
}
class VueRouter {
    constructor(options) {
        // mode
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        // 根据routes 创建路由表 {'/':Home}
        this.routesMap = this.createdRouteMap(this.routes)
        console.log('this.routesMap:', this.routesMap)

        // 初始化路由，对页面监听
        this.history = new HistoryRoutes()
        this.init()
    }
    init() {
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = '/';//默认值
            // 需要记录当前页面的url状态
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            // history
            location.pathname ? '' : location.pathname = '/'
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }
    // 创建路由表——多层嵌套——reduce
    createdRouteMap(routes) {
        return routes.reduce((mapObj, currenRoute) => {
            mapObj[currenRoute['path']] = currenRoute['component']
            return mapObj
        }, {})
    }
}
VueRouter.install = function (Vue) {
    // 给所有组件添加beforeCreate,组件渲染顺序是根->子
    Vue.mixin({
        beforeCreate() {
            // this.$options == new Vue的是传进来的router参数
            console.log('组件的name:', this.$options.name)
            if (this.$options && this.$options.router) {
                // root
                this._root = this;// 将当前Vue实例挂在在_root上
                this._router = this.$options.router;// 当前路由实例
                // 如果history.current发生变化，则刷新触发试图
                Vue.util.defineReactive(this, '', this._router.history)
            } else {
                // child
                this._root = this.$parent && this.$parent._root
            }
            // $router
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router
                }
            })
            // $route
            Object.defineProperty(this, '$route', {
                get() {
                    return {
                        current: this._root._router.history.current
                    }
                }
            })
        }
    })

    // <router-link>
    Vue.component('router-link', {
        props: {
            to: String
        },
        render() {
            let mode = this._self._root._router.mode
            return <a href={mode === 'hash' ? `#${this.to}` : this.to}>
                {this.$slots.default}
            </a>
        }
    })
    // <router-view>
    Vue.component('router-view', {
        render(h) {
            let currenRoute = this._self._root._router.history.current;//当前的路由 name
            let routesMap = this._self._root._router.routesMap;// 路由表
            let currentComponent = routesMap[currenRoute]
            return h(currentComponent)
        }
    })
}

export default VueRouter