<template>
  <transition name="transition-collapse"
    :appear="appear"
    @enter="enter" @afterEnter="afterEnter"
    @leave="leave" @afterLeave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    appear: Boolean,
  },
  methods: {
    leave(el) {
      el.style.height = el.offsetHeight + 'px'
      el.offsetHeight // trigger transition
      el.style.height = 0
    },
    afterLeave(el) {
      el.style.height = null
    },
    enter(el) {
      el.style.height = 0
      let curHeight = el.offsetHeight

      // measure full height
      let style = el.getAttribute('style')
      el.removeAttribute('style')
      let fullHeight = el.offsetHeight
      el.setAttribute('style', style)

      // perform transition
      el.style.height = curHeight + 'px'
      el.offsetHeight // trigger transition
      el.style.height = fullHeight + 'px'
    },
    afterEnter(el) {
      el.removeAttribute('style')
    },
  },
}
</script>

<style lang="scss">
.transition-collapse-enter-active,
.transition-collapse-leave-active {
  overflow: hidden;
  transition: all 0.15s linear;
}
.transition-collapse-enter,
.transition-collapse-leave-to {
  // transform: scaleY(0);
  opacity: 0;
}
</style>
