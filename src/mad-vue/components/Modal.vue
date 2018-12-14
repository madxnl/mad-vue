<template>
  <mad-transition>
    <div class="mad-modal" @click.self="toggle(false)" v-if="active">
      <div class="mad-modal_window" v-bind="$attrs" v-on="$listeners">
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
    title: { type: String }
  },

  data: () => ({
    stack,
    active: false,
  }),

  computed: {
    visible() {
      return this.stack[this.stack.length - 1] == this
    },
  },

  watch: {
    value(value) {
      this.toggle(value)
    },
  },

  methods: {
    toggle(active=!this.active) {
      if (active == this.active) return
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
      if (this.active && event.keyCode == 27) {
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
  },
  
  created() {
    window.document.addEventListener('keyup', this.onKeyup)
    this.toggle(this.value)
  },

  beforeDestroy() {
    window.document.removeEventListener('keyup', this.onKeyup)
    this.toggle(false)
  },
}
</script>
