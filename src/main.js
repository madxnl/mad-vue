import Vue from 'vue'

import MadVue from './plugin'
import Documentation from './documentation/Documentation.vue'

import CodeExample from './documentation/components/CodeExample'
import CodeBlock from './documentation/components/CodeBlock'
import ApiTable from './documentation/components/ApiTable'

Vue.config.productionTip = false

Vue.use(MadVue)

Vue.component('CodeExample', CodeExample)
Vue.component('CodeBlock', CodeBlock)
Vue.component('ApiTable', ApiTable)

new Vue({
  render: h => h(Documentation),
}).$mount('#app')
