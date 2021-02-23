import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import Dev from './serve.vue'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Dev({
  propsData: {
    componentFrom: process.env.VUE_APP_SERVE_FROM || 'source'
  }
}).$mount('#app')
