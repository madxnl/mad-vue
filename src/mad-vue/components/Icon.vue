<template>
  <i :class="computedClass"
    v-bind="$attrs" v-on="$listeners"></i>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import 'flag-icon-css/sass/flag-icon.scss'

export default {
  props: {
    mdi: String,
    country: String,
  },
  computed: {
    computedClass() {
      return [
        'mad-icon',
        this.mdi && `mdi mdi-${this.mdi}`,
        this.country && `flag-icon flag-icon-${this.country}`,
      ]
    },
  },
}
</script>
