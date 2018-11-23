<template>
  <div class="mad-loading">
    <div class="mad-loading_inner">
    </div>
  </div>
  <!-- <h1 class="mad-loading text-center"
    v-bind="$attrs" v-on="$listeners">
    <mad-icon mdi="loading" class="mdi-spin"/>
  </h1> -->
</template>

<script>
// let loadingCount = 0

export default {
  created() {
    // loadingCount++
    // document.body.style.cursor = 'progress'
  },

  beforeDestroy() {
    // loadingCount--
    // if (loadingCount == 0) {
    //   document.body.style.cursor = null
    // }
  },
}
</script>
