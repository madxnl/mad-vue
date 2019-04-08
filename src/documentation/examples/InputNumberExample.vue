<template>
  <div>
    <mad-form-item label="Number of items">
      <mad-input-number v-model="number" placeholder="0" />
    </mad-form-item>

    <mad-form-item label="Cost per item">
      <mad-input-number v-model="cost" :min="0" :decimals="null" placeholder="0.00">
        <mad-icon mdi="currency-eur" />
      </mad-input-number>
    </mad-form-item>

    <div>
      {{ number || 0 }} <mad-icon mdi="close" />
      <mad-icon mdi="currency-eur" /> {{ (cost || 0).toFixed(2) }}
      <mad-icon mdi="equal" /> <mad-icon mdi="currency-eur" /> {{ total.toFixed(2) }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    number: null,
    cost: null,
  }),

  computed: {
    total() {
      return this.number * this.cost
    },
  },
}
</script>
