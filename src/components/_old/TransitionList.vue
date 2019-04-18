<template>
  <transition-group name="transition-list">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  props: {
    // loading: {default: false},
    appear: { type: Boolean, default: false },
  },
  methods: {
  },
}
</script>

<style lang="scss">
// @import 'src/scss/vars';

.transition-list-enter-active,
.transition-list-leave-active,
.transition-list-move {
  transition: opacity 0.15s linear;
}
.transition-list-enter,
.transition-list-leave-to {
  opacity: 0;
}
</style>
