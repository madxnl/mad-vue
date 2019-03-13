<template>
  <div>
    <p>
      <mad-button @click="toggleLoading(0)">
        Loading
      </mad-button>
      <mad-loading v-if="loading[0]"/>
    </p>
    <p>
      <mad-button @click="toggleLoading(1)">
        Loading
      </mad-button>
      <mad-loading v-if="loading[1]" fixed/>
    </p>
    <p>
      <mad-button @click="toggleLoading(2)">
        Loading
      </mad-button>
      <mad-loading v-if="loading[2]" bar/>
    </p>
    <p>
      <mad-button @click="toggleLoading(3)">
        Loading
      </mad-button>
      <mad-loading v-if="loading[3]" fixed bar color="red"/>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: [false, false, false, false],
  }),

  methods: {
    toggleLoading(idx) {
      this.loading = this.loading.map((x, i) => i == idx ? !x : x)
    },
  },
}
</script>