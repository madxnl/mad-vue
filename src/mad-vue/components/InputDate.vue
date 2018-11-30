<template>
  <mad-dropdown class="mad-input-date">

    <mad-input class="mad-input-date_field"
      :value="inputText || displayFormat(value)"
      v-bind="$attrs" v-on="listeners">
      <mad-icon mdi="chevron-down" slot="right" />
    </mad-input>
    
    <div slot="dropdown" class="mad-input-date_columns">
      <div>
        <div class="mad-input-date_row">
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
        <div class="mad-input-date_grid">
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

      <div v-if="time" class="mad-input-date_time">
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
    stepMinutes: { type: Number, default: 15 },
    stepSeconds: { type: Number, default: 10 },
    // min: String,
  },

  data: () => ({
    currentMonth: new Date(),
    inputText: null,
  }),

  computed: {
    listeners() {
      // let prevValue = null
      return {
        ...this.$listeners,
        input: e => {
          this.inputText = e
          const date = dateFns.parse(e)
          if (!isNaN(date)) {
            this.selectDate(date)
          }
        },
        blur: e => {
          // const date = dateFns.parse(e.target.value)
          // this.selectDate(date)
          this.inputText = null
          // setTimeout(() => {
          //   this.$emit('input', new Date())
          // }, 500)
          // this.$nextTick().then(() => this.selectDate(date))
        },
        focus: e => {
          this.$nextTick().then(() => e.target.select())
        },
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
    
    localeTimeString() {
      const date = dateFns.parse(this.value)
      if (isNaN(date)) return '00:00:00'
      return date.toLocaleTimeString(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    },

    calMonthDisplay() {
      return dateFns.format(this.currentMonth, 'MMMM YYYY')
    },

    monthDays() {
      const firstOfMonth = dateFns.setDate(this.currentMonth, 1)
      const firstDay = dateFns.setDay(firstOfMonth, 1)
      return [...Array(6*7).keys()].map(i => dateFns.addDays(firstDay, i))
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        const date = dateFns.parse(value)
        if (!isNaN(date)) this.currentMonth = date
      },
    },
  },

  methods: {
    selectDate(date) {
      // if (isNaN(date)) date = 'Invalid date!'
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
      return dateFns.isSameDay(this.value, date)
    },

    isCurrentMonth(date) {
      return dateFns.isSameMonth(this.currentMonth, date)
    },
    
    displayFormat(value) {
      const date = dateFns.parse(value)
      return date.toLocaleDateString(navigator.language, {
        hour: this.time ? 'numeric' : undefined,
        minute: this.time ? 'numeric' : undefined,
        second: this.seconds ? 'numeric' : undefined,
      })
    },
  },
}
</script>
