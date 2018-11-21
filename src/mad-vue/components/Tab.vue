<template>
  <component :is="tag"
    :class="classes" :style="styles">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'div' },
    // justify: { type: String, default: 'flex-start' },
    // align: { type: String, default: 'stretch' },
    // spacing: String,
  },

  data: () => ({
  }),

  computed: {
    classes() {
      return {
        // column: this.column,
        // [this.direction]: this.direction,
        // wrap: this.wrap == true,
        // [this.wrap]: typeof this.wrap == 'string',
        // [`justify-${this.justify}`]: this.justify,
        // [`align-${this.align}`]: this.align,
        // spacing: !this.spacing,
        // [`spacing-${this.spacing}`]: this.spacing,
      }
    },

    styles() {
    },
  },
}
</script>
