<template>
  <div>
    <p>
      <mad-button @click="showSuccess" color="green">Success</mad-button>
      <mad-button @click="showInfo" color="blue">Info</mad-button>
      <mad-button @click="showWarn" color="yellow">Warn</mad-button>
      <mad-button @click="showError" color="red">Error</mad-button>
      <mad-button @click="customShown=true">Custom html</mad-button>
    </p>
    <!--
    <mad-message v-model="customShown">
      A custom message
      <mad-button variant="flat">
        Button
      </mad-button>
    </mad-message>
    -->
  </div>
</template>

<script>
export default {
  data: () => ({
    customShown: false,
  }),

  methods: {
    showSuccess() {
      this.$mad.message.success(`It worked! High-fives all around!`)
    },

    showInfo() {
      this.$mad.message.info(`These messages are an easy way to notify the user.`)
    },

    showWarn() {
      this.$mad.message.warn(`I'm warning you.`)
    },

    showError() {
      this.$mad.message.error(`This could be an error!`)
    },

    showCustom() {

    },
  },
}
</script>
