export default (Vue, config) => new Vue({
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

  created() {
    if (!Vue.config.errorHandler) {
      Vue.config.errorHandler = err => {
        console.error(err)
        message.error(err)
      }
    }
  },
})