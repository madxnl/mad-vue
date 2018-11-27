<template>
  <div>
    <mad-button @click="showSuccess" color="green">Success</mad-button>
    <mad-button @click="showInfo" color="blue">Info</mad-button>
    <mad-button @click="showWarn" color="yellow">Warn</mad-button>
    <mad-button @click="showError" color="red">Error</mad-button>
  </div>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.$mad.message.success('It worked! High-fives all around!')
    },

    showInfo() {
      this.$mad.message.info('These messages are an easy way to notify the user.')
    },

    showWarn() {
      this.$mad.message.warn('I\'m warning you.')
    },

    showError() {
      this.$mad.message.error('Woops, this is what error messages look like :(')
    },
  },
}
</script>
