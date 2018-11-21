<template>
  <figure>
    <div @click="toggled=!toggled" class="-bar">
      <mad-icon mdi="code-tags" />
    </div>
    <div class="padded">
      <div v-if="toggled">
        <code-block>{{source}}</code-block>
      </div>
      <div v-else>
        <component :is="component" />
      </div>
    </div>
  </figure>
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
@import '~@/mad-vue/scss/vars';

.-bar {
  // background: rgba($text, 0.75);
  // color: white;
  padding: .5em;
  text-align: right;
  cursor: pointer;
}

</style>
