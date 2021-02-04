import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import Dev from './serve.vue'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Dev)
}).$mount('#app')
