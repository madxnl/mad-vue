<template>
  <div class="mad-input mad-input-number">
    <slot></slot>
    <input
      :id="id"
      class="mad-input_input"
      :value="text"
      v-bind="$attrs"
      v-on="listeners"
    >
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: null },
    id: { type: String, default: null },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    decimals: { type: Number, default: null },
    separator: { type: String, default: (0.1).toLocaleString()[1] },
  },

  data: () => ({
    text: '',
  }),

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
      }
    },

    parsedText() {
      const text = this.text.replace(this.separator, '.')
      let float = parseFloat(text)
      if (isNaN(float)) return null
      return float
    },
  },

  watch: {
    value(value) {
      const parsedValue = this.parse(value)
      const current = this.fixOutput(this.parse(this.text))
      console.log(value, parsedValue, this.text)
      if (isNaN(value) || typeof value !== 'number' || parsedValue !== current) {
        this.text = value
      }
    },
  },

  methods: {
    onInput(event) {
      if (event.data === '-' && event.target.value.length > 1) {
        // negate current
        this.emitInput(-this.value, event)
      } else {
        this.updateValue(event)
      }
    },

    onBlur(event) {
      this.updateValue(event)
      this.text = this.value == null ? '' : '' + this.value
    },

    updateValue(event) {
      this.text = this.fixInput(event.target.value)
      event.target.value = this.text
      this.emitInput(this.text, event)
    },

    emitInput(value, event) {
      value = this.fixOutput(value)
      this.$emit('input', value, event)
    },

    parse(s) {
      s = '' + s
      s = s.replace(',', '.').replace(this.separator, '.')
      let float = parseFloat(s)
      return isNaN(float) ? null : float
    },

    fixInput(value) {
      value = value.toString()
      value = value.replace(',', '.') // correct separator
      let [, min, num, frac] = /(-?)\s*(\d*)(\.?\d*)/g.exec(value)
      value = min + num + frac
      value = value.replace('.', this.separator)
      return value
    },

    fixOutput(n) {
      n = +n
      if (this.min != null) n = Math.max(this.min, n)
      if (this.max != null) n = Math.min(this.max, n)
      if (this.decimals != null) {
        n = n.toFixed(this.decimals)
      }
      return +n
    },
  },
}
</script>
