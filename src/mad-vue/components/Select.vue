<template>
  <mad-dropdown v-model="dropdownActive" class="mad-select"
    :class="classes">


    <!-- <div class="mad-select__field"> -->

      <!-- @click.stop="()=>{}" @mousedown="onClickInside" @touchstart="onClickInside" -->
    <!-- <div class="mad-select__field form-field" -->

      <mad-input class="mad-select__input"
        :value="searchText"
        :placeholder="!selectedValues.length && placeholder"
        @focus="onFocus" @blur="onBlur"
        @keydown="onKeydown" @input="onInput">

        <div class="mad-select__grid">
          <mad-button v-if="multiple" v-for="(value,i) in selectedValues" :key="i"
            bg="lightprimary" color="primary"
            class="size-sm select__multi-item"
            title="Click to remove from selection"
            @click.stop="toggleSelectValue(value)">
            <div v-html="getValueHtml(value)"></div>
            <mad-icon mdi="close"></mad-icon>
          </mad-button>
          <div v-else v-html="getValueHtml(selectedValues[0])"></div>
        </div>
        <!-- <span v-if="!selectedValues.length" class="faded">{{placeholder}}</span> -->

        <mad-icon mdi="chevron-down" slot="right"/>
      </mad-input>

      <!-- <div class="mad-select__current"></div> -->

    <!-- </div> -->
      <!-- <i v-if="selectedValues && clearable" @click="clearSelection" class="mdi mdi-close"></i> -->
      <!-- <input type="text" :value="value" v-bind="$attrs" class="_validator"> -->
    <!-- </div> -->

    <!-- render all options but hide them, so we can duplicate and display the option in multiple places as needed -->
    <div style="visibility:hidden;position:absolute">
      <slot></slot>
    </div>

    <mad-menu slot="dropdown">
      <mad-menu-item v-if="searching">
        <em>Searching...</em>
      </mad-menu-item>
      <mad-menu-item v-else-if="filteredOptions.length == 0">
        <template v-if="!search && optionComponents.length == 0">
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
        @click="toggleSelectValue(option.value)"
        :active="selectedValues.some(v => JSON.stringify(v) == JSON.stringify(option.value))"
        :hover="highlight==i"
        v-html="option.$el.outerHTML">
      </mad-menu-item>

    </mad-menu>
  </mad-dropdown>
</template>

<script>
const slugify = require('slugify')

export default {
  props: {
    value: {},
    placeholder: { type: String, default: 'Please select' },
    // clearable: Boolean,
    disabled: Boolean,
    search: Function,
    multiple: Boolean,
  },

  data: () => ({
    selectedValues: [],
    optionElementClone: {},
    searchText: '',
    dropdownActive: false,
    searching: false,
    highlight: -1,
    optionComponents: [], // registered from option component
    hasFocus: false,
  }),

  computed: {
    classes() {
      return {
        '--dropdown-active': this.dropdownActive,
        '--search-active': !!this.searchText,
        '--disabled': this.disabled,
        '--has-focus': this.hasFocus,
      }
    },
    
    filteredOptions() {
      if (this.search) {
        if (this.searching || !this.searchText) return []
        return this.optionComponents
      }
      const tokenize = s => slugify(s.replace('/',' ')).toLowerCase()
      const terms = tokenize(this.searchText).split('-')
      return this.optionComponents.filter((option, i) => {
        const text = tokenize(option.$el.textContent)
        return terms.every(term => text.includes(term))
      })
      // const words = slugify(this.searchText).toLowerCase().split('-')
      // return this.optionComponents.filter((option, i) => {
      //   const searchText = '-' + slugify(option.$el.textContent).toLowerCase()
      //   return words.every(word => searchText.includes('-' + word))
      // })
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.selectedValues = value == null ? [] : [].concat(value)
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
      // await this.$nextTick()
      // this.searchText = ''
    },
  },

  methods: {
    toggleSelectValue(value) {
      if (this.multiple) {
        const withoutValue = this.selectedValues.filter(v => {
          return this.getValueKey(v) != this.getValueKey(value)
        })
        if (withoutValue.length < this.selectedValues.length) {
          this.selectedValues = withoutValue
        } else {
          this.selectedValues.push(value)
        }
        this.$emit('input', this.selectedValues.slice(0))
      } else {
        this.selectedValues = [value]
        this.$emit('input', value)
      }

      this.dropdownActive = false
      this.searchText = ''
    },
    
    clearSelection() {
      this.value = null
    },

    onInput(event) {
      this.highlight = 0
      this.searchText = event.target.value
      this.dropdownActive = true
      this.updateOptions(400)
    },

    onFocus(event) {
      // this.dropdownActive = true
      this.hasFocus = true
      this.updateOptions(0)
    },

    onBlur(event) {
      this.hasFocus = false
      // await this.$nextTick()
      // this.searchText = ''
      // if (event.relatedTarget) {
        // this.dropdownActive = false
      // }
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
          if (highlighted) this.toggleSelectValue(highlighted.value)
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

    registerOptionComponent(optionComponent) {
      this.optionComponents.push(optionComponent)
      const key = this.getValueKey(optionComponent.value)
      this.optionElementClone[key] = optionComponent.$el.cloneNode(true)
    },

    unregisterOptionComponent(optionComponent) {
      this.optionComponents = this.optionComponents.filter(o => o != optionComponent)
    },

    getValueHtml(value) {
      const option = this.optionComponents.find(o => this.getValueKey(o.value) == this.getValueKey(value))
      if (option) return option.$el.outerHTML

      const key = this.getValueKey(value)
      const element = this.optionElementClone[key]
      if (!element) {
        try {
          return JSON.stringify(value)
        } catch (e) {
          return value == null ? 'null' : value.toString()
        }
      }
      return element.outerHTML
    },

    getValueKey(value) {
      if (typeof value == 'string') return value
      return JSON.stringify(value)
    },
  },
}
</script>
