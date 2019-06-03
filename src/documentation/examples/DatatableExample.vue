<template>
  <div>
    <mad-datatable
      :rows="rows" :columns="columns"
      v-model="selectedRows"
      :per-page="10">
      <template slot="flag-label">
        Flag
      </template>
      <template slot="flag" slot-scope="{row}">
        <mad-icon :flag="row.alpha2Code"/>
      </template>
    </mad-datatable>
  </div>
</template>

<script>
import fetch from 'unfetch'

export default {
  data: () => ({
    selectedRows: [],
    countries: [],
    columns: [
      { key: 'name', sort: 'name' },
      { key: 'capital', sort: row => row.capital },
      { key: 'region', sort: row => row.region },
      { key: 'population', sort: row => row.population },
      { key: 'flag' },
    ],
  }),

  computed: {
    rows() {
      return this.countries.map(country => ({
        ...country,
        click(e) {
          alert(country.name)
        },
      }))
    },
  },

  async created() {
    const res = await fetch('https://restcountries.eu/rest/v2/')
    this.countries = res.status == 200 ? await res.json() : []
  },
}
</script>
