<template>
  <div>
    <p>
      <mad-button class="bg-green" @click="showSuccess">
        Success
      </mad-button>
      <mad-button class="bg-blue" @click="showInfo">
        Info
      </mad-button>
      <mad-button class="bg-orange" @click="showWarn">
        Warn
      </mad-button>
      <mad-button class="bg-red" @click="showError">
        Error
      </mad-button>
    </p>
    <p>
      <mad-button :active="customShown" @click="customShown=!customShown">
        Toggle custom html message
      </mad-button>
    </p>
    <mad-message v-model="customShown">
      A custom message {{ timer }}!
      <mad-button>
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

  created() {
    setInterval(() => {
      this.timer += 1
    }, 500)
  },

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
