<template>
  <div>
    <p>
      See <a target="_blank" href="https://cli.vuejs.org/guide/installation.html">the Vue CLI documentation</a> for details on how to create a Vue.js project.
      Be sure to select CSS pre-processors during the setup because Mad-Vue uses SCSS for styling.
    </p>
    <code-block class="card">
      <pre>
npm install @madxnl/mad-vue</pre>
    </code-block>
    <p>
      Add the following lines to <code>main.js</code> and you're good to go:
    </p>
    <code-block class="card">
      <pre>
import MadVue from '@madxnl/mad-vue'
import '@madxnl/mad-vue/src/scss/main.scss'

Vue.use(MadVue)</pre>
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
