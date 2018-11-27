<template>
  <div>
    <h4>{{name}}</h4>
    <mad-tabs :tabs="[
      $slots.props && 'Props',
      $slots.events && 'Events',
      $slots.slots && 'Slots',
    ]" v-model="tab"/>
    
    <table class="component-api-table" v-if="tab=='Props'">
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <slot name="props"></slot>
    </table>
    
    <table class="component-api-table" v-if="tab=='Events'">
      <tr>
        <th>Event</th>
        <th>Description</th>
      </tr>
      <slot name="events"></slot>
    </table>

    <table class="component-api-table" v-if="tab=='Slots'">
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
  props: {
    name: String,
  },
  data: () => ({
    tab: 'Props',
  }),
}
</script>

<style lang="scss" scoped>
@import '~@/mad-vue/scss/vars';


</style>
