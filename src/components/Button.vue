<template>
  <!-- @click="onClick" -->
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: Boolean,
    active: Boolean,
  },

  data: () => ({
  }),
  
  computed: {
    classes() {
      const classes = ['mad-button']
      if (this.active) {
        classes.push('active')
      }
      return classes
    },
  },
}
</script>
