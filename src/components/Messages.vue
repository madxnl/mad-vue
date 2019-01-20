<template>
  <transition-group name="_transition" class="mad-messages" tag="div">
    <div v-for="msg in messages.slice(0).reverse()" :key="msg.id"
      :class="`mad-messages_message -${msg.type}`">
      <div class="mad-messages_text">
        {{msg.text}}
      </div>
      <mad-button flat class="mad-messages_close" @click="close(msg)">
        <mad-icon mdi="close"/>
      </mad-button>
    </div>
  </transition-group>
</template>

<script>
export default {
  data: () => ({
    messages: [],
  }),

  methods: {
    info(message, options = {}) {
      options.type = 'info'
      return this._newMessage(message, options)
    },

    success(message, options = {}) {
      options.type = 'success'
      return this._newMessage(message, options)
    },

    warn(message, options = {}) {
      options.type = 'warn'
      return this._newMessage(message, options)
    },

    error(message, options = {}) {
      options.type = 'error'
      return this._newMessage(message, options)
    },

    close(message) {
      this.messages = this.messages.filter(m => m != message && m.message != message)
    },

    _newMessage(message, options = {}) {
      // console.debug(message)
      const type = options.type || 'info'
      const text = message.toString()
      if (this.messages.map(m => m.text).includes(text)) return
      const id = Math.random().toString().slice(2)
      const object = { message, text, type, id }
      this.messages.unshift(object)
      setTimeout(() => this.close(message), 10000)
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
