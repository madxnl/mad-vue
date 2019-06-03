<template>
  <div>
    <p>
      A form consists of a <code>&lt;mad-form&gt;</code> component containing one or more <code>&lt;mad-form-item&gt;</code> components.
      When the submit event is triggered inside a form (for example by clicking a button with <code>type="submit"</code>), all form-item components will be validated.
      The form will emit the "submit" event only if all form-items are valid.
    </p>

    <code-example name="FormExample">

      <template slot="api">

        <h4><code>mad-form</code></h4>

        <api-table>
          <template slot="props">
            <tr>
              <td>submit</td>
              <td>String</td>
              <td>null</td>
              <td>One of the colors from the $colors list, or a custom hex value like <code>"#123123"</code></td>
            </tr>
          </template>
          <template slot="events">
            <tr>
              <td>submit</td>
              <td></td>
              <td>Emitted when submit event is triggered inside form and all form-items are validated succesfully</td>
            </tr>
          </template>
        </api-table>

        <h4><code>mad-form-item</code></h4>
        
        <api-table>
          <template slot="props">
            <tr>
              <td>label</td>
              <td>String</td>
              <td>null</td>
              <td>Label text</td>
            </tr>
          </template>
          <template slot="events">
          </template>
          <template slot="slots">
            <tr>
              <td>label</td>
              <td>Label slot, use in place of label prop when you need to show html inside label</td>
            </tr>
          </template>
        </api-table>
        
      </template>

    </code-example>


  </div>
</template>
