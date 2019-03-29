<template>
  <form
    novalidate
    v-bind="$attrs"
    @submit.prevent.stop="submit"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  data: () => ({
    formItems: [], // formItem registers itself
  }),

  methods: {
    async submit(event) {
      if (await this.validateAll()) {
        this.$emit('submit', event)
      } else {
        this.$mad.message.error('Form contains errors, please check them and try again')
      }
    },

    async validateAll() {
      for (let item of this.formItems) {
        await item.validate()
      }
      return this.formItems.every(item => !item.error)
    },

    registerFormItem(formItem) {
      if (!this.formItems.includes(formItem)) {
        this.formItems = this.formItems.concat(formItem)
      }
    },

    unregisterFormItem(formItem) {
      this.formItems = this.formItems.filter(item => item !== formItem)
    },
  },
}
</script>
