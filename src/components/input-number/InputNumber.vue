<template>
  <div class="mad-input mad-input-number">
    <slot></slot>
    <input
      :id="id"
      class="mad-input_input"
      :value="inputText"
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
    decimals: { type: Number, default: 0 },
    separator: { type: String, default: (0.1).toLocaleString()[1] },
  },

  data: () => ({
    inputText: '',
    currentValue: null,
  }),

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
      }
    },

    computedValue() {
      const n = this.stringToNumber(this.inputText)
      return this.sanitizeOutput(n)
    },

    // parsedText() {
    //   const inputText = this.inputText.replace(this.separator, '.')
    //   let float = parseFloat(inputText)
    //   if (isNaN(float)) return null
    //   return float
    // },
  },

  watch: {
    value() {
      if (this.computedValue !== this.value) {
        // console.log('value', [currentValue, this.value, this.inputText])
        this.inputText = this.valueToText(this.value)
      }
    },
  },

  methods: {
    onInput(event) {
      // console.log('onInput', this.inputText)

      if (event.data === '-' && event.target.value.length > 1) {
        this.inputText = '-' + this.inputText
      } else {
        this.inputText = event.target.value
      }
      this.inputText = this.sanitizeInput(this.inputText)
      // }
      this.emitInput(event)
    },

    onBlur(event) {
      this.inputText = this.valueToText(this.value)
      // console.log('onBlur', this.inputText)

      this.emitInput(event)
    },

    valueToText(value) {
      if (value == null) return ''
      const n = parseFloat(value)
      if (isNaN(n)) return 'NaN'
      if (this.decimals) return n.toFixed(this.decimals)
      return n.toString()
    },

    // updateValue(event) {
    //   event.target.value = this.inputText
    //   this.emitInput(this.inputText, event)
    // },

    emitInput(event) {
      event.target.value = this.inputText
      if (this.computedValue !== this.value) {
        this.$emit('input', this.computedValue, event)
      }
    },

    stringToNumber(s) {
      s = '' + s
      s = s.replace(/[,.]/g, this.separator)
      const float = parseFloat(s)
      return isNaN(float) ? null : float
    },

    sanitizeInput(s) {
      s = s.replace(',', '.') // correct separator
      s = s.replace('--', '') // negate
      let [, min, num, frac] = /(-?)\s*(\d*)(\.?\d*)/g.exec(s)
      s = min + num + frac

      let n = parseFloat(s)
      n = this.applyMinMax(n)
      if (!isNaN(n) && n !== parseFloat(s)) return n.toString()

      s = s.replace('.', this.separator)
      return s
    },

    sanitizeOutput(n) {
      if (n == null) return n
      n = this.applyMinMax(n)
      if (this.decimals != null) n = +n.toFixed(this.decimals)
      return n
    },

    applyMinMax(n) {
      if (this.min != null) n = Math.max(this.min, n)
      if (this.max != null) n = Math.min(this.max, n)
      return n
    },
  },
}
</script>
