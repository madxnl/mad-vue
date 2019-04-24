<template>
  <div>
    <h3 class="primary">
      Set primary color:
    </h3>
    <div>
      <mad-button class="bg-red" @click="setPrimary('var(--red)')">
        Red
      </mad-button>
      <mad-button class="bg-blue" @click="setPrimary('var(--blue)')">
        Blue
      </mad-button>
      <mad-button class="bg-green" @click="setPrimary('var(--green)')">
        Green
      </mad-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setPrimary(color) {
      this.$mad.theme.applyTheme({
        primary: color,
      })
    },
  },
}
</script>
