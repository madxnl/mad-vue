<template>
  <div
    class="mad-dropdown"
    :class="classes"
    v-bind="$attrs"
    @mousedown="!active && toggle()"
  >
    <slot></slot>

    <div v-if="active" class="mad-dropdown_content">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    directionUp: Boolean,
    alignRight: Boolean,
    matchWidth: Boolean,
  },

  data: () => ({
    active: false,
  }),

  computed: {
    classes() {
      return {
        '--direction-up': this.directionUp,
        '--align-right': this.alignRight,
        '--match-width': this.matchWidth,
      }
    },
  },

  watch: {
    value(value) {
      this.toggle(value)
    },
  },

  mounted() {
    this.toggle(this.value)

    this.clickListener = (event) => {
      if (this.active && !this.$el.contains(event.target)) {
        this.toggle(false)
      }
    }
    window.addEventListener('click', this.clickListener)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.clickListener)
  },

  methods: {
    toggle(active = !this.active) {
      this.active = !!active
      this.$emit('input', this.active)
    },
  },
}
</script>

<style lang="scss">
@import '../scss/vars';

.mad-dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.mad-dropdown_content {
  background: white !important;
  border-radius: 1px;
  position: absolute;
  z-index: 20;
  top: 100%;
  left: 0;
  min-width: 100%;
  // margin: .5rem 0;
  box-shadow: 0 2px 5px rgba(black, 0.2);
  max-height: 320px;
  overflow-y: auto;
  &.--direction-up {
    top: auto;
    bottom: 100%;
  }
  &.--align-right {
    right: 0;
    left: auto;
  }
  &.--match-width {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
