<template>
  <div class="mad-menu-item" v-bind="$attrs" v-on="$listeners"
    :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    click: Function,
    active: Boolean,
    disabled: Boolean,
    hover: Boolean,
  },

  computed: {
    classes() {
      return {
        '--active': this.active,
        '--hover': this.hover,
        '--disabled': this.disabled,
        '--clickable': this.$listeners.click,
      }
    },
  },
}
</script>
