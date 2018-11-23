<template>
  <div>
    <p>
      The <code>&lt;mad-icon&gt;</code> component supports the 2400+ icons from the <a href="https://materialdesignicons.com/">Material Design Icons' collection</a>, as well as country flag icons using <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a>.</p>
    <code-example name="IconExample" />
    <table class="component-api-table">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>mdi</td>
        <td>String</td>
        <td>null</td>
        <td>The name of a <a href="https://materialdesignicons.com/">material design icon</a> to display</td>
      </tr>
      <tr>
        <td>flag</td>
        <td>String</td>
        <td>null</td>
        <td>Set to a country code to display a flag icon using <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
