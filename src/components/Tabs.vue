<template>
  <div>
    <div class="mad-tabs">
      <template v-for="(tab,i) in tabs">
        <div
          v-if="tab"
          :key="i"
          ref="tabs"
          class="mad-tabs_tab"
          :class="{'-active':tab==value}"
          @click="activate(tab)"
        >
          <slot :name="`tab:${tab}`">
            {{ tab }}
          </slot>
        </div>
      </template>
      <div ref="line" class="mad-tabs_line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, required: true, default: () => [] },
    value: { required: true },
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

  mounted() {
    this.setLine()
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
}
</script>

<style lang="scss">
@import '../scss/vars';

.mad-tabs_tab {
  padding: .5em 1em;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    position: absolute;
    border-radius: inherit;
    background: white;
    transition: all 0.1s;
    opacity: 0;
  }
  &:hover::after {
    opacity: 0.15;
  }
  &.-active, &:active {
    // top: 1px;
    // box-shadow: inset 0 1px 2px rgba(black, 0.35);
    // &::after {
    //   // background: transparent;
    //   opacity: 0.25;
    //   // color: black;
    // }
  }
}
.mad-tabs {
  display: flex;
  position: relative;
  margin-bottom: 1rem;
}
.mad-tabs_line {
  bottom: 0;
  height: 3px;
  background: $primary;
  position: absolute;
  transition: all .1s linear;
}
</style>
