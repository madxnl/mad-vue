<template>
  <div>
    <p>Buttons can be flat, raised, with or without background, and in any color and size.</p>
    <code-example name="ButtonExample" />

    <api-table name="mad-button">
      <template slot="props">
        <tr>
          <td>color</td>
          <td>String</td>
          <td>null</td>
          <td>One of the available colors or a custom hex value</td>
        </tr>
        <tr>
          <td>flat</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Apply flat button style</td>
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
        <tr>
          <td>loading</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Disable button and show a loading indicator</td>
        </tr>
        <tr>
          <td>type</td>
          <td>String</td>
          <td>"button"</td>
          <td>Set to "submit" to trigger form submit event on click</td>
        </tr>
      </template>
    </api-table>
    
  </div>
</template>

<script>
export default {
}
</script>
