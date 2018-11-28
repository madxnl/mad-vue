<template>
  <div class="space">
    <mad-form-item label="Simple select">
      <mad-select v-model="selectedValue">
        <mad-option value="a">Option A</mad-option>
        <mad-option value="b">Option B</mad-option>
        <mad-option value="c">Option C</mad-option>
        <mad-option value="d">Option D</mad-option>
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Multiple select">
      <mad-select v-model="selectedMulti" multiple>
        <mad-option value="a">Option A</mad-option>
        <mad-option value="b">Option B</mad-option>
        <mad-option value="c">Option C</mad-option>
        <mad-option value="d">Option D</mad-option>
        <mad-option value="dd">Option DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption DOption D</mad-option>
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Objects">
      <mad-select v-model="selectedObjects" :compare="(a,b) => a.name==b.name">
        <mad-option :value="{ name: 'foo' }">Foo</mad-option>
        <mad-option :value="{ name: 'bar' }">Bar</mad-option>
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Async search country">
      <mad-select v-model="selectedCountry" :search="searchCountries">
        <mad-option v-for="option in countries"
          :key="option.alpha2Code" :value="option.alpha2Code">
          {{option.name}}
        </mad-option>
      </mad-select>
    </mad-form-item>
  </div>
</template>

<script>
import fetch from 'unfetch'

export default {
  data: () => ({
    selectedValue: null,
    selectedMulti: ['a', 'b'],
    selectedObjects: { name: 'foo' },
    selectedCountry: null,
    countries: [],
  }),
  methods: {
    async searchCountries(searchText) {
      this.countries = []
      if (searchText) {
        const response = await fetch('https://restcountries.eu/rest/v2/name/' + searchText)
        this.countries = response.status == 200 ? await response.json() : []
      }
    },
  },
}
</script>
