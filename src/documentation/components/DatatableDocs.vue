<template>
  <div>
    <p>Interactive datatables allow users to navigate and sort data. Currently supports column sorting, pagination, and row selection.</p>
    <component-example path="DatatableExample">
      <template slot="api">
        <h4><code>mad-datatable</code></h4>

        <api-table>
          <template slot="props">
            <tr>
              <td>columns</td>
              <td>Array</td>
              <td></td>
              <td>Array of column objects. Each must contain a 'key' string.</td>
            </tr>
            <tr>
              <td>rows</td>
              <td>Array</td>
              <td></td>
              <td>Rows to display. Optional click handler.</td>
            </tr>
            <tr>
              <td>per-page</td>
              <td>Number</td>
              <td></td>
              <td>Set to maximum number of rows per page to enable pagination.</td>
            </tr>
            <tr>
              <td>value</td>
              <td>Array</td>
              <td></td>
              <td>Array of selected rows, shows row selection checkboxes if set. Use v-model for a two-way binding to row selection.</td>
            </tr>
          </template>
          <template slot="events">
            <tr>
              <td>input</td>
              <td>Array</td>
              <td>Selection of rows, emitted when user selects/deselects rows.</td>
            </tr>
          </template>
        </api-table>
      </template>
    </component-example>
  </div>
</template>

<script>
export default {
}
</script>
