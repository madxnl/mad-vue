<template>
  <div :class="classes"
    @drop.prevent="drop"
    @dragover.prevent="dragover"
    @dragleave.prevent="dragleave">

    <input type="file"
      v-show="false"
      ref="fileinput"
      :id="_uid"
      @change="onInput">
    
    <div v-if="value" class="mad-input-image_preview">
      <img ref="image" :src="imageSrc" @load="onImgLoad" v-show="!previewSrc">
      <img v-if="previewSrc" ref="preview" :src="previewSrc">
      <p>
        {{imageName}}
        <template v-if="previewRes">&nbsp; {{previewRes.join('x')}}</template>
      </p>
      <p v-if="resolutions">
        Allowed resolutions: {{resolutions.map(r => r.join('x')).join(', ')}}
      </p>
      <!-- <p v-if="">
        Image is too big/small, click resize
      </p> -->
    </div>
    <p>
      <br>
      <mad-button @click="clickBrowse">
        Choose
      </mad-button>
      <mad-button @click="openEditor">
        Resize
      </mad-button>
    </p>

    <mad-modal v-model="modalShown">
      
      <p class="mad-input-image_canvasdiv">
        <canvas ref="canvas"
          @mousemove="canvasEvent"
          @mousedown="canvasEvent"
          @mouseup="canvasEvent"
          @mouseleave="canvasEvent"></canvas>
      </p>

      <p>
        Zoom:
        <input type="range" min="1" max="100"
          :value="cropZoom*100" @input.stop="e=>cropZoom=e.target.value/100">
        {{Math.round(cropZoom*100)}}%
      </p>

      <p v-if="resolutions && resolutions.length > 1">
        <label v-for="res in resolutions" :key="res.join('x')">
          <input type="radio" name="crop-resolutions" :value="res">
          {{res.join('x')}}
        </label>
      </p>
      <p v-else class="row h-spacing-sm align-center">
        <span>Resize to:</span>
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
// reset resize
// maximum width/height

export default {
  props: {
    value: [String, File],
    disabled: Boolean,
    resolutions: Array,
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
    cropZoom: 1,
    draggingFileOver: false,
  }),

  computed: {
    classes() {
      return {
        'mad-input-image': true,
        '-draggingFile': this.draggingFileOver,
      }
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
        if (typeof value == 'string') {
          this.imageSrc = value
          this.previewSrc = null
          const parts = value.split('/')
          this.imageName = parts[parts.length - 1]
        }
        if (value instanceof File) {
          this.imageName = value.name
          if (value != this.editedFile) {
            this.previewSrc = null
            const reader = new FileReader()
            reader.onload = e => this.imageSrc = e.target.result
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
      if (this.value == this.editedFile) return
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
      if (this.resolutions) {
        const res = this.resolutions[0]
        this.targetWidth = res[0]
        this.targetHeight = res[1]
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
      const w = this.cropZoom * Math.min(this.originalRes[0], this.originalRes[1] * ratio)
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
      const dataURI = canvas.toDataURL()
      const binary = atob(dataURI.split(',')[1])
      const bytes = []
      for(let i = 0; i < binary.length; i++) bytes.push(binary.charCodeAt(i))
      const blob = new Blob([new Uint8Array(bytes)], {type: 'image/jpeg'})
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
      if (event.type == 'mousemove') {
        canvas.style.cursor = isOverCropArea ? 'grab' : 'crosshair'
        if (this.dragginCropArea) {
          this.cropX += event.movementX / canvas.width
          this.cropY += event.movementY / canvas.height
        }
      } else if (event.type == 'mousedown') {
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
