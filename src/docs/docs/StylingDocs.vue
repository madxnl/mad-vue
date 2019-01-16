<template>
  <div>
    <p>
      Color variables used by Mad-Vue can by customized as follows:
      Create two SCSS files, <code>app-vars.scss</code> and <code>my-app.scss</code>.
      This lets you use the variables in your own components later as well. Here's an example:
    </p>
    <figure class="container">
      <code-block>
        // File: src/scss/app-vars.scss

        // Override colors:
        $red: #4296e6;
        $primary: $red;

        // Then import Mad-Vue vars:
        @import '~@madxnl/mad-vue/src/mad-vue/scss/vars.scss';
      </code-block>
    </figure>
    <figure class="container">
      <code-block language="scss">
        // File: src/scss/my-app.scss

        @import './app-vars.scss';
        @import '~@madxnl/mad-vue/src/mad-vue/scss/mad-vue.scss';

        // Additional global styling rules and imports go here
      </code-block>
    </figure>
    <p>
      Change the style import in <code>main.js</code> to point to your custom scss:
    </p>
    <figure class="container">
      <code-block>
        // File: src/main.js
        
        // import '@madxnl/mad-vue/src/mad-vue/scss/mad-vue.scss'
        import './scss/my-app.scss'
      </code-block>
    </figure>
    <p>
      Now you can easily import SCSS variables into components. Be sure to import only variables, otherwise you will end up duplicating CSS rules.
    </p>
    <figure class="container">
      <code-block>
        // File: my-component.vue
        
        &lt;style lang="scss" scoped&gt;
        @import 'src/scss/app-vars';

        .my-component {
          color: $primary;
        }
        &lt;&#47;style&gt;
      </code-block>
    </figure>
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
