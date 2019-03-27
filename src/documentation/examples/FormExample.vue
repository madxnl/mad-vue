<template>
  <mad-form @submit="onSubmit">
    <mad-form-item label="Message" :value="message" required>
      <mad-input v-model="message" />
    </mad-form-item>

    <p>
      <mad-button type="submit" class="bg-primary">
        Submit
      </mad-button>
    </p>
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
