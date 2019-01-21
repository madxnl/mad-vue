<template>
  <div>
    <p>
      <mad-button @click="showSuccess" color="green">Success</mad-button>
      <mad-button @click="showInfo" color="blue">Info</mad-button>
      <mad-button @click="showWarn" color="yellow">Warn</mad-button>
      <mad-button @click="showError" color="red">Error</mad-button>
    </p>
    <p>
      <mad-button @click="customShown=!customShown" :active="customShown">
        Toggle custom html message
      </mad-button>
    </p>
    <mad-message v-model="customShown">
      A custom message {{timer}}!
      <mad-button variant="flat">
        Button
      </mad-button>
    </mad-message>
  </div>
</template>

<script>
export default {
  data: () => ({
    customShown: false,
    timer: 0,
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

  created() {
    setInterval(() => this.timer += 1, 500)
  },
}
</script>
