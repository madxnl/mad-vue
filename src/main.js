import Vue from 'vue'

Vue.config.productionTip = false

import MadVue from './mad-vue'
import Documentation from './docs/Documentation.vue'

Vue.use(MadVue)

Vue.component('CodeExample', require('./docs/components/CodeExample').default)
Vue.component('CodeBlock', require('./docs/components/CodeBlock').default)
Vue.component('ApiTable', require('./docs/components/ApiTable').default)

new Vue({
  render: h => h(Documentation)
}).$mount('#app')
