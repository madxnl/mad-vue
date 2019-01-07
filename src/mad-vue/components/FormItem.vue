<template>
  <p class="mad-form-item" :class="classes"
    v-bind="$attrs" v-on="$listeners">
    <label v-if="label || error" class="mad-form-item_label"
      :title="required && 'This field is required'">
      <slot name="label">
        {{label || 'This field'}}
      </slot>
      {{error}}
    </label>
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: {
    label: String,
    value: {},
    required: Boolean,
    validator: Function,
    // for: String,
  },

  data: () => ({
    error: null,
  }),

  computed: {
    parentForm() {
      for (let v = this; v; v = v.$parent) if (v.formItems) return v
    },

    classes() {
      return [
        this.error && '-haserror',
        this.required && '-required',
      ]
    },
  },

  watch: {
    value() {
      if (this.error) this.validate()
    },
  },

  methods: {
    async validate() {
      this.error = await this.getValidationError(this.value)
      return !this.error
    },

    async getValidationError(value) {
      if (this.required && !value) {
        return 'is required'
      } else if (this.validator) {
        return await this.validator(value)
      }
    },
  },

  mounted() {
    if (this.parentForm) {
      this.parentForm.formItems = this.parentForm.formItems.concat(this)
    }
  },

  beforeDestroy() {
    if (this.parentForm) {
      this.parentForm.formItems = this.parentForm.formItems.filter(item => item != this)
    }
  },
}
</script>
