<template>
  <figure class="-example">
    <div class="pad">
      <component :is="component" />
    </div>
    <div @click="toggled=!toggled" class="-bar">
      <mad-icon mdi="code-braces" />
      {{toggled ? 'Hide' : 'Show'}} code
    </div>
    <div class="pad" v-if="toggled">
      <pre><code>{{source}}</code></pre>
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
  // background: $blue;
  // color: white;
  // padding: .5em;
  cursor: pointer;
}
.-example {
  border: 1px solid $blue;
  padding: 1em;
}

</style>
