<template>
  <div>
    <mad-form-item label="Image">
      <mad-input-image v-model="image"
        :resolutions="[[800,400]]"/>
    </mad-form-item>
  </div>
</template>

<script>
import ElephantImage from '../assets/elephant.jpg'

export default {
  data: () => ({
    image: ElephantImage,
  }),
  methods: {
  },
}
</script>