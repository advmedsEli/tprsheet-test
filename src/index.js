import Tprsheet from './Tprsheet.vue'

const install = function (Vue) {
  Vue.component('Tprsheet', Tprsheet)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { Tprsheet }

export default install
