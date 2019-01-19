<template>
  <div>
    <p>
      See <a target="_blank" href="https://cli.vuejs.org/guide/installation.html">the Vue CLI documentation</a> for details on how to create a Vue.js project.
      Be sure to select CSS pre-processors during the setup because Mad-Vue uses SCSS for styling.
    </p>
    <code-block class="card">
      npm install @madxnl/mad-vue
    </code-block>
    <p>
      Add the following lines to <code>main.js</code> and you're good to go:
    </p>
    <code-block class="card">
      import MadVue from '@madxnl/mad-vue'
      import '@madxnl/mad-vue/src/mad-vue/scss/main.scss'

      Vue.use(MadVue)
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
