<template>
  <label class="mad-checkbox">
    <input
      type="checkbox"
      :checked="checked"
      v-bind="$attrs"
      @change="change"
    >
    <slot></slot>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'inValue',
    event: 'change',
  },

  props: {
    checked: Boolean,
    value: { default: true },
    radio: Boolean,
    inValue: {},
  },

  watch: {
    checked() {
    },

    inValue(value) {
      if (this.radio) {


      }
    },
  },

  methods: {
    change(event) {
      if (this.radio) {
        this.$emit('change', this.value)
      } else {
        this.$emit('change', !this.checked)
      }
      event.target.checked = this.value
    },
  },
}
</script>
