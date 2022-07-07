import { Observer } from "./observer"

// 初始化状态
export function initState(vm) {
    let opts = vm.$options
    if (opts.data) {
        // vue的配置项有data就初始化data
        initData(vm)
    }
    if (opts.watch) {
        // vue的配置项有watch就初始化watch
        initWatch(vm)
    }
    if (opts.computed) {
        // vue的配置项有computed就初始化computed
        initComputed(vm)
    }
}

function initData(vm) {
    // vue里面配置的data
    let data = vm.$options.data
    // data有 {} fun
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    // 将vm.msg代理到vm._data.msg
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    // 观察数据，监听数据
    observer(vm._data)
}
// 将vm[key]代理到vm[source][key]
function proxy(vm, source, key) {
    // 访问或设置vm[key]的时候会触发这个方法
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(val) {
            vm[source][key] = val
        }
    })
}
// 监听数据——响应式
export function observer(data) {
    if (typeof data !== 'object' || data == null) return
    return new Observer(data)
}

function initWatch() { }
function initComputed() { }