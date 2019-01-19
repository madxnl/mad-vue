<template>
  <div class="code-example">

    <mad-tabs :tabs="[
      'Example',
      'Source',
      this.$slots.api && 'API',
    ]">

      <template slot="Source">
        <code-block class="card">{{source}}</code-block>
      </template>

      <template slot="Example">
        <div class="card">
          <component :is="component" />
        </div>
      </template>

      <template slot="API">
        <div class="card">
          <slot name="api"></slot>
        </div>
      </template>

    </mad-tabs>

  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    toggled: false,
    source: null,
    component: null,
  }),
  async mounted() {
    this.component = require(`../examples/${this.name}.vue`).default
    this.source = require(`!raw-loader!../examples/${this.name}.vue`)
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

.code-example {
}

</style>
