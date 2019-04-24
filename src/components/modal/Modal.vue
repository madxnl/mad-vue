<template>
  <mad-transition>
    <div v-if="active" class="mad-modal" @click.self="OnClickOutside">
      <div class="mad-modal_window">
        <slot></slot>
      </div>
    </div>
  </mad-transition>
</template>

<script>
const stack = []

export default {
  props: {
    value: { type: Boolean, default: false },
    title: { type: String, default: null },
    clickOutsideClose: { type: Boolean, default: true },
  },

  data: () => ({
    stack,
    active: false,
  }),

  computed: {
    visible() {
      return this.stack[this.stack.length - 1] === this
    },
  },

  watch: {
    value(value) {
      this.toggle(value)
    },
  },

  created() {
    window.document.addEventListener('keyup', this.onKeyup)
    this.toggle(this.value)
  },

  beforeDestroy() {
    window.document.removeEventListener('keyup', this.onKeyup)
    this.toggle(false)
  },

  methods: {
    toggle(active = !this.active) {
      if (active === this.active) return
      this.active = active
      if (this.stack.includes(this)) {
        this.stack.splice(this.stack.indexOf(this), 1)
      }
      if (active) {
        this.stack.push(this)
      }
      if (this.stack.length) {
        document.body.style.overflowY = 'hidden'
        document.body.style.paddingRight = `${this.measureScrollbar()}px`
      } else {
        document.body.style.overflowY = null
        document.body.style.paddingRight = null
      }
      this.$emit('input', active)
    },

    onKeyup(event) {
      // escape press hides modal
      if (this.active && event.keyCode === 27) {
        this.toggle(false)
      }
      // event.stopPropagation();
      // event.preventDefault();
    },

    measureScrollbar() {
      const div = document.createElement('div')
      div.style.overflow = 'scroll'
      document.body.appendChild(div)
      const result = div.offsetWidth - div.clientWidth
      document.body.removeChild(div)
      return result
    },

    OnClickOutside() {
      if (this.clickOutsideClose) {
        this.toggle(false)
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/vars';

.mad-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 150;
  background: rgba(black, 0.5);
  overflow-y: auto;
  padding: 1rem;
  padding-top: 2rem;
  margin: 0 calc(100% - 100vw) 0 0 !important;
}
.mad-modal_window {
  margin: 0 auto;
  max-width: 800px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(black, 0.3);
  padding: 1rem;
}
</style>
