<template>
  <div class="mad-input-image">
    <div class="mad-input-image_dragarea"
      @drop.prevent="drop"
      @dragover.prevent="dragover"
      @dragleave.self.prevent="dragleave">
      drag here
    </div>

    <input type="file"
      ref="fileinput"
      class="d-block"
      :id="_uid"
      :disabled="disabled"
      @change="onInput">
    
    <div v-if="value" class="mad-input-image_preview">
      <img ref="image" :src="imageSrc" @load="onImgLoad">
      <p>
        {{imageName}}
        <template v-if="imageRes">&nbsp; {{imageRes.join('x')}}</template>
      </p>
      <p v-if="resolutions">
        Allowed resolutions: {{resolutions.map(r => r.join('x')).join(', ')}}
        draggingFileOver:{{draggingFileOver}}
      </p>
      <p>
        <br>
        <mad-button @click="openEditor">
          Crop/resize
        </mad-button>
      </p>
    </div>

    <mad-modal v-model="modalShown">
      
      <p class="mad-input-image_canvasdiv">
        <canvas ref="canvas"></canvas>
      </p>

      <p v-if="resolutions && resolutions.length > 1">
        <label v-for="res in resolutions" :key="res.join('x')">
          <input type="radio" name="crop-resolutions" :value="res">
          {{res.join('x')}}
        </label>
      </p>
      <p v-else class="row h-spacing-sm align-center">
        <span>Crop/resize to:</span>
        <mad-input type="number" v-model="targetWidth" placeholder="width" :disabled="resolutions"/>
        <span>x</span>
        <mad-input type="number" v-model="targetHeight" placeholder="height" :disabled="resolutions"/>
      </p>

      <div>
        <mad-button @click="modalShown=false">
          Cancel
        </mad-button>
        <mad-button @click="applyCrop">
          Apply
        </mad-button>
      </div>

    </mad-modal>
  </div>
</template>

<script>
// todo
// change target w/h (only if not predefined res)
// - updates cropRect to nearest fit
// drag crop rect
// - 4 dir cursor on mouseover rectangle area
// padding edit canvas by 10
// draw edge controls
// - drag controls to move cropRect
// - preserve ratio if fixed output res
// - otherwise update target w/h 
// click to recenter crop area
// drag outside crop area to crop new area

export default {
  props: {
    value: [String, File],
    disabled: Boolean,
    resolutions: Array,
  },

  data: () => ({
    imageFile: null,
    imageSrc: null,
    imageName: null,
    modalShown: false,
    imageRes: null,
    targetWidth: null,
    targetHeight: null,
    cropRect: null,
    draggingFileOver: false,
  }),

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.$refs.fileinput.value = ''
          this.imageName = null
        }
        if (typeof value == 'string') {
          this.imageSrc = value
          const parts = value.split('/')
          this.imageName = parts[parts.length - 1]
        }
        if (value instanceof File) {
          this.imageName = value.name
          const reader = new FileReader()
          reader.onload = e => this.imageSrc = e.target.result
          reader.readAsDataURL(value)
        }
      },
    },
  },

  methods: {
    onInput(event) {
      const file = event.target.files[0]
      this.$emit('input', file)
    },

    onImgLoad(event) {
      const img = event.target
      this.imageFile = img
      this.imageRes = [img.naturalWidth, img.naturalHeight]
    },

    async openEditor() {
      if (this.resolutions) {
        const res = this.resolutions[0]
        this.targetWidth = res[0]
        this.targetHeight = res[1]
        const ratio = res[0] / res[1]
        const w = Math.min(this.imageRes[0], this.imageRes[1] * ratio)
        const h = w / ratio
        this.cropRect = [(this.imageRes[0] - w) / 2, (this.imageRes[1] - h) / 2, w, h]
      }
      this.modalShown = true
      await this.$nextTick()
      this.renderLoop()
    },

    renderLoop() {
      if (!this.modalShown) return
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const scaling = Math.min(
        canvas.parentNode.clientHeight / this.imageRes[1],
        canvas.parentNode.clientWidth / this.imageRes[0])
      const height = this.imageRes[1] * scaling
      const width = this.imageRes[0] * scaling
      canvas.width = width
      canvas.height = height
      ctx.drawImage(this.imageFile, 0, 0, width, height)
      if (this.cropRect) {
        const scaledRect = this.cropRect.map(x => x * scaling)
        ctx.globalAlpha = 0.5
        ctx.fillRect(0, 0, width, height)
        ctx.globalAlpha = 1
        ctx.drawImage(this.imageFile, ...this.cropRect, ...scaledRect)
        ctx.strokeStyle = 'white'
        ctx.setLineDash([10, 10])
        ctx.lineDashOffset = 0
        ctx.strokeRect(...scaledRect)
        ctx.strokeStyle = 'black'
        ctx.lineDashOffset = 10
        ctx.strokeRect(...scaledRect)
        // drawCropControl
      }
      window.requestAnimationFrame(() => this.renderLoop())
    },

    applyCrop() {
      const canvas = document.createElement('canvas')
      canvas.width = this.targetWidth
      canvas.height = this.targetHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this.imageFile, ...this.cropRect, 0, 0, canvas.width, canvas.height)
      const dataURI = canvas.toDataURL()
      const binary = atob(dataURI.split(',')[1])
      const bytes = []
      for(let i = 0; i < binary.length; i++) bytes.push(binary.charCodeAt(i))
      const blob = new Blob([new Uint8Array(bytes)], {type: 'image/jpeg'})
      const formData = new FormData()
      formData.set('file', blob, this.imageName, { lastModified: new Date().getTime() })
      const file = formData.get('file')
      this.$emit('input', file)
      this.imageSrc = dataURI
      this.modalShown = false
    },

    dragover(event) {
      console.log('dragover')
      // if (event.dataTransfer.types.includes('Files')) {
      // this.draggingFileOver = this.$el.parentNode.contains(event.target)
      this.draggingFileOver = true
    },

    dragleave(event) {
      console.log('dragleave', event)
      this.draggingFileOver = false
    },

    drop(event) {
      console.log('drop', event.dataTransfer.files)
    },
  },
}
</script>
