<template>
  <div class="mad-dropdown"
    :class="classes"
    @click="toggle()"
    v-bind="$attrs">

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

  methods: {
    toggle(active=!this.active) {
      this.active = !!active
      this.$emit('input', this.active)
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
}
</script>
