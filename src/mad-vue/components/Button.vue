<template>
    <!-- @click="onClick" -->
  <button :type="type" class="mad-button"
    :disabled="disabled"
    :class="classes" :style="styles"
    v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <!-- <mad-loading v-if="busy"/> -->
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    color: String,
    // secondary: Boolean,
    flat: Boolean,
    size: String,
    // click: Function,
    disabled: Boolean,
    // square: Boolean,
  },

  data: () => ({
    // busy: false,
  }),

  computed: {
    classes() {
      return [
        this.flat && '-flat',
        // this.busy && '--busy',
        this.color && `-color-${this.color}`,
        // this.bg && !this.color && `color-white`,
        this.size && `fontsize-${this.size}`,
        // this.square && '_square'
      ]
    },

    styles() {
      let style = ''
      if (this.color && (this.color.startsWith('#') || this.color.startsWith('rgb'))) {
        if (this.flat) {
          style += `color:${this.color}`
        } else {
          style += `background-color:${this.color};border-color:${this.color}`
        }
      }
      return style
    },
  },

  methods: {
    // onClick(e) {
    //   if (this.click && !this.busy) {
    //     const result = this.click()
    //     if (result && typeof result.then == 'function') {
    //       this.busy = true
    //       result.finally(() => this.busy = false)
    //     }
    //   }
    // },
  },
}
</script>