<template>
  <div>
    <p>
      <mad-button color="primary" @click="$refs.modal.toggle()">
        Toggle by modal reference
      </mad-button>
    </p>

    <p>
      <label>
        <input v-model="modalShown" type="checkbox">
        Toggle v-model value
      </label>
    </p>

    <mad-modal ref="modal" v-model="modalShown">
      <h1>Modal</h1>
      <p>Example modal</p>
      <p>
        <mad-button color="primary" @click="$refs.modal2.toggle()">
          Toggle nested modal
        </mad-button>
        <mad-button color="primary" @click="closeModal">
          Close
        </mad-button>
      </p>
    </mad-modal>

    <mad-modal ref="modal2">
      <div class="pad space">
        <h1>Modal 2</h1>
        <p>Example modal</p>
        <mad-button color="primary" @click="$refs.modal2.toggle()">
          Close
        </mad-button>
      </div>
    </mad-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    modalShown: false,
  }),

  methods: {
    closeModal() {
      this.modalShown = false
    },
  },
}
</script>
