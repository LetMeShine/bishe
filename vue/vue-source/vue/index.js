console.log('vue....')
import { initState } from '../observer'
function Vue(options) {
    this._init(options)
}

Vue.prototype._init = function (options) {
    let vm = this
    vm.$options = options
    initState(vm)
}
export default Vue