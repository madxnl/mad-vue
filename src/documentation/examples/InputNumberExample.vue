<template>
  <div class="v-spacing-sm">
    <mad-form-item label="Boxes">
      <mad-input-number v-model="boxes" :max="100" />
      {{ JSON.stringify(boxes) }}
    </mad-form-item>

    <mad-form-item label="Currency">
      <mad-input-number v-model="cost" :min="0" :decimals="2" placeholder="0.00">
        <mad-icon mdi="currency-eur" />
      </mad-input-number>
      {{ JSON.stringify(cost) }}
    </mad-form-item>

    <input v-model="boxes">
  </div>
</template>

<script>
export default {
  data: () => ({
    boxes: null,
    cost: null,
  }),
}
</script>
