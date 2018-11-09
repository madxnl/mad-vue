<template>
  <div class="">
    <input type="file"
      ref="fileinput"
      class="d-block"
      :id="_uid"
      :disabled="disabled"
      @change="onInput">
  </div>
</template>

<script>
export default {
  props: {
    value: true,
    disabled: Boolean,
  },
  methods: {
    onInput(event) {
      // let value = event.target.value
      const file = event.target.files[0]
      this.$emit('input', file)
    },
  },
  watch: {
    value(file) {
      if (!file) {
        // clear file input
        this.$refs.fileinput.value = ''
      }
    },
  },
}
</script>
