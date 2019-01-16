<template>
  <div>
    <p>
      Color variables used by Mad-Vue can by customized as follows:
      Create two SCSS files, <code>app-vars.scss</code> and <code>my-app.scss</code>.
      This lets you use the variables in your own components later as well. Here's an example:
    </p>
    <code-block class="card" filename="src/scss/app-vars.scss">
      // Override colors:
      $red: #4296e6;
      $primary: $red;

      // Then import Mad-Vue vars:
      @import '~@madxnl/mad-vue/src/mad-vue/scss/vars.scss';
    </code-block>
    <code-block class="card" language="scss" filename="src/scss/my-app.scss">
      @import './app-vars.scss';
      @import '~@madxnl/mad-vue/src/mad-vue/scss/mad-vue.scss';

      // Additional global styling rules and imports go here
    </code-block>
    <p>
      Change the style import in <code>main.js</code> to point to your custom scss:
    </p>
    <code-block class="card" filename="src/main.js">
      // import '@madxnl/mad-vue/src/mad-vue/scss/mad-vue.scss'
      import './scss/my-app.scss'
    </code-block>
    <p>
      Now you can easily import SCSS variables into components:
       <!-- Be sure to import only variables, otherwise you will end up duplicating CSS rules. -->
    </p>
    <code-block class="card" filename="my-component.vue">
      &lt;style lang="scss" scoped&gt;
      @import 'src/scss/app-vars';

      .my-component {
        color: $primary;
      }
      &lt;&#47;style&gt;
    </code-block>
    <p>
      See <a href="https://github.com/madxnl/mad-vue/blob/master/src/mad-vue/scss/vars.scss"><code>vars.scss</code></a> for a full list of variables that can be overridden.
    </p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
// @import '~@/scss/vars';
</style>
