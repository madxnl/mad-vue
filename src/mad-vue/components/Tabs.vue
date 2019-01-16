<template>
  <div>
    <div class="mad-tabs">
      <template v-for="(tab,i) in tabs">
        <div v-if="tab != null" :key="i"
          @click="activate(tab)"
          class="mad-tab"
          ref="tabs"
          :class="{'-active':tab==value}">
          <slot :name="`tab:${tab}`">
            {{tab}}
          </slot>
        </div>
      </template>
      <div ref="line" class="mad-tabs_line"></div>
    </div>

    <template v-for="tab in validTabs">
      <slot v-if="activeTab==tab" :name="tab"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, required: true, default: [] },
    value: true,
  },

  data: () => ({
    activeTab: null,
  }),

  computed: {
    validTabs() {
      return this.tabs.filter(t => t != null)
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.activate(value)
      },
    },
  },

  methods: {
    activate(tab) {
      // if (this.activeTab == tab)
      if (this.validTabs.includes(tab)) {
        this.activeTab = tab
      } else {
        this.activeTab = this.validTabs[0] || null
      }
      this.$emit('input', this.activeTab)
      this.setLine()
    },

    setLine() {
      const idx = this.validTabs.indexOf(this.activeTab)
      if (this.$refs.tabs) {
        const tabEl = this.$refs.tabs[idx]
        const line = this.$refs.line
        line.style.marginLeft = tabEl.offsetLeft + 'px'
        line.style.width = tabEl.offsetWidth + 'px'
      }
    },
  },

  mounted() {
    this.setLine()
  },
}
</script>

<style lang="scss" scoped>
.mad-tabs {
  background: var(--primary) !important;
}

</style>