// 防抖输入2秒再执行方法（延迟执行）
export function debounce(fn, wait) {
    let timer
    return function (...agr) {
        // 注意使用this的指向
        let that = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, agr)
        }, wait)
    }
}
// 输入完毕立即执行查询，过2秒后才能再查询（立即执行）
export function debounce2(fn, wait) {
    let timer
    return function (...agr) {
        // 注意使用this的指向
        let that = this
        if (timer) clearTimeout(timer)
        let callNow = !timer
        timer = setTimeout(function () {
            timer = null
        }, wait)
        if (callNow) fn.apply(that, agr)
    }
}

// 节流不管触发多少次，我就是按照2秒后才执行方法，不会干扰方法的执行
export function throttle(fn, wait) {
    let timer
    return function (...agr) {
        // 注意使用this的指向
        let that = this
        if (!timer) {
            timer = setTimeout(function () {
                timer = null
                fn.apply(that, agr)
            }, wait)
        }
    }
}
// 时间戳
export function throttle2(fn, wait) {
    // 上次记录的时间
    let prev = 0
    return function (...agr) {
        // 当前时间
        let now = Date.now()
        // 当前时间-上次记录的时间 > 等待时间
        if (now - prev > wait) {
            // 执行函数
            fn.apply(this, agr)
            // 重置上次记录的时间
            prev = now
        }
    }
}
