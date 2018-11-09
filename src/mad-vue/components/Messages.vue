<template>
  <transition-group name="_transition" class="mad-messages pad-xs space-xs" tag="div">
    <div v-for="msg in $mad.message.messages.slice(0).reverse()" :key="msg.id"
      :class="`pad-sm row space-sm align-start _${msg.type}`">
      <p class="grow">{{msg.text}}</p>
      <p class="_close"><mad-icon mdi="close" @click="$mad.message.close(msg)" /></p>
    </div>
  </transition-group>
</template>

<style lang="scss" scoped>
@import '../scss/vars';

._transition-move,
._transition-enter-active,
._transition-leave-active {
  transition: all .5s;
}
._transition-enter,
._transition-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  // transform: translateY(20px);
}
// ._transition-leave-active {
  // position: absolute;
// }
</style>
