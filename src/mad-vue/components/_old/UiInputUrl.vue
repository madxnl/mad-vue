<template>
  <input class="form-field" type="text" :value="value" @input="onInput" v-bind="$attrs">
</template>

<script>
export default {
  props: {
    value: { type: String },
  },
  methods: {
    onInput(event) {
      let val = event.target.value
      if (val && !val.match(/^https?:/)) val = 'http://' + val
      event.target.value = val
      this.$emit('input', val)
    },
  }
}
</script>
