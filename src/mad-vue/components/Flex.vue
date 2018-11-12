<template>
  <component :is="tag" class="mad-flex">
    <div :class="classes" :style="styles">
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    column: Boolean,
    direction: String,
    wrap: [String,Boolean],
    tag: { type: String, default: 'div' },
    justify: { type: String, default: 'flex-start' },
    align: { type: String, default: 'stretch' },
    spacing: String,
  },

  data: () => ({
  }),

  computed: {
    classes() {
      return {
        row: !this.column,
        column: this.column,
        [this.direction]: this.direction,
        wrap: this.wrap == true,
        [this.wrap]: typeof this.wrap == 'string',
        [`justify-${this.justify}`]: this.justify,
        [`align-${this.align}`]: this.align,
        spacing: !this.spacing,
        [`spacing-${this.spacing}`]: this.spacing,
      }
    },

    styles() {
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
