<template>
  <div>
    <p>
      See <a href="https://cli.vuejs.org/guide/installation.html">the Vue CLI documentation</a> for details on how to create a new Vue.js project.
      Make sure to select the CSS pre-processors feature during setup to enable Sass support.
    </p>
    <figure class="container">
      <code-block>
        npm install @madxnl/mad-vue
      </code-block>
    </figure>
    <p>
      Then, add the following lines to <code>main.js</code> and you're good to go:
    </p>
    <figure class="container">
      <code-block filename="main.js">
        import MadVue from '@madxnl/mad-vue'
        import '@madxnl/mad-vue/src/mad-vue/scss/mad-vue.scss'

        Vue.use(MadVue)
      </code-block>
    </figure>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
// @import '~@/scss/vars';
</style>
