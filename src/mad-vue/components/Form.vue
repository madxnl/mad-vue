<template>
  <form @submit.prevent.stop="submit"
    novalidate
    v-bind="$attrs">
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
  },
}
</script>
