<template>
  <div class="mad-transition">
    <transition-group
      v-if="group"
      name="mad-transition"
      :appear="appear"
      :duration="duration"
      @enter="enter"
      @leave="leave"
    >
      <slot></slot>
    </transition-group>
    <transition
      v-else
      name="mad-transition"
      :mode="mode"
      :appear="appear"
      :duration="duration"
      @enter="enter"
      @leave="leave"
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
    duration: { type: Number, default: 500 },
    variant: { type: String, default: 'fade' },
    slideDist: { type: String, default: '30px' },
    mode: { type: String, default: 'out-in' },
  },

  methods: {
    async enter(el, complete) {
      const originalCssText = el.style.cssText
      const values = this.getComputedProps(el)

      el.style.setProperty('opacity', '0', 'important')
      if (this.variant === 'slide-x') {
        el.style.setProperty('transform', `translateX(-${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-x-reverse') {
        el.style.setProperty('transform', `translateX(${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-y') {
        el.style.setProperty('transform', `translateY(-${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-y-reverse') {
        el.style.setProperty('transform', `translateY(${this.slideDist})`, 'important')
      } else if (this.variant === 'expand-y') {
        el.style.setProperty('max-height', '0', 'important')
        el.style.setProperty('max-width', values['width'], 'important')
        el.style.setProperty('padding-top', '0', 'important')
        el.style.setProperty('padding-bottom', '0', 'important')
        el.style.setProperty('margin-top', '0', 'important')
        el.style.setProperty('margin-bottom', '0', 'important')
        el.style.setProperty('overflow', 'hidden', 'important')
      } else if (this.variant === 'expand-x') {
        el.style.setProperty('max-width', '0', 'important')
        el.style.setProperty('max-height', values['height'], 'important')
        el.style.setProperty('padding-left', '0', 'important')
        el.style.setProperty('padding-right', '0', 'important')
        el.style.setProperty('margin-left', '0', 'important')
        el.style.setProperty('margin-right', '0', 'important')
        el.style.setProperty('overflow', 'hidden', 'important')
      }

      await new Promise(requestAnimationFrame)
      el.style.setProperty('transition', `all ${this.duration}ms ease-in`)
      el.style.setProperty('opacity', values['opacity'], 'important')
      if (this.variant.startsWith('slide-')) {
        el.style.setProperty('transform', '', 'important')
      } else if (this.variant === 'expand-y') {
        el.style.setProperty('max-height', values['height'], 'important')
        el.style.setProperty('padding-top', values['padding-top'], 'important')
        el.style.setProperty('padding-bottom', values['padding-bottom'], 'important')
        el.style.setProperty('margin-top', values['margin-top'], 'important')
        el.style.setProperty('margin-bottom', values['margin-bottom'], 'important')
      } else if (this.variant === 'expand-x') {
        el.style.setProperty('max-width', values['width'], 'important')
        el.style.setProperty('padding-left', values['padding-left'], 'important')
        el.style.setProperty('padding-right', values['padding-right'], 'important')
        el.style.setProperty('margin-left', values['margin-left'], 'important')
        el.style.setProperty('margin-right', values['margin-right'], 'important')
      }

      await new Promise(resolve => setTimeout(resolve, this.duration))
      el.style.cssText = originalCssText
      complete()
    },

    async leave(el, complete) {
      const originalCssText = el.style.cssText
      const values = this.getComputedProps(el)

      if (this.group) {
        el.style.setProperty('position', 'absolute', 'important')
        el.style.setProperty('height', values['height'], 'important')
        el.style.setProperty('width', values['width'], 'important')
      }

      if (this.variant.startsWith('slide-')) {
        el.style.setProperty('transform', '', 'important')
      } else if (this.variant === 'expand-y') {
        el.style.setProperty('max-height', values['height'], 'important')
        el.style.setProperty('overflow', 'hidden', 'important')
      } else if (this.variant === 'expand-x') {
        el.style.setProperty('max-width', values['width'], 'important')
        el.style.setProperty('overflow', 'hidden', 'important')
      }
      await new Promise(requestAnimationFrame)
      el.style.setProperty('transition', `all ${this.duration}ms ease-out`)
      el.style.setProperty('opacity', '0', 'important')
      if (this.variant === 'slide-x') {
        el.style.setProperty('transform', `translateX(-${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-x-reverse') {
        el.style.setProperty('transform', `translateX(${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-y') {
        el.style.setProperty('transform', `translateY(-${this.slideDist})`, 'important')
      } else if (this.variant === 'slide-y-reverse') {
        el.style.setProperty('transform', `translateY(${this.slideDist})`, 'important')
      } else if (this.variant === 'expand-y') {
        el.style.setProperty('max-height', '0', 'important')
        el.style.setProperty('max-width', values['width'], 'important')
        el.style.setProperty('padding-top', '0', 'important')
        el.style.setProperty('padding-bottom', '0', 'important')
        el.style.setProperty('margin-top', '0', 'important')
        el.style.setProperty('margin-bottom', '0', 'important')
      } else if (this.variant === 'expand-x') {
        el.style.setProperty('max-width', '0', 'important')
        el.style.setProperty('max-height', values['height'], 'important')
        el.style.setProperty('padding-left', '0', 'important')
        el.style.setProperty('padding-right', '0', 'important')
        el.style.setProperty('margin-left', '0', 'important')
        el.style.setProperty('margin-right', '0', 'important')
      }

      await new Promise(resolve => setTimeout(resolve, this.duration))
      el.style.cssText = originalCssText
      complete()
    },

    getComputedProps(el) {
      const computedStyle = window.getComputedStyle(el)
      const values = ['height', 'width', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'opacity']
        .reduce((o, p) => Object.assign(o, { [p]: computedStyle.getPropertyValue(p) }), {})
      return values
    },
  },
}
</script>

<style lang="scss">
// @import 'src/scss/vars';

.mad-transition-move {
  transition: transform .5s;
}
</style>
