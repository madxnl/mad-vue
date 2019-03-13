<template>
  <label class="mad-checkbox">
    <input type="checkbox" @change="change" :checked="value"
      v-bind="$attrs">
    <slot>
      {{label}}
    </slot>
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String,
  },

  methods: {
    change(event) {
      this.$emit('input', event.target.checked)
      event.target.checked = this.value
    },
  },
}
</script>
