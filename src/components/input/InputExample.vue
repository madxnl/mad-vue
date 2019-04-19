<template>
  <div class="v-spacing-2">
    <mad-form-item label="Message">
      <mad-input v-model="message" placeholder="Enter message here" />
    </mad-form-item>

    <mad-form-item label="Multi-line">
      <mad-input v-model="longMessage" rows="3" />
    </mad-form-item>

    <mad-form-item label="Password">
      <mad-input v-model="password" type="password">
        <mad-icon slot="after" mdi="lock-question" />
      </mad-input>
    </mad-form-item>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: '',
    longMessage: '',
    password: 'hunter2',
  }),
}
</script>
