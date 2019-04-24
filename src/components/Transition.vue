<template>
  <div class="mad-transition">
    <transition-group
      v-if="group"
      name="mad-transition"
      :appear="appear"
      :duration="duration"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <slot></slot>
    </transition-group>
    <transition
      v-else
      mode="out-in"
      name="mad-transition"
      :appear="appear"
      :duration="duration"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    group: Boolean,
    appear: Boolean,
    duration: { type: Number, default: 100 },
  },

  methods: {
    async beforeEnter(el) {
      // this.$el.style.transition = `all ${this.duration}ms linear`
      //   this.$el.style.height = height + 'px'

      // if (!this.group) {
      //   el.style.marginTop = -el.offsetTop + 'px'
      // }

      // await new Promise(requestAnimationFrame)
      // const height = el.offsetHeight
      // el.style.transition = `all ${this.duration}ms linear`
      // el.style.overflow = 'hidden'
      // // el.style.height = 0

      // // }

      // await new Promise(requestAnimationFrame)

      // // el.style.height = height + 'px'

      if (!this.group) {
      //   // const top = el.offsetTop
      //   // el.style.marginTop = -top + 'px'
      //   // console.log('top', top)
        // const containerHeight = this.$el.offsetHeight - height
        el.style.opacity = 0
        // this.$el.style.height = this.$el.offsetHeight - height + 'px'
        el.style.transition = `all ${this.duration}ms linear`
        await new Promise(requestAnimationFrame)
        el.style.opacity = 1
        // this.$el.style.height = el.offsetHeight + 'px'
      }
    },

    afterEnter(el) {
      el.removeAttribute('style')
      // this.$el.removeAttribute('style')
    },

    async beforeLeave(el) {
      // const height = el.offsetHeight
      // el.style.transition = `all ${this.duration}ms linear`
      // el.style.overflow = 'hidden'
      // // el.style.height = height + 'px'

      // // this.$el.style.transition = `all ${this.duration}ms linear`

      if (!this.group) {
        // el.style.position = 'absolute'
        // el.style.top = 0

        el.style.transition = `all ${this.duration}ms linear`
        el.style.opacity = 0

        // this.$el.style.height = this.$el.offsetHeight + 'px'
        // await new Promise(requestAnimationFrame)
        // const others = [...this.$el.children].filter(child => child != el)
        // const othersHeight = others.map(el => el.offsetHeight).reduce((s,h) => s + h, 0)
        // this.$el.style.height = othersHeight + 'px'
      }

      // if (!this.group) {
      //   // const top = el.offsetTop
      //   // el.style.marginTop = -top + 'px'
      //   // this.$el.style.transition = `all ${this.duration}ms linear`
      //   // this.$el.style.height = height + 'px'
      // }

      // await new Promise(requestAnimationFrame)

      // el.style.height = 0

      // if (!this.group) {
      //   this.$el.style.height = 0
      // }
      // fading outs are absolutely positioned so they dont affect layout

      // el.style.width = el.offsetWidth + 'px'
      // el.style.height = el.offsetHeight + 'px'
      // el.style.top = el.offsetTop + 'px'
      // el.style.left = el.offsetLeft + 'px'
      // // el.style.position = 'absolute'

      // // this happens if element was already absolutely positioned
      // if (parseInt(el.style.top) != el.offsetTop) el.removeAttribute('style')
    },

    afterLeave(el) {
      el.removeAttribute('style')
      // this.$el.removeAttribute('style')
    },
  },
}
</script>

<style lang="scss">
// @import 'src/scss/vars';

// .mad-transition {
//   position: relative;
//   overflow: hidden;
//   padding-bottom: 1px;
//   & > * {
//     padding-bottom: 1px;
//   }
//   // transition: height 0.5s linear;
// }

.mad-transition-enter-active,
.mad-transition-leave-active,
.mad-transition-move {
  // transition: all 10.1s linear;
  overflow: hidden;
}
// .mad-transition-enter,
// .mad-transition-leave-to {
//   // opacity: 0;
// }
// // .mad-transition-item {}
// .mad-transition-leave-active {
//   // position: absolute;
// }
</style>
