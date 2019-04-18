<template>
  <div class="component-example">
    <mad-tabs
      v-model="tab"
      :tabs="[
        'Example',
        'Code',
      ]"
    />
    <div>
      <div v-show="tab === 'Example'" class="card">
        <component :is="component" />
      </div>

      <div v-if="tab === 'Code'" class="card">
        <code-block>{{ source }}</code-block>
      </div>
    </div>

    <template v-if="props || events">
      <mad-tabs
        v-model="apiTab"
        :tabs="[
          props && 'Props',
          events && 'Events',
          slots && 'Slots',
        ]"
      />
      <div class="card">
        <template v-if="apiTab === 'Props'">
          <table class="component-api-table">
            <tr><th>Prop</th><th>Description</th><th>Default</th></tr>
            <tr v-for="prop in props" :key="prop.name">
              <td>
                <code>{{ prop.name }}</code>
                <br><small class="faded">{{ prop.type }}</small>
              </td>
              <td v-html="prop.description"></td>
              <td><code>{{ prop.default }}</code></td>
            </tr>
          </table>
        </template>

        <template v-if="apiTab === 'Events'">
          <table class="component-api-table">
            <tr><th>Event</th><th>Description</th></tr>
            <tr v-for="event in events" :key="event.name">
              <td>
                <code>{{ event.name }}</code>
              </td>
              <td v-html="event.description"></td>
            </tr>
          </table>
        </template>

        <template v-if="apiTab === 'Slots'">
          <table class="component-api-table">
            <tr><th>Slot</th><th>Description</th></tr>
            <tr v-for="slot in slots" :key="slot.name">
              <td>
                <code>{{ slot.name }}</code>
              </td>
              <td v-html="slot.description"></td>
            </tr>
          </table>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    path: { type: String, required: true },
    props: { type: Array, default: null },
    events: { type: Array, default: null },
    slots: { type: Array, default: null },
  },

  data: () => ({
    toggled: false,
    source: null,
    component: null,
    tab: null,
    apiTab: 'Props',
  }),

  async mounted() {
    if (!this.path) return
    this.component = require(`@/components/${this.path}.vue`).default
    this.source = require(`!raw-loader!@/components/${this.path}.vue`).default
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/vars';

// .-top {
//   // background: rgba($text, 0.75);
//   // color: white;
//   padding: .5em .5em 0;
//   text-align: right;
//   cursor: pointer;
// }

// .component-example {}

.component-api-table {
  width: 100%;

  td {
    vertical-align: top;
  }

  // td:not(:last-child) {
  //   font-family: monospace;
  //   font-size: 85%;
  // }
  // td:first-child {
  // }
}

.-maxheight {
  max-height: 500px;
  overflow: auto;
}

</style>
