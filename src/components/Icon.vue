<template>
  <i :class="computedClass"
    v-bind="$attrs" v-on="$listeners"></i>
</template>

<script>
// import 'flag-icon-css/sass/flag-icon.scss'
import '@mdi/font/css/materialdesignicons.css'

let flagsLoaded = false

export default {
  props: {
    mdi: String,
    flag: String,
  },

  computed: {
    computedClass() {
      if (this.flag && !flagsLoaded) this.loadFlags()

      return [
        'mad-icon',
        this.mdi && `mdi mdi-${this.mdi.toLowerCase()}`,
        this.flag && `flag-icon flag-icon-${this.flag.toLowerCase()}`,
      ]
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
