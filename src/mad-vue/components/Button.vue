<template>
    <!-- @click="onClick" -->
  <button :type="type"
    :disabled="disabled"
    :class="classes"
    :style="`background-color:${color};border-color:${color}`"
    v-bind="$attrs" v-on="$listeners">
    <div class="mad-button_content"
      :style="`color:${color}`">
      <slot></slot>
    <mad-loading v-if="loading" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    color: String,
    loading: Boolean,
    disabled: Boolean,
    active: Boolean,
    flat: Boolean, // Deprecated
  },

  data: () => ({
    // loading: false,
    // invertText: false,
  }),

  computed: {
    classes() {
      let classes = 'mad-button'
      // if (this.invertText) classes += ` invertText`
      if (this.color) classes += ` colored ${this.color}`
      if (this.variant) classes += ` ${this.variant}`
      else if (this.flat) classes += ' flat'
      // if (this.flat && this.color) classes += ` color-${this.color}`
      // if (!this.flat && this.color) classes += ` bg-${this.color}`
      // if (this.active) classes += ` -active`
      if (this.loading) classes += ` loading`
      return classes
    },
  },
}
</script>
