<template>
  <transition name="mad-transition"
    :appear="appear"
    @before-leave="beforeLeave"
    @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    appear: Boolean,
  },

  methods: {
    beforeLeave(el) {
      // fading outs are absolutely positioned so they dont affect layout
      
      // el.style.width = el.offsetWidth + 'px'
      // el.style.height = el.offsetHeight + 'px'
      // el.style.top = el.offsetTop + 'px'
      // el.style.left = el.offsetLeft + 'px'
      // el.style.position = 'absolute'

      // this happens if element was already absolutely positioned
      // if (parseInt(el.style.top) != el.offsetTop) el.removeAttribute('style')
    },

    afterLeave(el) {
      // el.removeAttribute('style')
    },
  },
}
</script>

<style lang="scss">
// @import 'src/scss/vars';

.mad-transition-enter-active,
.mad-transition-leave-active {
  transition: opacity 0.1s linear;
}
.mad-transition-enter,
.mad-transition-leave-to {
  opacity: 0;
}
</style>
