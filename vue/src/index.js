import Vue from "vue";

let vm = new Vue({
    el: "#app",
    data: {
        msg: 'hello',
        father: {
            name: 'jack'
        }
    }
})
console.log(vm.father.name)
vm.father.name = 'hhhh'
console.log(vm.father.name)
