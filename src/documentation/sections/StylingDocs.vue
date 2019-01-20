<template>
  <div>
    <p>
      The default colors and font-sizes used by Mad-Vue can be overridden by defining your own variables before importing Mad-Vue styling. You will need to create two files: <code>_my-vars.scss</code> and <code>my-app.scss</code>. Here's an example:
    </p>
    <code-block class="card" filename="src/scss/_my-vars.scss">
      // Change colors and set primary theme color:
      $red: #4296e6;
      $primary: $red;

      // Then import Mad-Vue vars:
      @import '~@madxnl/mad-vue/src/scss/vars.scss';
    </code-block>
    <code-block class="card" language="scss" filename="src/scss/my-app.scss">
      @import './my-vars.scss';
      @import '~@madxnl/mad-vue/src/scss/main.scss';

      // Additional global styling rules and imports go here
    </code-block>
    <p>
      Change the style import in <code>main.js</code> to point to your custom scss:
    </p>
    <code-block class="card" filename="src/main.js">
      // import '@madxnl/mad-vue/src/scss/main.scss'
      import './scss/my-app.scss'
    </code-block>
    <p>
      You can import the customized SCSS variables into your own components as well:
       <!-- Be sure to import only variables, otherwise you will end up duplicating CSS rules. -->
    </p>
    <code-block class="card" filename="my-component.vue">
      &lt;style lang="scss" scoped&gt;
      @import 'src/scss/my-vars';

      .my-component {
        color: $primary;
      }
      &lt;&#47;style&gt;
    </code-block>
    <p>
      See <a href="https://github.com/madxnl/mad-vue/blob/master/src/scss/vars.scss"><code>vars.scss</code></a> for a full list of variables that can be overridden.
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
