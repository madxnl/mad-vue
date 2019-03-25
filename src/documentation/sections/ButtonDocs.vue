<template>
  <div>
    <p>Buttons can be raised or flat, and in any color and size.</p>
    <code-example name="ButtonExample">
      <template slot="api">
        <h4><code>mad-button</code></h4>

        <api-table>
          <template slot="props">
            <tr>
              <td>type</td>
              <td>String</td>
              <td>"button"</td>
              <td>Set to "submit" to trigger form submit event on click</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable button</td>
            </tr>
            <tr>
              <td>active</td>
              <td>Boolean</td>
              <td>false</td>
              <td>Style button as active</td>
            </tr>
          </template>
        </api-table>
      </template>
    </code-example>
  </div>
</template>

<script>
export default {
}
</script>
