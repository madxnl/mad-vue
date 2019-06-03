<template>
  <div>

    <table class="component-api-table" v-if="$slots.props">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <slot name="props"></slot>
    </table>

    <table class="component-api-table" v-if="$slots.events">
      <tr>
        <th>Event</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
      <slot name="events"></slot>
    </table>

    <table class="component-api-table" v-if="$slots.slots">
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
      <slot name="slots"></slot>
    </table>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~@/scss/vars';

.component-api-table {
  width: 100%;

  td:not(:last-child) {
    font-family: monospace;
    font-size: 85%;
  }
  td:first-child {
    font-weight: bold;
  }
}

</style>
