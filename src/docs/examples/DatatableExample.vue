<template>
  <div>
    <mad-datatable v-model="selected"
    :columns="[
      { text: 'col' },
    ]" :items="[
      { test: 5 },
    ]">
      <template slot-scope="{item}">
        <td>{{item.test}}</td>
      </template>
    </mad-datatable>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [],
  }),
  
  methods: {
  },
}
</script>
