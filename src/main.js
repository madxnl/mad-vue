import Vue from 'vue'

import MadVue from './plugin'
import Documentation from './documentation/Documentation.vue'

import ComponentExample from './documentation/components/ComponentExample'
import CodeBlock from './documentation/components/CodeBlock'

Vue.config.productionTip = false

Vue.use(MadVue)

Vue.component('ComponentExample', ComponentExample)
Vue.component('CodeBlock', CodeBlock)

new Vue({
  render: h => h(Documentation),
}).$mount('#app')
