<template>
  <table class="mad-datatable">
    <tr>
      <th v-if="value">
        <input type="checkbox" :checked="value.length == items.length"
          @click="selectAll">
      </th>
      <th v-for="(col,i) in validColumns" :key="i"
        :class="columnClasses(col)"
        @click="toggleSort(i)">
        {{col.text}}
        <mad-icon v-if="col.sort" :mdi="sortDir > 0 ? 'chevron-down' : 'chevron-up'"
          :style="sortCol == i ? '' : 'visibility:hidden'"/>
      </th>
    </tr>
    <tr v-for="(item,i) in sortedItems" :key="i">
      <td v-if="value" width="20">
        <input type="checkbox" :checked="value.includes(item)"
          @click="selectItem(item)">
      </td>
      <slot :item="item">{{item}}</slot>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    columns: { type: Array, required: true },
    value: Array,
  },

  data: () => ({
    sortCol: null,
    sortDir: 1,
  }),

  computed: {
    sortedItems() {
      const column = this.validColumns[this.sortCol]
      if (!column || !column.sort) return this.items
      return this.items.slice(0).sort((a, b) => {
        return this.sortDir * (column.sort(b) - column.sort(a))
      })
    },

    validColumns() {
      return this.columns.filter(c => c)
    },
  },

  methods: {
    columnClasses(col) {
      return {
        '-sortable': col.sort,
      }
    },

    toggleSort(colIdx) {
      const column = this.validColumns[colIdx]
      if (!column || !column.sort) return
      if (this.sortCol == colIdx) {
        if (this.sortDir < 0) {
          this.sortCol = null
        } else {
          this.sortDir = -1
        }
      } else {
        this.sortDir = 1
        this.sortCol = colIdx
      }
    },

    selectAll() {
      if (this.value.length == this.items.length) {
        this.$emit('input', [])
      } else {
        this.$emit('input', this.items.slice(0))
      }
    },

    selectItem(item) {
      if (this.value.includes(item)) {
        this.$emit('input', this.value.filter(x => x != item))
      } else {
        this.$emit('input', this.value.concat(item))
      }
    },
  },

}
</script>
