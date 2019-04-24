<template>
  <div
    class="mad-form-item"
    :class="classes"
  >
    <label
      v-if="label || error"
      class="mad-form-item_label"
      :title="required && 'This field is required'"
      v-bind="$attrs"
    >
      <slot name="label">
        {{ label || 'Unlabeled field' }}
      </slot>
      {{ error }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: null },
    value: { default: undefined },
    required: { type: Boolean, default: false },
    requiredMessage: { type: String, default: 'is required' },
    validator: { type: Function, default: null },
  },

  data: () => ({
    error: null,
  }),

  computed: {
    parentForm() {
      for (let v = this; v; v = v.$parent) {
        if (v.registerFormItem) return v
      }
      return null
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

  mounted() {
    if (this.parentForm) {
      this.parentForm.registerFormItem(this)
    }
  },

  beforeDestroy() {
    if (this.parentForm) {
      this.parentForm.unregisterFormItem(this)
    }
  },

  methods: {
    async validate() {
      this.error = await this.getValidationError(this.value)
      return !this.error
    },

    async getValidationError(value) {
      if (this.required && !value) {
        return this.requiredMessage
      } else if (this.validator) {
        return this.validator(value)
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/vars';

.mad-form-item {
  margin-bottom: 1rem;
  display: block;
  &.-haserror {
    color: $red;
  }
}
.mad-form-item_label {
  display: block;
  margin-bottom: 0.25em;
  font-weight: bold;
  font-size: 90%;
  .-required &::after {
    content: '*';
    color: $red;
  }
}
</style>
