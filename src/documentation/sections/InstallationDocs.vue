<template>
  <div>
    <p>
      See <a target="_blank" href="https://cli.vuejs.org/guide/installation.html">the Vue CLI documentation</a> for details on how to create a Vue.js project.
    </p>
    <p>
      <em>Be sure to select CSS pre-processors during the setup because Mad-Vue uses SCSS for styling.</em>
    </p>
    <code-block class="card">
      <pre>
npm install @madxnl/mad-vue</pre>
    </code-block>
    <p>
      Add the following lines to <code>main.js</code> and you're good to go:
    </p>
    <code-block class="card" filename="./src/main.js">
      <pre>
import Vue from 'vue'
import App from './App.vue'
import MadVue from '@madxnl/mad-vue' // Import mad-vue
import '@madxnl/mad-vue/src/scss/main.scss' // Import styling

Vue.config.productionTip = false

Vue.use(MadVue) // Load plugin, must be before Vue.use

new Vue({
  render: h => h(App)
}).$mount('#app')
</pre>
    </code-block>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
// @import '~@/scss/vars';
</style>
