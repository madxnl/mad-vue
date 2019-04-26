<template>
  <mad-form class="sy-sm" @submit="onSubmit">
    <mad-form-item label="Message" :value="message" required>
      <mad-input v-model="message" />
    </mad-form-item>

    <mad-button type="submit" class="bg-primary">
      Submit
    </mad-button>
  </mad-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
  }),

  methods: {
    onSubmit() {
      this.$mad.message.success(`Message: ${this.message}`)
      this.message = ''
    },
  },
}
</script>
