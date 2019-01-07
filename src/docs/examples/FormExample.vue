<template>
  <mad-form @submit="onSubmit">
    <mad-form-item label="Message" :value="message" required>
      <mad-input v-model="message"/>
    </mad-form-item>

    <mad-form-item label="Date and time" :value="datetime" required>
      <mad-input-date time seconds v-model="datetime"/>
    </mad-form-item>
    <mad-form-item label="Checkboxes">
      <mad-checkbox v-model="checkboxChecked">
        Checked: {{checkboxChecked}}
      </mad-checkbox>
      <!-- <mad-switch v-model="checked">{{checked}}</mad-switch> -->
    </mad-form-item>
    <p>
      <mad-button type="submit" color="primary">Submit</mad-button>
    </p>
  </mad-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
    datetime: new Date(),
    checkboxChecked: false,
  }),
  methods: {
    onSubmit() {
      this.$mad.message.success(`Submitted message "${this.message}"`)
      this.message = ''
    },
    validator(x) {
      // return 'nope'
    },
  },
}
</script>