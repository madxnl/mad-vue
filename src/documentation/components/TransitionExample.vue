<template>
  <div>
    <div style="min-height:200px" class="mb">
      <p>
        Toggle transitions:
        <mad-button class="primary" :active="render.fade" @click="render.fade = !render.fade">
          fade
        </mad-button>
        <mad-button class="primary" :active="render.expandY" @click="render.expandY = !render.expandY">
          expand-x
        </mad-button>
        <mad-button class="primary" :active="render.expandX" @click="render.expandX = !render.expandX">
          expand-y
        </mad-button>
        <mad-button class="primary" :active="render.slideX" @click="render.slideX = !render.slideX">
          slide-x
        </mad-button>
        <mad-button class="primary" :active="render.slideXReverse" @click="render.slideXReverse = !render.slideXReverse">
          slide-x-reverse
        </mad-button>
        <mad-button class="primary" :active="render.slideY" @click="render.slideY = !render.slideY">
          slide-y
        </mad-button>
        <mad-button class="primary" :active="render.slideYReverse" @click="render.slideYReverse = !render.slideYReverse">
          slide-y-reverse
        </mad-button>
      </p>
      <mad-transition variant="expand-x">
        <div v-if="render.expandY" class="_item">
          expand-x
        </div>
      </mad-transition>
      <mad-transition variant="expand-y">
        <div v-if="render.expandX" class="_item">
          expand-y
        </div>
      </mad-transition>
      <mad-transition variant="fade">
        <div v-if="render.fade" class="_item">
          fade
        </div>
      </mad-transition>
      <mad-transition variant="slide-x">
        <div v-if="render.slideX" class="_item">
          slide-x
        </div>
      </mad-transition>
      <mad-transition variant="slide-x-reverse">
        <div v-if="render.slideXReverse" class="_item">
          slide-x-reverse
        </div>
      </mad-transition>
      <mad-transition variant="slide-y">
        <div v-if="render.slideY" class="_item">
          slide-y
        </div>
      </mad-transition>
      <mad-transition variant="slide-y-reverse">
        <div v-if="render.slideYReverse" class="_item">
          slide-y-reverse
        </div>
      </mad-transition>
    </div>

    <div style="min-height:300px" class="mb">
      <p>
        Group transition:
        <mad-button class="primary" @click="insertItem">
          Insert
        </mad-button>
        <mad-button class="primary" @click="removeItem">
          Remove
        </mad-button>
        <mad-button class="primary" @click="shuffle">
          Shuffle
        </mad-button>
      </p>

      <mad-transition group variant="expand-y">
        <template v-for="item in list">
          <div :key="item" class="_item">
            Item {{ item }}
          </div>
        </template>
      </mad-transition>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data: () => ({
    render: {
      fade: false,
      slideX: false,
      slideXReverse: false,
      slideY: false,
      slideYReverse: false,
      expandY: false,
      expandX: false,
    },
    list: [1, 2, 3, 4, 5],
  }),

  methods: {
    shuffle() {
      this.list = _.shuffle(this.list)
    },

    insertItem() {
      const i = Math.floor(Math.random() * this.list.length)
      this.list.splice(i, 0, Math.max(0, ...this.list) + 1)
    },

    removeItem() {
      const i = Math.floor(Math.random() * this.list.length)
      this.list.splice(i, 1)
    },
  },
}
</script>

<style lang="scss">
._item {
  background: var(--primary);
  color: white;
  padding: .5em;
  margin-bottom: .5em;
  max-width: 200px;
}
</style>
