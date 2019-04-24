<template>
  <div>
    <p>
      The default theme colors (based on material design) look like this:
    </p>
    <p class="row wrap">
      <span class="p1 bg-red">red</span>
      <span class="p1 bg-pink">pink</span>
      <span class="p1 bg-purple">purple</span>
      <span class="p1 bg-deeppurple">deeppurple</span>
      <span class="p1 bg-indigo">indigo</span>
      <span class="p1 bg-blue">blue</span>
      <span class="p1 bg-lightblue">lightblue</span>
      <span class="p1 bg-cyan">cyan</span>
      <span class="p1 bg-teal">teal</span>
      <span class="p1 bg-green">green</span>
      <span class="p1 bg-lightgreen">lightgreen</span>
      <span class="p1 bg-lime">lime</span>
      <span class="p1 bg-yellow">yellow</span>
      <span class="p1 bg-amber">amber</span>
      <span class="p1 bg-orange">orange</span>
      <span class="p1 bg-deeporange">deeporange</span>
      <span class="p1 bg-brown">brown</span>
      <span class="p1 bg-bluegray">bluegray</span>
      <span class="p1 bg-black">black</span>
      <span class="p1 bg-dark">dark</span>
      <span class="p1 bg-gray">gray</span>
      <span class="p1 bg-light">light</span>
      <span class="p1 bg-white">white</span>
      <span class="p1 bg-primary">primary</span>
      <span class="p1 bg-accent">accent</span>
    </p>
    <p>
      This can be customized by passing options to the plugin:
    </p>
    <code-block class="card" filename="./src/main.js">
      <pre>
Vue.use(MadVue, {
  theme: {
    red: '#ff2200'
    primary: '#54225',
  },
})</pre>
    </code-block>
    <p>
      It is even possible to modify the theme while the app is running:
    </p>
    <component-example path="ThemeExample" />
  </div>
</template>

<script>
export default {
}
</script>
