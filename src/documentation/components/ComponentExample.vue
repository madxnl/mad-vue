<template>
  <div class="component-example">
    <mad-tabs
      v-model="tab"
      :tabs="[
        'Example',
        'Code',
      ]"
    />
    <div class="card -maxheight">
      <template v-if="tab === 'Example'">
        <component :is="component" />
      </template>

      <template v-if="tab === 'Code'">
        <code-block>{{ source }}</code-block>
      </template>
    </div>

    <template v-if="props || events">
      <mad-tabs
        v-model="apiTab"
        :tabs="[
          props && 'Props',
          events && 'Events',
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
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    props: { type: Array, default: null },
    events: { type: Array, default: null },
  },

  data: () => ({
    toggled: false,
    source: null,
    component: null,
    tab: null,
    apiTab: 'Props',
  }),

  async mounted() {
    this.component = require(`../examples/${this.name}.vue`).default
    this.source = require(`!raw-loader!../examples/${this.name}.vue`).default
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
