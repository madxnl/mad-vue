<template>
  <div class="space">
    <mad-form-item label="test">
      <mad-select v-model="selectedValue" :options="[{ value: 'awda', label: 'asd'}, {value:null,label:'NULL'}]"/>
      <mad-select v-model="selectedValue" :options="[{ value: 'awda', label: 'asd'}, {value:'awaad',label:'NULL'}]"/>
      <mad-select v-model="selectedValue" :options="['asd',null]"/>
      <mad-select v-model="selectedValue" :options="['asd',0]"/>
    </mad-form-item>

    <mad-form-item label="Simple select" style="max-width:120px">
      <mad-select v-model="selectedValue" :options="[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
        { value: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      ]">
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Multiple select">
      <mad-select v-model="selectedMulti" multiple :options="[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
        { value: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      ]">
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Objects">
      <mad-select v-model="selectedObjects" multiple pk="name" :options="[
        { name: 'Foo' },
        { name: 'Bar' },
      ]">
        <template slot-scope="{option}">
          {{option.name}}
        </template>
      </mad-select>
    </mad-form-item>
    <mad-form-item label="Async search country">
      <mad-select v-model="selectedCountry" :search="searchCountries" :options="countries">
        <template slot-scope="{option}">
          {{option.name}}
        </template>
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
    selectedObjects: { name: 'Foo', __foo: 0.1 },
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
