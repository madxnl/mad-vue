<template>
  <pre><code ref="code" :class="language"><slot></slot></code></pre>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import scss from 'highlight.js/lib/languages/scss'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('scss', scss)

export default {
  props: {
    language: String,
  },

  methods: {
    applyHighlight() {
      hljs.highlightBlock(this.$refs.code)
    },
  },

  created() {
    const slot = this.$slots.default[0]
    const lines = slot.text.split('\n')
    const firstLine = lines.find(line => line.trim().length > 0)
    const indent = firstLine.length - firstLine.trimLeft().length
    slot.text = lines.map(line => line.slice(indent)).join('\n').trim()
  },

  mounted() {
    this.applyHighlight()
  },
}
</script>

<style lang="scss" scoped>
._filename {
}
</style>