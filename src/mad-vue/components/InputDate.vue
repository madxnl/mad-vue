<template>
  <mad-dropdown class="mad-input-date">

    <mad-input class="mad-input-date__field"
      :value="localeDateString"
      v-bind="$attrs" v-on="listeners">
      <mad-icon mdi="chevron-down" slot="right" />
    </mad-input>
    
    <div slot="dropdown" class="mad-input-date__columns">
      <div>
        <div class="mad-input-date__row">
          <mad-button @click.stop="addMonths(-1)" flat size="sm">
            <mad-icon mdi="chevron-left" />
          </mad-button>
          <div class="grow text-center">
            {{calMonthDisplay}}
          </div>
          <mad-button @click.stop="addMonths(1)" flat size="sm">
            <mad-icon mdi="chevron-right" />
          </mad-button>
        </div>
        <div class="mad-input-date__grid">
          <p v-for="(day,i) in monthDays.slice(0, 7)" :key="'weekday'+i" class="muted">
            {{new Date(day).toLocaleString('en', { weekday: 'short' }).slice(0, 2)}}
          </p>
          <mad-button v-for="(day,i) in monthDays" :key="'date'+i" @click="selectDate(day)"
            :flat="!isCurrentDay(day)"
            :color="isCurrentDay(day) ? 'primary' : isCurrentMonth(day) ? null : 'muted'">
            {{day.getDate()}}
          </mad-button>
        </div>
      </div>

      <div v-if="time" class="mad-input-date__time">
        <div class="column spacing-sm">
          <mad-button @click.stop="addHours(1)" flat size="sm">
            <mad-icon mdi="chevron-up" />
          </mad-button>
          <div>
            {{localeTimeString.split(':')[0]}}
          </div>
          <mad-button @click.stop="addHours(-1)" flat size="sm">
            <mad-icon mdi="chevron-down" />
          </mad-button>
        </div>
        <div>:</div>
        <div class="column spacing-sm">
          <mad-button @click.stop="addMinutes(1)" flat size="sm">
            <mad-icon mdi="chevron-up" />
          </mad-button>
          <div>
            {{localeTimeString.split(':')[1]}}
          </div>
          <mad-button @click.stop="addMinutes(-1)" flat size="sm">
            <mad-icon mdi="chevron-down" />
          </mad-button>
        </div>
        <template v-if="seconds">
          <div>:</div>
          <div class="column spacing-sm">
            <mad-button @click.stop="addSeconds(1)" flat size="sm">
              <mad-icon mdi="chevron-up" />
            </mad-button>
            <div>
              {{localeTimeString.split(':')[2].split(' ')[0]}}
            </div>
            <mad-button @click.stop="addSeconds(-1)" flat size="sm">
              <mad-icon mdi="chevron-down" />
            </mad-button>
          </div>
        </template>
        <div v-if="localeTimeString.includes(' ')">
          {{localeTimeString.split(' ')[1]}}
        </div>
      </div>
    </div>
  </mad-dropdown>
</template>

<script>
import * as dateFns from 'date-fns'

export default {
  props: {
    value: [String, Number, Date],

    time: Boolean,
    seconds: Boolean,
    disabled: Boolean,
    stepMinutes: { type: Number, default: 15 },
    stepSeconds: { type: Number, default: 10 },
    // min: String,
  },

  data: () => ({
    active: true,
    currentMonth: new Date(),
  }),

  computed: {
    listeners() {
      // let prevValue = null
      return {
        ...this.$listeners,
        input: e => {
        //   if (!e.data) {
        //   } else if (e.data.match(/^\w+$/)) {
        //     // const date = dateFns.parse(e.target.value)
        //     // if (isNaN(date)) {
        //     //   e.target.value = prevValue || this.localeDateString
        //     // } else {
        //     //   // this.selectDate(date)
        //     // }
        //     // this.updateInputSelection()
        //   } else {
        //     const date = dateFns.parse(e.target.value)
        //     if (isNaN(date)) {
        //       const start = e.target.selectionStart
        //       e.target.value = this.localeDateString
        //       e.target.setSelectionRange(start, start)
        //     } else {
        //       // this.selectDate(date)
        //       const start = e.target.selectionStart
        //       this.selectDate(date)
        //       this.$nextTick().then(() => {
        //         e.target.setSelectionRange(start, start)
        //         this.updateInputSelection(e.target)
        //       })
        //     }
        //     // e.target.value = this.localeDateString
        //     // this.updateInputSelection(e.target)
        //   }
        //   prevValue = e.target.value
        },
        blur: e => {
          const date = dateFns.parse(e.target.value)
          this.selectDate(date)
        },
        // focus: e => {
        //   this.$nextTick().then(() => {
        //     this.updateInputSelection(e.target)
        //   })
        // },
        keyup: e => {
          if (e.keyCode == 37) {// left
          } else if (e.keyCode == 39) {//right
          }
        },
        // click: e => {
        //   this.updateInputSelection(e.target)
        // },
      }
    },
    
    parsedValue() {
      return dateFns.parse(this.value)
    },
    
    localeDateString() {
      return this.parsedValue.toLocaleDateString(navigator.language, {
        hour: this.time ? 'numeric' : undefined,
        minute: this.time ? 'numeric' : undefined,
        second: this.seconds ? 'numeric' : undefined,
      })
    },
    
    localeTimeString() {
      if (isNaN(this.parsedValue)) return '00:00:00'
      return this.parsedValue.toLocaleTimeString(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    },

    calMonthDisplay() {
      return dateFns.format(this.currentMonth, 'MMMM YYYY')
    },

    monthDays() {
      const firstDay = dateFns.startOfWeek(dateFns.startOfMonth(this.currentMonth))
      return [...Array(6*7).keys()].map(i => dateFns.addDays(firstDay, i))
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!isNaN(value)) this.currentMonth = this.parsedValue
      },
    },
  },

  methods: {
    updateInputSelection(input) {
      // const parts = e.target.value.split(/([\/: ,]+)/)
      // e.target.setSelectionRange(
      const closest = { i: 0, dist: 999 }
      for (let i = 0; i < input.value.length; i++) {
        const dist = Math.abs(input.selectionStart - 1 - i)
        if (!input.value[i].match(/\w/) || dist > closest.dist) continue
        Object.assign(closest, { i, dist })
      }
      let end = closest.i
      let start = closest.i
      while (input.value[end + 1] && input.value[end + 1].match(/\w/)) end++
      while (input.value[start - 1] && input.value[start - 1].match(/\w/)) start--
      input.setSelectionRange(start, end + 1)
      // e.preventDefault()
      // this.$nextTick().then(() => e.target.setSelectionRange(10, 10))
      // console.log(start, end)
      
    },

    selectDate(date) {
      this.$emit('input', date)
    },

    addMonths(delta) {
      this.currentMonth = dateFns.addMonths(this.currentMonth, delta)
    },

    addHours(delta) {
      this.selectDate(dateFns.addHours(this.value, delta))
    },

    addMinutes(delta) {
      const mod = dateFns.getMinutes(this.value) % this.stepMinutes
      if (mod && delta < 0) delta += 1
      this.selectDate(dateFns.addMinutes(this.value, delta * this.stepMinutes - mod))
    },

    addSeconds(delta) {
      const mod = dateFns.getSeconds(this.value) % this.stepSeconds
      if (mod && delta < 0) delta += 1
      this.selectDate(dateFns.addSeconds(this.value, delta * this.stepSeconds - mod))
    },

    isCurrentDay(date) {
      return dateFns.isSameDay(this.parsedValue, date)
    },

    isCurrentMonth(date) {
      return dateFns.isSameMonth(this.currentMonth, date)
    },
  },
}
</script>
