<template>
  <span
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </span>
</template>

<script>
// import 'flag-icon-css/sass/flag-icon.scss'
import '@mdi/font/css/materialdesignicons.css'

let flagsLoaded = false

export default {
  props: {
    mdi: { type: String, default: null },
    flag: { type: String, default: null },
  },

  computed: {
    classes() {
      let classes = 'mad-icon'

      if (this.flag && !flagsLoaded) this.loadFlags()

      if (this.mdi && this.flag) console.warn('mad-icon: set either mdi="" or flag="" not both')
      if (!this.mdi && !this.flag) console.warn('mad-icon: set either mdi="" or flag=""')

      if (this.mdi) classes += ` mdi mdi-${this.mdi.toLowerCase()}`
      else if (this.flag) classes += ` flag-icon flag-icon-${this.flag.toLowerCase()}`
      return classes
    },
  },

  methods: {
    loadFlags() {
      flagsLoaded = true
      const link = window.document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/css/flag-icon.css'
      window.document.body.appendChild(link)
    },
  },
}
</script>
