<template>
  <div class="mad-tabs">
    <div v-for="(tab,i) in tabs" v-if="tab != null" :key="i"
      @click="activate(tab)"
      class="mad-tab"
      ref="tabs"
      :class="{'-active':tab==value}">
      {{tab}}
    </div>
    <div ref="line" class="mad-tabs_line"></div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, required: true },
    value: true,
  },

  data: () => ({
  }),

  watch: {
    value() {
      this.setLine()
    },
  },

  methods: {
    activate(tab) {
      this.$emit('input', tab)
    },

    setLine() {
      const line = this.$refs.line
      const i = this.tabs.filter(t => t != null).indexOf(this.value)
      const tab = this.$refs.tabs[i]
      line.style.marginLeft = tab.offsetLeft + 'px'
      line.style.width = tab.offsetWidth + 'px'
    },
    // onClick(e) {
    //   if (this.click && !this.busy) {
    //     const result = this.click()
    //     if (result && typeof result.then == 'function') {
    //       this.busy = true
    //       result.finally(() => this.busy = false)
    //     }
    //   }
    // },
  },

  mounted() {
    this.setLine()
  },
}
</script>
