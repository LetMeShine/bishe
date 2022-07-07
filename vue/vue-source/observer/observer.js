import { observer } from "./index"

export class Observer {
    constructor(data) {
        // 就是vue配置的data
        // 将用户的数据使用defineProperty
        this.walk(data)
    }
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            let value = data[key]
            defineReactive(data, key, value)
        })
    }
}

export function defineReactive(data, key, value) {
    // 如果value仍是一个object
    observer(value)// 递归观察
    Object.defineProperty(data, key, {
        get() {
            console.log('响应式的get')
            return value
        },
        set(val) {
            console.log('响应式set')
            if (val === value) return
            value = val
        }
    })
}

