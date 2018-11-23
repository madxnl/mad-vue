<template>
  <div>
    <p>Buttons can be flat, raised, with or without background, and in any color and size.</p>
    <code-example name="ButtonExample" />
    <table class="component-api-table">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>color</td>
        <td>String</td>
        <td>null</td>
        <td>One of the colors from the $colors list, or a custom hex value like <code>"#123123"</code></td>
      </tr>
      <tr>
        <td>size</td>
        <td>String</td>
        <td>null</td>
        <td>One of the sizes in $fontsizes like <code>"xs"</code>, <code>"sm"</code>, <code>"lg"</code>, or <code>"xl"</code></td>
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
    </table>
  </div>
</template>

<script>
export default {
}
</script>
