<template>
  <div>
    <p>
      A form consists of a <code>&lt;mad-form&gt;</code> component containing one or more <code>&lt;mad-form-item&gt;</code> components.
      When the submit event is triggered inside a form (for example by clicking a button with <code>type="submit"</code>), all form-item components will be validated.
      The form will emit the "submit" event only if all form-items are valid.
    </p>
    <code-example name="FormExample" />

    <h4><code>mad-form</code></h4>
    <table class="component-api-table">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>submit</td>
        <td>String</td>
        <td>null</td>
        <td>One of the colors from the $colors list, or a custom hex value like <code>"#123123"</code></td>
      </tr>
    </table>
    <table class="component-api-table">
      <tr>
        <th>Event</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>submit</td>
        <td>Emitted when submit event is triggered inside form and all form-items are validated succesfully</td>
      </tr>
    </table>

    <h4><code>mad-form-item</code></h4>
    <table class="component-api-table">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>label</td>
        <td>String</td>
        <td>null</td>
        <td>Label text</td>
      </tr>
    </table>
    <table class="component-api-table">
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>label</td>
        <td>Label slot, use in place of label prop when you need to show html inside label</td>
      </tr>
    </table>


  </div>
</template>

<script>
export default {
}
</script>
