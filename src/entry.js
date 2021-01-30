import component from '@/big-shot.vue'

// install function executed by Vue.use()
const install = function installBigShot (Vue) {
  Vue.component('big-shot', component)
}


// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install

// Export component by default
export default { install }
