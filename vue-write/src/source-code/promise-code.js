// 手写Promise
// 1.有三种状态
const SUCCESS = "fulfilled"
const FAILURE = "rejected"
const PENDING = "pending"

// 处理resolve返回的是一个prmoise
function resolvePromise(value, resolve, reject) {
    console.log(999)
    // value的值是一个prmoise
    if (typeof value === 'function' || typeof value === "object") {
        try {
            let then = value.then;
            if (typeof then === 'function') {
                // 调用then的方法 then的指向是promise对象
                then.call(value, x => {
                    resolvePromise(x, resolve, reject); //递归
                }, err => {
                    reject(err)
                })
            } else {
                resolve(value)
            }
        } catch (e) {
            reject(e)
        }
    } else {
        //返回普通值
        resolve(value);
    }
}

class Promise {
    constructor(executor) {
        // 当前 Prmoise 的状态
        this.status = PENDING
        // 存储成功的值
        this.value = ''
        // 失败的值
        this.reason = ''
        // 防止异步的时候，then是同步的，但是Promise里面的是异步的，status还是pending，所以报错回调的函数
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        console.log(1111)
        let resolve = value => {
            console.log(2222)
            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
            console.log(3333)
            if (this.status === PENDING) {
                this.status = FAILURE;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        // 执行方法
        try {
            // 传进来的new Promise参数（函数）在这个时候调用，函数内部也会调用 resolve, reject的参数
            console.log(4444)
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    // 同步执行
    then(onFulfilled, onRejected) { //成功回调  失败回调
        console.log(5555)
        return new Promise((resolve, reject) => {
            if (this.status === SUCCESS) {
                console.log(6666)
                let v = onFulfilled(this.value)
                resolvePromise(v, resolve, reject)
            }
            if (this.status === FAILURE) {
                console.log(7777)
                let v = onRejected(this.reason)
                resolvePromise(v, resolve, reject)
            }
            if (this.status === PENDING) {
                console.log(8888)
                this.onFulfilledCallbacks.push(() => {
                    // 存储调用成功的值
                    // then 成功的函数调用的数据 v
                    let v = onFulfilled(this.value)
                    resolvePromise(v, resolve, reject)
                })
                this.onRejectedCallbacks.push(() => {
                    // 存储调用失败的值
                    // then 失败的函数调用的数据 v
                    let v = onRejected(this.reason)
                    resolvePromise(v, resolve, reject)
                })
            }
        })
    }

}

module.exports = Promise