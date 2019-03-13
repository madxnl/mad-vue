<template>
  <span :class="classes"
    v-bind="$attrs" v-on="$listeners"
    :style="`font-size:${size};color:${color}`">
    <span :class="contentClasses"></span>
  </span>
</template>

<script>
// import 'flag-icon-css/sass/flag-icon.scss'
import '@mdi/font/css/materialdesignicons.css'

let flagsLoaded = false

export default {
  props: {
    mdi: String,
    flag: String,
    size: String,
    color: String,
  },

  computed: {
    classes() {
      let classes = 'mad-icon'
      if (this.size) classes += ` size-${this.size}`
      return classes
    },

    contentClasses() {
      if (this.flag && !flagsLoaded) this.loadFlags()

      let classes = 'mad-icon_content'
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

  // watch: {
  //   country: {
  //     immediate: true,
  //     handler(value) {
  //       if (value) {
  //         import(/* webpackChunkName: "flag-icon" */'flag-icon-css/sass/flag-icon.scss')
  //         require(/* webpackChunkName: "test" */'./test.js')
  //       }
  //     },
  //   },
  //   mdi: {
  //     immediate: true,
  //     handler(value) {
  //       if (value) {
  //         import(/* webpackChunkName: "materialdesignicons" */'@mdi/font/css/materialdesignicons.css')
  //       }
  //     },
  //   },
  // },
}
</script>
