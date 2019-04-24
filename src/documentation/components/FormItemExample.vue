<template>
  <mad-form class="v-spacing-sm" @submit="onSubmit">
    <mad-form-item label="Message" required :value="message">
      <mad-input v-model="message" />
    </mad-form-item>

    <mad-form-item label="Email" :value="email" :validator="validateEmail">
      <mad-input v-model="email" />
    </mad-form-item>

    <mad-form-item label="Name">
      <div slot="label">
        <mad-icon mdi="account-box-outline" />
        Name
      </div>
      <mad-input v-model="name" />
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
    email: '',
    name: '',
  }),

  methods: {
    onSubmit() {
      this.$mad.message.success(`Message: ${this.message}`)
      this.message = ''
    },

    validateEmail(email) {
      if (!email.includes('@')) return 'is invalid'
    },
  },
}
</script>
