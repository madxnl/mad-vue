<template>
  <mad-form class="space" @submit="onSubmit">
    <mad-form-item label="Message" :value="message" required>
      <mad-input v-model="message" placeholder="Try leaving this field blank"/>
    </mad-form-item>
    <mad-button type="submit" class="bg-blue">Submit</mad-button>
  </mad-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
  }),
  methods: {
    onSubmit() {
      this.$mad.messages.success(`Submitted message "${this.message}"`)
      this.message = ''
    },

    scrollDetect(visible) {
      console.log('scroll detect', visible)
    },
  },
}
</script>
