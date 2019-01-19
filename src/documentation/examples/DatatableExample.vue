<template>
  <div>
    <mad-datatable :items="countries"
      :columns="columns" v-model="selection"
      :row-link="item => `https://restcountries.eu/rest/v2/name/${item.name}`"
      :per-page="10">
      <template slot="flag-label">
        Flag
      </template>
      <template slot="flag" slot-scope="{item}">
        <mad-icon :flag="item.alpha2Code"/>
      </template>
    </mad-datatable>
  </div>
</template>

<script>
import fetch from 'unfetch'

export default {
  data: () => ({
    selection: [],
    countries: [],
    columns: [
      { key: 'name', sort: true },
      { key: 'capital', sort: true },
      { key: 'region', sort: true },
      { key: 'population', sort: item => item.population },
      { key: 'flag' },
    ],
  }),

  methods: {
    clickRow(country) {

    },
  },

  async created() {
    const res = await fetch('https://restcountries.eu/rest/v2/')
    this.countries = res.status == 200 ? await res.json() : []
  },
}
</script>
