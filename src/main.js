import Vue from 'vue'
// import router from './router'

import MadVue from './plugin'

import ComponentExample from './documentation/components/ComponentExample'
import CodeBlock from './documentation/components/CodeBlock'
import Documentation from './documentation/Documentation'

Vue.config.productionTip = false

Vue.use(MadVue, {
  theme: {
  },
})

Vue.component('ComponentExample', ComponentExample)
Vue.component('CodeBlock', CodeBlock)

new Vue({
  // router,
  render: h => h(Documentation),
}).$mount('#app')
