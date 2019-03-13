<template>
    <!-- @click="onClick" -->
  <button :type="type"
    :disabled="disabled"
    :class="classes"
    :style="`background-color:${color};border-color:${color};font-size:${size}`"
    v-bind="$attrs" v-on="$listeners">
    <div class="mad-button_content"
      :style="`color:${color}`">
      <slot></slot>
      <!-- <mad-loading v-if="loading" /> -->
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    color: String,
    size: String,
    loading: Boolean,
    disabled: Boolean,
    active: Boolean,
    variant: String, // Deprecated
    flat: Boolean, // Deprecated
  },

  data: () => ({
    // loading: false,
    // invertText: false,
  }),

  computed: {
    classes() {
      let classes = 'mad-button'
      if (this.color) classes += ` colored ${this.color}`
      if (this.variant) classes += ` ${this.variant}`
      else if (this.flat) classes += ' flat'
      if (this.size) classes += ` size-${this.size}`
      if (this.active || this.loading) classes += ` active`
      // if (this.loading) classes += ` loading`
      return classes
    },
  },
}
</script>
