<template>
  <!-- <mad-transition> -->
    <div v-show="value">
      <div
        :class="`mad-message bg-${color}`">
        <div class="mad-messages_text">
          <slot></slot>
        </div>
        <mad-button class="mad-messages_close" @click="close">
          <mad-icon mdi="close" :class="color ? 'white' : ''"/>
        </mad-button>
      </div>
    </div>
  <!-- </mad-transition> -->
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: true },
    color: { type: String },
  },

  watch: {
    async value(value) {
      if (value) {
        this.$mad.message.appendMessageComponent(this)
      } else {
        this.$mad.message.removeMessageComponent(this)
      }
    },
  },

  methods: {
    close() {
      this.$emit('close')
      this.$emit('input', false)
    },
  },

  beforeDestroy() {
    this.$mad.message.removeMessageComponent(this)
  }
}
</script>
