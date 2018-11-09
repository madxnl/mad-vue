<template>
  <div class="mad-input">
    <div class="mad-input__left">
      <slot></slot>
    </div>

    <textarea v-if="rows > 1"
      class="mad-input__input"
      :type="type" :rows="rows"
      v-bind="$attrs" v-on="listeners"
      :value="value" @input="onInput">
    </textarea>

    <input v-else
      class="mad-input__input"
      :type="type"
      v-bind="$attrs" v-on="listeners"
      :value="value" @input="onInput">

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
      this.$emit('input', event)
    }
  }
}
</script>
