<template>
  <transition-group name="_transition" class="mad-messages" tag="div">
    <template v-for="msg in messages">
      <mad-message
        :key="msg.id"
        :color="msg.color"
        @close="close(msg)"
      >
        {{ msg.text }}
      </mad-message>
    </template>

    <div
      v-for="comp in customMessages"
      :key="comp._uid"
      class="mad-message"
      @close="comp.close"
      v-html="getCustomHtml(comp)"
    >
    </div>
  </transition-group>
</template>

<script>
const el = document.createElement('div')
document.body.appendChild(el)

export default {
  el,

  data: () => ({
    messages: [],
    customMessages: [],
  }),

  beforeDestroy() {
    this.customMessages.forEach(c => this.removeMessageComponent(c))
  },

  methods: {
    info(message, options = {}) {
      options.color = 'blue'
      return this.message(message, options)
    },

    success(message, options = {}) {
      options.color = 'green'
      return this.message(message, options)
    },

    warn(message, options = {}) {
      options.color = 'yellow'
      return this.message(message, options)
    },

    error(message, options = {}) {
      options.color = 'red'
      return this.message(message, options)
    },

    message(message, options = {}) {
      // console.debug(message)
      const color = options.color
      const text = message.toString()
      if (this.messages.map(m => m.text).includes(text)) return
      const id = Math.random().toString().slice(2)
      const object = { message, text, color, id }
      this.messages.push(object)
      setTimeout(() => this.close(message), 10000)
    },

    close(message) {
      this.messages = this.messages.filter(m => m !== message && m.message !== message)
    },

    appendMessageComponent(component) {
      // this.$el.appendChild(component.$el)
      // component.$once('close', () => {
      //   this.removeMessageComponent(component)
      // })
    },

    removeMessageComponent(component) {
      // this.$el.removeChild(component.$el)
      // component.$off('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/vars';

._transition-move,
._transition-enter-active,
._transition-leave-active {
  transition: all .5s;
}
._transition-enter,
._transition-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  // transform: translateY(20px);
}
// ._transition-leave-active {
  // position: absolute;
// }
</style>
