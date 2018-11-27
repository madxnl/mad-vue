<template>
  <div class="mad-input">
    <div class="mad-input__left">
      <slot></slot>
    </div>

    <component :is="rows > 1 ? 'textarea' : 'input'"
      class="mad-input__input"
      :type="type" :rows="rows"
      v-on="listeners"
      :value="value">
    </component>

    <div class="mad-input__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String },
    type: { default: 'text' },
    rows: { type: [String, Number], default: 1 }
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
