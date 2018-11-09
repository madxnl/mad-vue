<template>
  <mad-form @submit="onSubmit">
    <mad-form-item label="Message">
      <mad-input v-model="message"/>
    </mad-form-item>
    <mad-form-item label="Date and time" required>
      <mad-input-date time seconds v-model="datetime"/>
    </mad-form-item>
    <p>
      <mad-button type="submit" class="bg-blue">Submit</mad-button>
    </p>
  </mad-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
    datetime: new Date(),
  }),
  methods: {
    onSubmit() {
      this.$mad.message.success(`Submitted message "${this.message}"`)
      this.message = ''
    },
  },
}
</script>