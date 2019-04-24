<template>
  <div
    :class="classes"
    class="v-spacing-xs"
    @drop.prevent="drop"
    @dragover.prevent="dragover"
    @dragleave.prevent="dragleave"
  >
    <p v-if="allowedResolutions" class="small">
      Allowed resolutions: {{ allowedResolutions.map(r => r.join('x')).join(', ') }}
    </p>

    <input
      v-show="false"
      :id="_uid"
      ref="fileinput"
      type="file"
      @change="onInput"
    >

    <div v-if="value" class="mad-input-image_preview">
      <img v-show="!previewSrc" ref="image" :src="imageSrc" @load="onImgLoad">
      <img v-if="previewSrc" ref="preview" :src="previewSrc">
      <div class="small text-center">
        {{ imageName }}
        <template v-if="previewRes"><br>{{ previewRes.join('x') }} pixels</template>
      </div>
      <!-- <p v-if="">
        Image is too big/small, click resize
      </p> -->
    </div>
    <p>
      <mad-button v-if="value" flat @click="openEditor">
        Resize image
      </mad-button>
      <mad-button flat @click="clickBrowse">
        Choose {{ value ? 'new image' : 'image' }}
      </mad-button>
    </p>

    <mad-modal v-model="modalShown">
      <p class="mad-input-image_canvasdiv">
        <canvas
          ref="canvas"
          @mousemove="canvasEvent"
          @mousedown="canvasEvent"
          @mouseup="canvasEvent"
          @mouseleave="canvasEvent"
        ></canvas>
      </p>

      <p class="row h-spacing-sm align-center">
        <span>Zoom crop area:</span>
        <input
          type="range"
          min="0"
          max="100"
          :value="cropZoom"
          @input.stop="e=>cropZoom=e.target.value"
        >
        <span>{{ cropZoomInPct }}%</span>
      </p>

      <p v-if="allowedResolutions">
        <label v-for="res in allowedResolutions" :key="res.join('x')">
          <input type="radio" name="crop-resolutions" :value="res">
          {{ res.join('x') }}
        </label>
      </p>
      <p v-else class="row h-spacing-sm align-center">
        <span>New dimensions:</span>
        <mad-input
          v-model="targetWidth"
          type="number"
          placeholder="width"
          min="0"
          max="10000"
          :disabled="allowedResolutions"
        />
        <span>x</span>
        <mad-input
          v-model="targetHeight"
          type="number"
          placeholder="height"
          min="0"
          max="10000"
          :disabled="allowedResolutions"
        />
        <span>pixels</span>
      </p>
      <br>

      <div class="row">
        <mad-button @click="modalShown=false">
          Cancel
        </mad-button>
        <div class="grow"></div>
        <mad-button color="primary" @click="applyCrop">
          Resize image
        </mad-button>
      </div>
    </mad-modal>
  </div>
</template>

<script>
// todo
// change target w/h (only if not predefined res)
// - updates cropRect to nearest fit
// reset resize
// maximum width/height

export default {
  props: {
    value: { type: [String, File], default: null },
    disabled: { type: Boolean },
    allowedResolutions: { type: Array, default: null },
  },

  data: () => ({
    imageElem: null,
    imageSrc: null,
    imageName: null,
    previewSrc: null,
    previewRes: null,
    modalShown: false,
    editedFile: null,
    originalRes: null,
    targetWidth: null,
    targetHeight: null,
    cropX: 0.5,
    cropY: 0.5,
    cropZoom: 0,
    draggingFileOver: false,
  }),

  computed: {
    classes() {
      return {
        'mad-input-image': true,
        '-draggingFile': this.draggingFileOver,
      }
    },

    cropZoomInPct() {
      return Math.max(1, Math.round(100 - this.cropZoom))
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.$refs.fileinput.value = ''
          this.imageName = null
        }
        if (typeof value === 'string') {
          this.imageSrc = value
          this.previewSrc = null
          const parts = value.split('/')
          this.imageName = parts[parts.length - 1]
        }
        if (value instanceof File) {
          this.imageName = value.name
          if (value !== this.editedFile) {
            this.previewSrc = null
            const reader = new FileReader()
            reader.onload = e => { this.imageSrc = e.target.result }
            reader.readAsDataURL(value)
          }
        }
        // if (!this.editedFile || !value) {
        //   this.editedFile = value
        // }
      },
    },
  },

  methods: {
    onInput(event) {
      const file = event.target.files[0]
      this.$emit('input', file)
    },

    onImgLoad(event) {
      if (this.value === this.editedFile) return
      const img = event.target
      this.imageElem = img
      this.originalRes = [img.naturalWidth, img.naturalHeight]
      this.previewRes = this.originalRes
    },

    clickBrowse(event) {
      const fileinput = this.$refs.fileinput
      fileinput.style.display = 'block'
      fileinput.focus()
      fileinput.click()
      fileinput.style.display = 'none'
    },

    async openEditor() {
      this.targetWidth = this.previewRes[0]
      this.targetHeight = this.previewRes[1]
      if (this.allowedResolutions) {
        this.targetWidth = this.allowedResolutions[0][0]
        this.targetHeight = this.allowedResolutions[0][1]
      }
      this.modalShown = true
      await this.$nextTick()
      this.renderLoop()
    },

    renderLoop() {
      if (!this.modalShown) return
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const scaling = this.getEditorScaling(canvas)
      const cropRect = this.getCropRect()
      const scaledRect = cropRect.map(x => x * scaling)
      canvas.height = this.originalRes[1] * scaling
      canvas.width = this.originalRes[0] * scaling
      ctx.drawImage(this.imageElem, 0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 0.5
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      ctx.drawImage(this.imageElem, ...cropRect, ...scaledRect)
      ctx.strokeStyle = 'white'
      ctx.setLineDash([10, 10])
      ctx.lineDashOffset = 0
      ctx.strokeRect(...scaledRect)
      ctx.strokeStyle = 'black'
      ctx.lineDashOffset += 10
      ctx.strokeRect(...scaledRect)
      ctx.setLineDash([])
      window.requestAnimationFrame(() => this.renderLoop())
    },

    getCropRect(canvas) {
      const ratio = this.targetWidth / this.targetHeight
      const scale = this.cropZoomInPct / 100
      const w = Math.min(this.originalRes[0], this.originalRes[1] * ratio) * scale
      const h = w / ratio
      const x = this.cropX * this.originalRes[0] - w / 2
      const y = this.cropY * this.originalRes[1] - h / 2
      return [x, y, w, h]
    },

    getEditorScaling(canvas) {
      const scaling = Math.min(
        canvas.parentNode.clientHeight / this.originalRes[1],
        canvas.parentNode.clientWidth / this.originalRes[0])
      return scaling
    },

    constrainCropRect() {
      const cropRect = this.getCropRect()
      const hw = cropRect[2] / this.originalRes[0] / 2
      const hh = cropRect[3] / this.originalRes[1] / 2
      this.cropX = Math.max(hw, Math.min(1 - hw, this.cropX))
      this.cropY = Math.max(hh, Math.min(1 - hh, this.cropY))
    },

    applyCrop() {
      const canvas = document.createElement('canvas')
      canvas.width = this.targetWidth
      canvas.height = this.targetHeight
      const ctx = canvas.getContext('2d')
      const cropRect = this.getCropRect()
      ctx.drawImage(this.imageElem, ...cropRect, 0, 0, canvas.width, canvas.height)
      const imageQuality = 0.8
      const dataURI = canvas.toDataURL('image/jpeg', imageQuality)
      const mimeType = dataURI.match(/data:(.+);/)[1]
      const binary = atob(dataURI.split(',')[1])
      const bytes = []
      for (let i = 0; i < binary.length; i++) bytes.push(binary.charCodeAt(i))
      const blob = new Blob([new Uint8Array(bytes)], { type: mimeType })
      const formData = new FormData()
      formData.set('file', blob, this.imageName, { lastModified: new Date().getTime() })
      this.editedFile = formData.get('file')
      this.$emit('input', this.editedFile)
      this.previewSrc = dataURI
      this.previewRes = [this.targetWidth, this.targetHeight]
      this.modalShown = false
    },

    restoreOriginal() {
      this.$emit('input', this.editedFile)
    },

    dragover(event) {
      this.draggingFileOver = true
    },

    dragleave(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.draggingFileOver = false
      }
    },

    drop(event) {
      const file = event.dataTransfer.files[0]
      if (file) {
        this.$emit('input', file)
      }
      this.draggingFileOver = false
    },

    canvasEvent(event) {
      const canvas = event.target
      const bounds = canvas.getBoundingClientRect()
      const mouseX = (event.clientX - bounds.left)
      const mouseY = (event.clientY - bounds.top)
      const scaling = this.getEditorScaling(canvas)
      const cropRect = this.getCropRect()
      const scaledRect = cropRect.map(x => x * scaling)
      const isOverCropArea =
        mouseX >= scaledRect[0] && mouseX < scaledRect[0] + scaledRect[2] &&
        mouseY >= scaledRect[1] && mouseY < scaledRect[1] + scaledRect[3]
      if (event.type === 'mousemove') {
        canvas.style.cursor = isOverCropArea ? 'grab' : 'crosshair'
        if (this.dragginCropArea) {
          this.cropX += event.movementX / canvas.width
          this.cropY += event.movementY / canvas.height
        }
      } else if (event.type === 'mousedown') {
        if (!isOverCropArea) {
          this.cropX = mouseX / canvas.width
          this.cropY = mouseY / canvas.height
        }
        this.dragginCropArea = true
        const onMouseup = e => {
          this.dragginCropArea = false
          e.preventDefault()
          e.stopPropagation()
          window.removeEventListener('mouseup', onMouseup, { capture: true })
        }
        window.addEventListener('mouseup', onMouseup)
      }
      this.constrainCropRect()
    },
  },
}
</script>

<style lang="scss">
@import '../scss/vars';

.mad-input-image {
  &.-draggingFile {
    background: red;
  }
}
.mad-input-image_preview {
  display: inline-block;
  img {
    max-width: 100%;
    max-height: 300px;
    height: auto;
    width: auto;
    pointer-events: none;
  }
}
.mad-input-image_canvasdiv {
  width: 100%;
  height: 400px;
}
</style>
