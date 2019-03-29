<template>
  <div class="mad-input">
    <slot></slot>

    <textarea
      v-if="rows>1"
      :id="id"
      class="mad-input_input"
      :rows="rows"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
    </textarea>
    <input
      v-else
      :id="id"
      class="mad-input_input"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >

    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: { default: undefined },
    rows: { type: [String, Number], default: 1 },
    id: { type: String, default: null },
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
      this.$emit('input', event.target.value, event)
    }
  }
}
</script>
