<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: Boolean,
    active: Boolean,
  },

  data: () => ({
  }),

  computed: {
    classes() {
      const classes = ['mad-button']
      if (this.active) {
        classes.push('active')
      }
      return classes
    },
  },
}
</script>

<style lang="scss">
.mad-button {
  border: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: 1;
  padding: .6em 1em;
  flex-shrink: 0;
  background: transparent;
  font-weight: bold;
  border-radius: .25em;
  position: relative;
  white-space: nowrap;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    position: absolute;
    border-radius: inherit;
    // transition: all 0.1s;
    background: currentColor;
    opacity: 0;
    cursor: pointer;
  }
  &:hover::after {
    opacity: 0.15;
  }
  &.active, &:active {
    top: 1px;
    box-shadow: inset 0 1px 2px rgba(black, 0.5);
    &::after {
      opacity: 0.25;
    }
  }
  &:disabled, &.disabled {
    pointer-events: none;
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
</style>
