<template>
  <!-- <mad-transition> -->
  <div v-show="value">
    <div
      :class="`mad-message bg-${color}`"
    >
      <div class="mad-messages_text">
        <slot></slot>
      </div>
      <mad-button class="mad-messages_close" @click="close">
        <mad-icon mdi="close" :class="color ? 'white' : ''" />
      </mad-button>
    </div>
  </div>
  <!-- </mad-transition> -->
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: true },
    color: { type: String, default: null },
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

  beforeDestroy() {
    this.$mad.message.removeMessageComponent(this)
  },

  methods: {
    close() {
      this.$emit('close')
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/vars';

.mad-message {
  max-width: 600px;
  margin: 0 auto .5rem auto;
  max-height: 200px;
  z-index: 80;
  pointer-events: auto;
  background: white;
  box-shadow: 0 2px 5px rgba(black, 0.3);
  cursor: default;
  border-radius: 2px;
  font-weight: bold;
  overflow: hidden;
  display: flex;
  // align-items: flex;
  justify-content: space-between;

  .mad-messages_text {
    padding: .5rem;
    padding-left: 1rem;
  }
}
</style>
