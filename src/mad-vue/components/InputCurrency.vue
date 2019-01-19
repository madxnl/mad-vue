<template>
  <div class="row space-sm">
    <mad-icon mdi="currency-eur" />
    <input type="text" class="form-field grow" :value="value" @input="onInput" @blur="onBlur" v-bind="$attrs" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String,Number] },
    placeholder: { type: String, default: '0.00' },
  },
  methods: {
    onInput(event) {
      event.target.value = event.target.value.toString()
        .replace(',', '.') // use . instead of , as decimal point
        .replace(/[^\d.]+/, '') // invalid characters
        .replace(/^0(\d)/, '$1') // leading zeros
        .replace(/^\./, '0.') // skip to entering fraction
        .replace(/^(\d+\.\d{0,2}).*$/, '$1') // limit to 1 point 2 decimals
      this.$emit('input', event.target.value)
    },
    onBlur(event) {
      if (event.target.value)
        event.target.value = (+event.target.value).toFixed(2)
      this.$emit('input', event.target.value)
    },
  },
}
</script>
