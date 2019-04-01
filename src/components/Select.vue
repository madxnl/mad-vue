<template>
  <mad-dropdown v-model="dropdownActive" class="mad-select"
    :class="classes">

    <mad-input class="mad-select_input"
      :value="searchText"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs" v-on="inputListeners">

      <div class="mad-select_grid" v-if="displaySelected">
        <template v-if="multiple">
          <mad-button v-for="(value,i) in selectedValues" :key="i"
            bg="primary-light" color="primary" size="sm"
            title="Click to remove from selection"
            @click.stop="toggleValue(value)">
            <div class="select_multi-item">
              <div>
                <slot v-if="getOption(value)" :option="getOption(value)">
                  {{getLabel(getOption(value))}}
                </slot>
                <template v-else>{{value}}</template>
              </div>
              <mad-icon mdi="close"></mad-icon>
            </div>
          </mad-button>
        </template>
        <template v-else>
          <div v-for="(value,i) in selectedValues" :key="i">
            <slot :option="getOption(value)">
              {{getLabel(getOption(value))}}
            </slot>
          </div>
        </template>
      </div>

      <mad-icon mdi="chevron-down" slot="right"/>
    </mad-input>

    <div slot="dropdown">
      <div class="mad-menu-item" v-if="searching">
        <em>Searching&hellip;</em>
      </div>
      <template v-else>
        <div class="mad-menu-item" v-if="!filteredOptions.length">
          <template v-if="searchText">
            <em>No results for "{{searchText}}"</em>
          </template>
          <template v-else-if="typeof options == 'function'">
            <em>Type to search</em>
          </template>
          <template v-else>
            <em>No options available</em>
          </template>
        </div>
        <div v-for="(option,i) in filteredOptions" :key="i"
          @click="toggleValue(getValue(option))"
           class="mad-menu-item"
           :class="{
             active: valueIsSelected(getValue(option)),
             hover: highlight==i,
          }" >
          <slot :option="option">{{getLabel(option)}}</slot>
        </div>
      </template>
    </div>

  </mad-dropdown>
</template>

<script>
export default {
  props: {
    options: { type: [Array, Function], required: true },
    value: {},
    placeholder: { type: String, default: 'Please select' },
    disabled: Boolean,
    multiple: Boolean,
    pk: String,
  },

  data: () => ({
    selectedValues: [],
    currentOptions: [],
    cachedOptions: [],
    searchText: '',
    dropdownActive: false,
    searching: false,
    highlight: -1,
  }),

  computed: {
    classes() {
      return {
        // '--dropdown-active': this.dropdownActive,
        '--input-hide': !this.searchText && !this.isEmpty,
        '--disabled': this.disabled,
      }
    },

    isEmpty() {
      if (this.multiple) {
        return this.selectedValues.length == 0
      } else {
        const hasNullOption = this.cachedOptions.some(o => this.getValue(o) == null)
        return this.selectedValues[0] == null && !hasNullOption
      }
    },

    filteredOptions() {
      const options = this.currentOptions
      if (!this.searchText || typeof this.options == 'function') return options

      const tokenize = s => s.toLowerCase().match(/(\w+|[^\w\s]+)/g)
      const terms = tokenize(this.searchText)
      return options.filter((option, i) => {
        const optionWords = tokenize(this.getLabel(option))
        return terms.every(term => optionWords.some(word => word.startsWith(term)))
      })
    },

    displaySelected() {
      return this.multiple || (!this.isEmpty && !this.searchText)
    },

    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        // blur: event => {
          // if (this.searchText) {
          //   const value = this.getValue(this.filteredOptions[this.highlight])
          //   if (value && !this.valueIsSelected(value)) this.toggleValue(value)
          // }
          // this.dropdownActive = false
        // },
        keydown: this.onKeydown,
      }
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.selectedValues = [].concat(value)
      },
    },

    options: {
      immediate: true,
      async handler(options) {
        if (typeof options == 'function') return
        this.currentOptions = options
      },
    },

    currentOptions: {
      immediate: true,
      handler(currentOptions) {
        this.cachedOptions = currentOptions.concat(this.cachedOptions.filter(a => {
          const value = this.getValue(a)
          return !currentOptions.some(b => this.valuesEqual(this.getValue(b), value))
        }))
      },
    },

    dropdownActive(dropdownActive) {
      if (dropdownActive && this.disabled) {
        this.dropdownActive = false
        return
      }
      if (!dropdownActive) {
        this.searchText = ''
      } else {
        const input = this.$el.getElementsByTagName('input')[0]
        input[dropdownActive ? 'focus' : 'blur']()
      }
    },
  },

  methods: {
    onKeydown(event) {
      if (this.dropdownActive) {
        if (event.keyCode == 27) { // escape
          this.dropdownActive = false
          event.stopPropagation()
        } else if (event.keyCode == 38) { // up
          this.highlight = (this.highlight + this.filteredOptions.length - 1) % this.filteredOptions.length
        } else if (event.keyCode == 40) { // down
          this.highlight = (this.highlight + 1) % this.filteredOptions.length
        } else if (event.keyCode == 13) { // enter
          const highlighted = this.filteredOptions[this.highlight]
          if (highlighted) this.toggleValue(this.getValue(highlighted))
          event.preventDefault()
        }
      }
    },

    onInput(text) {
      this.searchText = text
      this.dropdownActive = true
      this.highlight = 0
      this.updateOptions(400)
    },

    onFocus(event) {
      this.updateOptions(0)
    },

    getOption(value) {
      return this.cachedOptions.find(o => this.valuesEqual(this.getValue(o), value)) || value
    },

    getLabel(option) {
      if (option == null) return 'null'
      if (option && option.label) return option.label
      if (option && option.toString) return option.toString()
      return ''
      // console.warn
    },

    valueIsSelected(value) {
      return this.selectedValues.some(v => this.valuesEqual(value, v))
    },

    getValue(option) {
      return option && option.value !== undefined ? option.value : option
    },

    valuesEqual(a, b) {
      if (this.pk && a && b && a[this.pk] == b[this.pk]) return true
      return a == b || JSON.stringify(a) == JSON.stringify(b)
    },

    toggleValue(value) {
      if (this.multiple) {
        if (this.valueIsSelected(value)) {
          this.selectedValues = this.selectedValues.filter(v => !this.valuesEqual(v, value))
        } else {
          this.selectedValues = [...this.selectedValues, value]
        }
        this.$emit('input', this.selectedValues.slice())
      } else {
        this.selectedValues = [value]
        this.$emit('input', value)
      }
      this.dropdownActive = false
    },

    updateOptions(debounceMs) {
      if (typeof this.options == 'function') {
        this.searching = true
        clearTimeout(this._searchTimeout)
        this._searchTimeout = setTimeout(async () => {
          try {
            this.currentOptions = await this.options(this.searchText)
          } finally {
            this.searching = false
          }
        }, debounceMs)
      }
    },

  },
}

</script>
