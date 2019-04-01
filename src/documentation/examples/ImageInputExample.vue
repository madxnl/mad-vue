<template>
  <div>
    <mad-form-item label="Image">
      <mad-input-image
        v-model="image"
        :allowed-resolutions="[[800,400]]"
      />
    </mad-form-item>
  </div>
</template>

<script>
import ElephantJPG from '../assets/elephant.jpg'

export default {
  data: () => ({
    image: ElephantJPG,
  }),
  methods: {
  },
}
</script>
