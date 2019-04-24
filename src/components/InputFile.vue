<template>
  <div class="">
    <input
      :id="_uid"
      ref="fileinput"
      type="file"
      class="d-block"
      :disabled="disabled"
      v-bind="$attrs"
      @change="onInput"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [Object, File], default: null },
    disabled: Boolean,
  },
  watch: {
    value(file) {
      if (!file) {
        // clear file input
        this.$refs.fileinput.value = ''
      }
    },
  },
  methods: {
    onInput(event) {
      // let value = event.target.value
      const file = event.target.files[0]
      this.$emit('input', file)
    },
  },
}
</script>
