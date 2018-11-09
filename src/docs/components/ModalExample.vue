<template>
  <div class="space-sm">
    <mad-button @click="$refs.modal.toggle()" class="bg-blue">
      Toggle by modal reference
    </mad-button>

    <br>
    
    <label>
      <input type="checkbox" v-model="modalShown">
      Toggle v-model value
    </label>

    <mad-modal v-model="modalShown" ref="modal">
      <div class="pad space">
        <h1>Modal</h1>
        <p>Example modal</p>
        <p class="row space-sm">
          <mad-button @click="$refs.modal2.toggle()" class="bg-blue">
            Toggle nested modal
          </mad-button>
          <mad-button @click="closeModal" bg="blue">
            Close
          </mad-button>
        </p>
      </div>
    </mad-modal>
    
    <mad-modal ref="modal2">
      <div class="pad space">
        <h1>Modal 2</h1>
        <p>Example modal</p>
        <mad-button @click="$refs.modal2.toggle()" bg="blue">
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
