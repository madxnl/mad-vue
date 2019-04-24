<template>
  <label
    :class="['mad-checkbox', intermediate ? 'intermediate' : state ? 'checked': 'blank']"
  >
    <input
      type="checkbox"
      :checked="state || intermediate"
      v-bind="$attrs"
      @change="onChange"
    >
    <mad-icon class="mad-checkbox_icon" :mdi="mdiIconName" />
    <span v-if="$slots.default">
      &nbsp;
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },

  props: {
    model: { type: [String, Number, Object, Boolean, Array], default: undefined },
    value: { type: [String, Number, Object, Boolean], default: true },
    checked: { type: Boolean, default: undefined },
    intermediate: { type: Boolean, default: undefined },
  },

  data: () => ({
    state: false,
  }),

  computed: {
    computedState() {
      if (this.checked !== undefined) {
        return this.checked
      } else if (this.model instanceof Array) {
        return this.model.includes(this.value)
      } else if (this.model !== undefined) {
        return this.model === this.value
      }
      return this.state
    },

    mdiIconName() {
      if (this.intermediate) return 'minus-box'
      return this.state ? 'checkbox-marked' : 'checkbox-blank-outline'
    },
  },

  watch: {
    computedState(state) {
      this.state = state
    },
  },

  created() {
    this.state = this.computedState
  },

  methods: {
    onChange(e) {
      if (this.checked === undefined) {
        this.toggle()
      }
      e.target.checked = this.state
    },

    toggle(toggle = !this.state) {
      this.state = toggle
      if (this.model instanceof Array) {
        if (toggle) {
          this.$emit('change', [...this.model, this.value])
        } else {
          this.$emit('change', this.model.filter(v => v !== this.value))
        }
      } else if (typeof this.value === 'boolean') {
        this.$emit('change', toggle ? this.value : false)
      } else {
        this.$emit('change', toggle ? this.value : null)
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/vars';

.mad-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;

  & > input[type=checkbox] {
    position: absolute;
    pointer-events: none;
    visibility: hidden;
  }
  .mad-checkbox_icon {
    font-size: 24px;
    line-height: 1;
    opacity: 0.75;
  }
  &.checked, &.intermediate, &:hover {
    & > .mad-checkbox_icon {
      opacity: 1;
      color: $primary;
    }
  }
}
</style>
