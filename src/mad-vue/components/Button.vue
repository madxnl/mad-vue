<template>
    <!-- @click="onClick" -->
  <button :type="type" class="mad-button"
    :disabled="disabled"
    :class="classes" :style="styles"
    v-bind="$attrs" v-on="$listeners">
    <div class="mad-button_content"><slot></slot></div>
    <mad-loading v-if="loading"/>
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
    loading: Boolean,
    disabled: Boolean,
    active: Boolean,
    // square: Boolean,
  },

  data: () => ({
    // loading: false,
  }),

  computed: {
    classes() {
      return [
        this.flat && '-flat',
        this.color && `-color-${this.color}`,
        // this.bg && !this.color && `color-white`,
        this.size && `fontsize-${this.size}`,
        this.active && `-active`,
        this.loading && `-loading`,
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
}
</script>