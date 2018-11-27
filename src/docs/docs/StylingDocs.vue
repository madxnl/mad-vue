<template>
  <div>
    <p>
      Colors and other SCSS variables can be customized before importing component styling.
      It is recommended to create at least two separate SCSS files, one for variables and one for global styling.
      This is so you can import SCSS variables in your own components later. Here's an example:
    </p>
    <figure class="container">
      <code-block>
        // src/scss/vars.scss

        $red: #4296e6; // override shade of red
        $primary: $red; // override primary theme color

        @import '~@madxnl/mad-vue/src/scss/vars.scss';
      </code-block>
    </figure>
    <figure class="container">
      <code-block language="scss">
        // src/scss/my-app.scss

        @import './vars.scss';
        @import '~@madxnl/mad-vue/src/scss/mad-vue.scss';

        // Your styling goes here
      </code-block>
    </figure>
    <p>
      Change the style import in <code>main.js</code> to point to your new main scss file instead:
    </p>
    <figure class="container">
      <code-block>
        // src/main.js
        
        import './scss/my-app.scss'
      </code-block>
    </figure>
    <p>
      Be sure to import only the SCSS variables for use inside your components, or you will end up duplicating CSS rules.
    </p>
    <figure class="container">
      <code-block>
        // my-component.vue
        
        &lt;style lang="scss" scoped&gt;
        @import 'src/scss/vars';

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
