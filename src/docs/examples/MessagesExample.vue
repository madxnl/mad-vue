<template>
  <div>
    <mad-button @click="showInfo" color="blue">Info</mad-button>
    <mad-button @click="showSuccess" color="green">Success</mad-button>
    <mad-button @click="showError" color="red">Error</mad-button>
  </div>
</template>

<script>
export default {
  methods: {
    showInfo() {
      this.$mad.message.info('These messages are an easy way to notify the user.')
    },
    showSuccess() {
      this.$mad.message.success('It worked! High-fives all around!')
    },
    showError() {
      this.$mad.message.error('Woops, this is what error messages look like :(')
    },
  },
}
</script>
