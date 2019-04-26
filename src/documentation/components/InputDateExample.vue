<template>
  <mad-form class="sy-sm" @submit="onSubmit">
    <mad-form-item label="Message" required>
      <mad-input v-model="message" />
    </mad-form-item>

    <mad-form-item label="Date and time" :value="datetime" required>
      <mad-input-date v-model="datetime" time seconds />
    </mad-form-item>

    <mad-button type="submit" color="primary">
      Submit
    </mad-button>
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
    validator(x) {
      return 'nope'
    },
  },
}
</script>
