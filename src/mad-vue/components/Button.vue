<template>
  <button :type="type" class="mad-button"
    @click="onClick"
    :disabled="disabled || busy"
    :class="classes" :style="styles"
    v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <mad-loading v-if="busy"/>
  </button>
</template>

<script>
import cssVars from '../scss/vars.scss'

export default {
  props: {
    type: { type: String, default: 'button' },
    color: String,
    bg: String,
    raised: Boolean,
    size: String,
    click: Function,
    disabled: Boolean,
    // square: Boolean,
  },

  data: () => ({
    busy: false,
  }),

  computed: {
    classes() {
      return [
        this.raised && '--raised',
        this.busy && '--busy',
        this.color && `color-${this.color}`,
        this.bg && `bg-${this.bg}`,
        this.size && `size-${this.size}`,
        // this.square && '_square'
      ]
    },

    styles() {
      return {
        background: this.bg && this.bg.startsWith('#') && this.bg,
        color: this.color && this.color.startsWith('#') && this.color,
      }
    },
  },

  methods: {
    onClick(e) {
      if (this.click && !this.busy) {
        const result = this.click()
        if (typeof result.then == 'function') {
          this.busy = true
          result.finally(() => this.busy = false)
        }
      }
    },
  },
}
</script>
