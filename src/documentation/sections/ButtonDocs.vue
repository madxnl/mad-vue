<template>
  <div>
    <p>Buttons can be raised or flat, and in any color and size.</p>
    <code-example name="ButtonExample">

      <template slot="api">

        <h4><code>mad-form</code></h4>

        <api-table>
          <template slot="props">
            <tr>
              <td>color</td>
              <td>String</td>
              <td></td>
              <td>A color name or custom hex/rgb string</td>
            </tr>
            <tr>
              <td>size</td>
              <td>String</td>
              <td></td>
              <td>"tiny", "small", "large", or "huge", or a valid css font-size</td>
            </tr>
            <tr>
              <td>variant</td>
              <td>String</td>
              <td></td>
              <td>Set to "flat" or "pill" (todo) for alternate button styles</td>
            </tr>
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
            <tr>
              <td>loading</td>
              <td>Boolean</td>
              <td>false</td>
              <td>Disable button and show a loading indicator</td>
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
