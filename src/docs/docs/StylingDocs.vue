<template>
  <div>
    <p>
      To customize colors and other variables it is recommended to create at least two scss files, one for scss variable declarations and one for actual styling rules.
    </p>
    <figure class="container">
      <code-block>
        // scss/vars.scss

        $red: #4296e6; // override shade of red
        $primary: $red; // override primary theme color
        $custom-var: 200px; // custom variables

        @import '~@madxnl/mad-vue/src/scss/vars.scss';
      </code-block>
    </figure>
    <figure class="container">
      <code-block language="scss">
        // scss/my-app.scss

        @import './vars.scss';
        @import '~@madxnl/mad-vue/src/scss/mad-vue.scss';

        // Custom styling goes here
      </code-block>
    </figure>
    <p>
      Remove the Mad-Vue style import from your <code>main.js</code> and instead import your new main scss file:
    </p>
    <figure class="container">
      <code-block>
        // main.js
        
        import './scss/my-app.scss'
      </code-block>
    </figure>
    <p>
      See <a href="https://github.com/madxnl/mad-vue/blob/develop/src/mad-vue/scss/vars.scss"><code>vars.scss</code></a> for a full list of variables that can be overridden.
    </p>
    <p>
      You can also import scss variables in your custom components:
    </p>
    <figure class="container">
      <code-block>
        // components/some-component.vue
        
        &lt;style lang="scss" scoped&gt;
        @import 'src/scss/vars';

        .some-component {
          color: $primary;
          width: $custom-var;
        }
        &lt;&#47;style&gt;
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
