<template>
  <div>
    <p>Todo</p>
    <code-example name="DatatableExample">

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
