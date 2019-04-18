<template>
  <div>
    <p>
      The default colors and font-sizes used by Mad-Vue can be overridden by defining your own variables before importing Mad-Vue styling. Here's an example:
    </p>
    <p>
      1. Create <code>src/scss/_my-vars.scss</code>:
    </p>
    <code-block class="card" filename="src/scss/_my-vars.scss">
      <pre>
// Change colors and set primary theme color:
$red: #d14d14;
$primary: $red;

// Then import Mad-Vue vars:
@import '~@madxnl/mad-vue/src/scss/vars.scss';</pre>
    </code-block>
    <p>
      2. Create <code>src/scss/my-app.scss</code>:
    </p>
    <code-block class="card" language="scss" filename="src/scss/my-app.scss">
      <pre>
@import './my-vars.scss';
@import '~@madxnl/mad-vue/src/scss/main.scss';

// Additional global styling rules and imports go here</pre>
    </code-block>
    <p>
      3. Change the style import in <code>main.js</code> to point to your custom scss:
    </p>
    <code-block class="card" filename="src/main.js">
      <pre>
// import '@madxnl/mad-vue/src/scss/main.scss'
import './scss/my-app.scss'</pre>
    </code-block>
    <p>
      (4.) You can import the customized SCSS variables into your own components as well:
      <!-- Be sure to import only variables, otherwise you will end up duplicating CSS rules. -->
    </p>
    <code-block class="card" filename="my-component.vue">
      <pre>
&lt;style lang="scss" scoped&gt;
@import 'src/scss/my-vars';

.my-component {
  color: $primary;
}
&lt;&#47;style&gt;</pre>
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
