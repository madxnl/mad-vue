import Vue from 'vue'

Vue.config.productionTip = false

import MadVue from './mad-vue'
import Documentation from './docs/Documentation.vue'

Vue.use(MadVue)

new Vue({
  render: h => h(Documentation)
}).$mount('#app')
