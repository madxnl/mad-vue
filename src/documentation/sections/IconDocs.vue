<template>
  <div>
    <p>
      The <code>&lt;mad-icon&gt;</code> component supports the 2400+ icons from the <a href="https://materialdesignicons.com/">Material Design Icons' collection</a>, as well as country flag icons using <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a>.</p>
    <code-example name="IconExample">

      <template slot="api">

        <h4><code>mad-icon</code></h4>
      
        <api-table>
          <template slot="props">
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
              <td>Set to two-letter country code to display a flag icon using <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a></td>
            </tr>
          </template>
        </api-table>
      </template>
        
    </code-example>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
