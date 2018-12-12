<template>
  <mad-dropdown v-model="dropdownActive" class="mad-select"
    :class="classes">

      <mad-input class="mad-select_input"
        :value="searchText"
        :placeholder="placeholder"
        @focus="onFocus" @blur="onBlur"
        @keydown="onKeydown" @input="onInput">

        <div class="mad-select_grid" v-if="displaySelected">
          <template v-if="multiple">
            <mad-button v-for="(value,i) in selectedValues" :key="i"
              class="small" color="primary"
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

    <mad-menu slot="dropdown">
      <mad-menu-item v-if="searching">
        <em>Searching...</em>
      </mad-menu-item>
      <mad-menu-item v-else-if="filteredOptions.length == 0">
        <template v-if="!search && options.length == 0">
          <em>No options available</em>
        </template>
        <template v-else-if="searchText">
          <em>No results for "{{searchText}}"</em>
        </template>
        <template v-else>
          <em>Type to search</em>
        </template>
      </mad-menu-item>

      <mad-menu-item v-for="(option,i) in filteredOptions" :key="i"
        @click="toggleValue(getValue(option))"
        :active="valueIsSelected(getValue(option))"
        :hover="highlight==i">
        <slot :option="option">{{getLabel(option)}}</slot>
      </mad-menu-item>

    </mad-menu>
  </mad-dropdown>
</template>

<script>
const slugify = require('slugify')

export default {
  props: {
    options: { type: Array, required: true },
    value: {},
    placeholder: { type: String, default: 'Please select' },
    // clearable: Boolean,
    disabled: Boolean,
    search: Function,
    multiple: Boolean,
    pk: String,
  },

  data: () => ({
    selectedValues: [],
    cachedOptions: [],
    searchText: '',
    dropdownActive: false,
    searching: false,
    highlight: -1,
    hasFocus: false,
  }),

  computed: {
    classes() {
      return {
        // '--dropdown-active': this.dropdownActive,
        '--input-hide': !this.searchText && !this.isEmpty,
        '--disabled': this.disabled,
        // '--has-focus': this.hasFocus,
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
      if (this.search) {
        if (this.searching || !this.searchText) return []
        return this.options
      }
      const tokenize = s => slugify(s.replace('/',' ')).toLowerCase()
      const terms = tokenize(this.searchText).split('-')
      return this.options.filter((option, i) => {
        const optionText = option && option.label ?
          `${option.value} ${option.label}` : JSON.stringify(option)
        const words = tokenize(optionText)
        return terms.every(term => words.includes(term))
      })
    },

    displaySelected() {
      return this.multiple || (!this.isEmpty && !this.searchText)
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
      handler(options) {
        this.cachedOptions = options.concat(this.cachedOptions.filter(a => {
          const value = this.getValue(a)
          return !options.some(b => this.valuesEqual(this.getValue(b), value))
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
    getOption(value) {
      return this.cachedOptions.find(o => this.valuesEqual(this.getValue(o), value)) || value
    },

    getLabel(option) {
      if (option && option.label) return option.label
      if (option != null) return option
      return 'null'
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
      this.searchText = ''
    },
    
    onInput(text) {
      this.highlight = 0
      this.searchText = text
      this.dropdownActive = true
      this.updateOptions(400)
    },

    onFocus(event) {
      this.hasFocus = true
      this.updateOptions(0)
    },

    onBlur(event) {
      this.hasFocus = false
    },

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

    updateOptions(debounceMs) {
      if (this.search) {
        this.searching = true
        clearTimeout(this._searchTimeout)
        this._searchTimeout = setTimeout(async () => {
          try {
            await this.search(this.searchText)
          } finally {
            this.searching = false
          }
        }, debounceMs)
      }
    },
  },
}
</script>
