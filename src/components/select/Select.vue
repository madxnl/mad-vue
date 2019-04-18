<template>
  <div
    class="mad-select"
    :class="classes"
  >
    <mad-dropdown v-model="dropdownActive">
      <div class="mad-input">
        <div class="mad-select_content">
          <template v-if="multiple">
            <button
              v-for="(v,i) in selectedValues"
              :key="i"
              class="select_multi-item"
              title="Click to remove from selection"
              @click.stop="toggleValue(v)"
            >
              <slot v-if="valueHasOption(v)" :option="getValueOption(v)">{{ getOptionLabel(getValueOption(v)) }}</slot>
              <template v-else>{{ [v] }}</template>
              <mad-icon mdi="close" />
            </button>
          </template>
          <template v-else>
            <div v-for="(v,i) in selectedValues" v-show="displaySelected" :key="i" class="select_item">
              <slot v-if="valueHasOption(v)" :option="getValueOption(v)">{{ getOptionLabel(getValueOption(v)) }}</slot>
              <template v-else>{{ [v] }}</template>
            </div>
          </template>

          <input
            class="mad-select_input"
            :value="searchText"
            :placeholder="currentPlaceholder"
            :disabled="disabled"
            v-bind="$attrs"
            v-on="inputListeners"
          >
        </div>

        <mad-icon mdi="chevron-down" class="size-lg" />
      </div>

      <div slot="dropdown">
        <div v-if="searching" class="mad-menu-item">
          <em>Searching&hellip;</em>
        </div>
        <template v-else>
          <div v-if="!filteredOptions.length" class="mad-menu-item">
            <template v-if="searchText">
              <em>No results for "{{ searchText }}"</em>
            </template>
            <template v-else-if="typeof options == 'function'">
              <em>Type to search</em>
            </template>
            <template v-else>
              <em>No options available</em>
            </template>
          </div>
          <div
            v-for="(option,i) in filteredOptions"
            :key="i"
            class="mad-menu-item"
            :class="{
              active: valueIsSelected(getOptionValue(option)),
              hover: highlight==i,
            }"
            @mousedown="toggleValue(getOptionValue(option))"
          >
            <slot :option="option">
              {{ getOptionLabel(option) }}
            </slot>
          </div>
        </template>
      </div>
    </mad-dropdown>
  </div>
</template>

<script>
import { isEqual } from 'lodash'

export default {
  props: {
    options: { type: [Array, Function], required: true },
    value: { default: null },
    placeholder: { type: String, default: 'Please select' },
    disabled: Boolean,
    multiple: Boolean,
    optionLabel: { type: Function, default: null },
    optionValue: { type: Function, default: null },
    valuesEqual: { type: Function, default: isEqual },
    pk: { default: null, validator: () => console.warn('Select prop "pk" deprecated, use "value-key" instead') },
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
        '--disabled': this.disabled,
        multiple: this.multiple,
      }
    },

    hasNullOption() {
      return this.cachedOptions.some(o => this.getOptionValue(o) == null)
    },

    isEmpty() {
      if (this.multiple) {
        return this.selectedValues.length === 0
      } else {
        return this.selectedValues[0] == null && !this.hasNullOption
      }
    },

    filteredOptions() {
      const options = this.currentOptions
      if (!this.searchText || typeof this.options === 'function') return options

      const tokenize = s => s.toLowerCase().match(/(\w+|[^\w\s]+)/g)
      const terms = tokenize(this.searchText)
      return options.filter((option, i) => {
        const optionWords = tokenize(this.getOptionLabel(option))
        return terms.every(term => optionWords.some(word => word.startsWith(term)))
      })
    },

    currentPlaceholder() {
      if (this.isEmpty) return this.placeholder
      return ''
    },

    displaySelected() {
      return this.multiple || (!this.isEmpty && !this.searchText)
    },

    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
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
        if (typeof options === 'function') return
        this.currentOptions = options
      },
    },

    currentOptions: {
      immediate: true,
      handler(currentOptions) {
        this.cachedOptions = currentOptions.concat(this.cachedOptions.filter(a => {
          const value = this.getOptionValue(a)
          return !currentOptions.some(b => this.valuesEqual(this.getOptionValue(b), value))
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
        if (event.keyCode === 27) { // escape
          this.dropdownActive = false
          event.stopPropagation()
        } else if (event.keyCode === 38) { // up
          this.highlight = (this.highlight + this.filteredOptions.length - 1) % this.filteredOptions.length
        } else if (event.keyCode === 40) { // down
          this.highlight = (this.highlight + 1) % this.filteredOptions.length
        } else if (event.keyCode === 13) { // enter
          if (this.highlight !== -1) {
            const value = this.getOptionValue(this.filteredOptions[this.highlight])
            if (value !== undefined) {
              this.toggleValue(value)
              event.preventDefault()
            }
          }
        }
      }
    },

    onInput(event) {
      this.searchText = event.target.value
      this.dropdownActive = true
      this.highlight = 0
      this.updateOptions(400)
    },

    onFocus(event) {
      this.dropdownActive = true
      this.updateOptions(0)
    },

    onBlur(event) {
      this.dropdownActive = false
      if (this.highlight !== -1) {
        const value = this.getOptionValue(this.filteredOptions[this.highlight])
        if (value !== undefined && this.isEmpty) {
          this.toggleValue(value)
        }
        this.highlight = -1
      }
    },

    valueHasOption(value) {
      return this.cachedOptions.some(o => this.valuesEqual(this.getOptionValue(o), value))
    },

    getValueOption(value) {
      return this.cachedOptions.find(o => this.valuesEqual(this.getOptionValue(o), value))
    },

    getOptionLabel(option) {
      if (typeof this.optionLabel === 'function') return this.optionLabel(option)
      if (option != null && option.label !== undefined) return option.label
      return JSON.stringify(option)
    },

    getOptionValue(option) {
      if (typeof this.optionValue === 'function') return this.optionValue(option)
      if (option != null && option.value !== undefined) return option.value
      return option
    },

    valueIsSelected(value) {
      return this.selectedValues.some(v => this.valuesEqual(value, v))
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
      if (typeof this.options === 'function') {
        this.searching = true
        clearTimeout(this._searchTimeout)
        this._searchTimeout = setTimeout(async() => {
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
