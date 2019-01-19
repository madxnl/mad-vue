<template>
  <div>
    <p>
      <mad-button @click="$refs.modal.toggle()" color="primary">
        Toggle by modal reference
      </mad-button>
    </p>

    <p>
      <label>
        <input type="checkbox" v-model="modalShown">
        Toggle v-model value
      </label>
    </p>

    <mad-modal v-model="modalShown" ref="modal">
      <h1>Modal</h1>
      <p>Example modal</p>
      <p>
        <mad-button @click="$refs.modal2.toggle()" color="primary">
          Toggle nested modal
        </mad-button>
        <mad-button @click="closeModal" color="primary">
          Close
        </mad-button>
      </p>
    </mad-modal>
    
    <mad-modal ref="modal2">
      <div class="pad space">
        <h1>Modal 2</h1>
        <p>Example modal</p>
        <mad-button @click="$refs.modal2.toggle()" color="primary">
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
