<template>
  <i :class="computedClass"
    v-bind="$attrs" v-on="$listeners"></i>
</template>

<script>
import 'flag-icon-css/sass/flag-icon.scss'
import '@mdi/font/css/materialdesignicons.css'

export default {
  props: {
    mdi: String,
    flag: String,
  },
  computed: {
    computedClass() {
      return [
        'mad-icon',
        this.mdi && `mdi mdi-${this.mdi.toLowerCase()}`,
        this.flag && `flag-icon flag-icon-${this.flag.toLowerCase()}`,
      ]
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
