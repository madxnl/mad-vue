<template>
  <div class="mad-input">
    <div class="mad-input_left" v-if="$slots.default">
      <slot></slot>
    </div>

    <textarea v-if="rows>1"
      class="mad-input_input"
      :type="type"
      :value="value"
      v-bind="$attrs" v-on="listeners">
    </textarea>
    <input v-else
      class="mad-input_input"
      :value="value"
      v-bind="$attrs" v-on="listeners">

    <div class="mad-input_right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    type: { type: String, default: 'text' },
    rows: { type: [String, Number], default: 1 },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      }
    },
  },
  
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
