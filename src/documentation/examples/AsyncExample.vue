<template>
  <div class="space">
    <!-- <mad-loading v-if="test"/> -->
    <mad-button :click="submit" class="bg-blue">
      Submit
    </mad-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    test: false,
  }),

  computed: {
    // loading() {
      // return this.$hasPending('submit')
    // },
  },

  methods: {
    async submit() {
      await new Promise(r => setTimeout(r, 2000))
    },
  },

  created() {
    setInterval(() => this.test = !this.test, 1400)
  },
}
</script>
