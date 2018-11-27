<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: { required: true },
  },
  computed: {
    selectComponent() {
      for (let v = this; v; v = v.$parent) if (v.optionComponents) return v
    },
  },
  mounted() {
    if (this.selectComponent) {
      this.selectComponent.registerOptionComponent(this)
    }
  },
  beforeDestroy() {
    if (this.selectComponent) {
      this.selectComponent.unregisterOptionComponent(this)
    }
  },
}
</script>

