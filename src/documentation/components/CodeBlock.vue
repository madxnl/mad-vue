<template>
  <div class="code-block">
    <p v-if="filename" class="filename">
      {{ filename }}
    </p>
    <pre><code ref="code" :class="language"><slot></slot></code></pre>
  </div>
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
    language: { type: String, default: null },
    filename: { type: String, default: null },
  },

  created() {
    // const slot = this.$slots.default[0]
    // console.log('test', slot)
    // const lines = slot.text.split('\n')
    // const firstLine = lines.find(line => line.trim().length > 0)
    // const indent = firstLine.length - firstLine.trimLeft().length
    // slot.text = lines.map(line => line.slice(indent)).join('\n').trim()
  },

  mounted() {
    this.applyHighlight()
  },

  methods: {
    applyHighlight() {
      hljs.highlightBlock(this.$refs.code)
    },
  },
}
</script>

<style lang="scss">

.code-block {
  .filename {
    opacity: 0.6;
    font-style: italic;
  }
  pre {
    margin-bottom: 0;
  }
}
</style>
