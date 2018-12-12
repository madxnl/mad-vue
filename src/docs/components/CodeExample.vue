<template>
  <figure>
    <div class="-top">
      <mad-button @click="toggled=!toggled" class="small" flat>
        <mad-icon mdi="code-tags" />
      </mad-button>
    </div>
    <div class="container">
      <mad-transition>
        <code-block v-if="toggled">{{source}}</code-block>
        <component v-else-if="component" :is="component" />
      </mad-transition>
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

.-top {
  // background: rgba($text, 0.75);
  // color: white;
  padding: .5em .5em 0;
  text-align: right;
  cursor: pointer;
}

</style>
