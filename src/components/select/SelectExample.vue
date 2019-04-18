<template>
  <div class="space">
    <mad-form-item label="test">
      <mad-select v-model="selectedValue" :options="[{ value: 'awda', label: 'asd'}, {value:null,label:'NULL'}]" />
    </mad-form-item>

    <mad-form-item label="Simple select" style="max-width:120px">
      <mad-select
        v-model="selectedValue"
        :options="[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
          { value: null, label: 'Option null' },
          { value: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        ]"
      />
    </mad-form-item>

    <mad-form-item label="Simple select">
      <mad-select
        v-model="selectedValue"
        :options="[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
          { value: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        ]"
      />
    </mad-form-item>

    <mad-form-item label="Multiple select">
      <mad-select
        v-model="selectedMulti"
        multiple
        :option-value="o => o.foo"
        :options="[
          { foo: 'a', label: 'Option A' },
          { foo: 'b', label: 'Option B' },
          { foo: 'c', label: 'Option C' },
          { foo: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        ]"
      />
    </mad-form-item>

    <mad-form-item label="Super select">
      <mad-select
        option-value="foo"
        :options="[
          { foo: 'a', label: 'Option A' },
          { foo: null, label: 'Option null' },
          { foo: 'c', label: 'Option C' },
          { foo: 'd', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        ]"
      />
    </mad-form-item>

    <mad-form-item label="Objects">
      <mad-select
        v-model="selectedObject"
        multiple
        value-key="name"
        :options="[
          { name: 'Foo' },
          { name: 'Bar' },
        ]"
      >
        <template slot-scope="{option}">
          {{ option.name }}
        </template>
      </mad-select>
    </mad-form-item>

    <mad-form-item label="Async search country">
      <mad-select v-model="selectedCountry" :options="searchCountries">
        <template slot-scope="{option}">
          {{ option.name }}
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
    selectedObject: { name: 'Foo', a__foo: 0.1 },
    selectedCountry: null,
  }),
  methods: {
    async searchCountries(searchText) {
      if (!searchText) return []
      const response = await fetch('https://restcountries.eu/rest/v2/name/' + searchText)
      return response.status === 200 ? response.json() : []
    },
  },
}
</script>
