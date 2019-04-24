<template>
  <div
    class="mad-loading"
    :class="computedClass"
  >
    <!-- <div class="mad-loading_inner"></div> -->
  </div>
  <!-- <h1 class="mad-loading text-center"
    v-bind="$attrs" v-on="$listeners">
    <mad-icon mdi="loading" class="mdi-spin"/>
  </h1> -->
</template>

<script>
// let loadingCount = 0

export default {
  props: {
    bar: Boolean,
    fixed: Boolean,
    absolute: Boolean,
    color: { type: String, default: null },
  },

  computed: {
    computedClass() {
      return [
        this.bar && '-bar',
        this.fixed && '-fixed',
        this.absolute && '-absolute',
        this.color && `color-${this.color}`,
      ]
    },
  },

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

<style lang="scss">
@import '../scss/vars';

.mad-loading {
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border: solid .125em;
    border-color: currentColor transparent transparent transparent;
    border-radius: 50%;
    animation: loading-spin 1s linear infinite;
    animation-fill-mode: both;
  }
  &.-fixed {
    position: fixed;
    bottom: .5em; left: .5em;
  }
  &.-absolute {
    position: absolute;
    bottom: 50%; left: 50%; transform:translate(-50%,50%);
  }
  &.-bar {
    width: 100%;
    height: 5px;
    display: block;
    overflow: hidden;
    &::after {
      position: absolute;
      border-radius: 0;
      border: 0;
      animation: loading-bar 3s ease-in-out infinite;
      animation-fill-mode: both;
      background: currentColor;
    }
    &.-fixed {
      top: 0; left: 0;
    }
    &.-absolute {
      top: 0; left: 0;
    }
  }
}
@keyframes loading-bar {
  from { left: -100%; }
  to { left: 100%; }
}
@keyframes loading-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

</style>
