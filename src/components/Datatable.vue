<template>
  <div>
    <table class="mad-datatable">
      <thead>
        <tr>
          <th v-if="value">
            <input type="checkbox" :checked="value.length == rows.length"
              @click="selectAll">
          </th>
          <th v-for="(col,i) in validColumns" :key="i"
            :class="{
              '-sortable': col.sort,
            }"
            @click="toggleSort(col)"
            :align="col.align">
            <div class="row align-center">
              <div class="capitalize">
                <slot :name="col.key+'-label'" :column="col">
                  {{col.label || keyToLabel(col.key)}}
                </slot>
              </div>
              <div v-if="col.sort">
                &nbsp;
                <mad-icon
                  :class="sortKey == col.key ? '' : 'faded'"
                  size="xs"
                  :mdi="sortKey == col.key ? sortDir > 0 ? 'sort-descending' : 'sort-ascending' : 'sort'"/>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,i) in currentRows" :key="i"
          :class="getRowClasses(row)">
          <td v-if="value" width="20" @click="selectRow(row)">
            <input type="checkbox" :checked="value.includes(row)">
          </td>
          <td v-for="(col,i) in validColumns" :key="i"
            :align="col.align"
            @click.left="e=>onItemClick(row, e)"
            @click.middle="e=>onItemClick(row, e)">
            <slot :name="col.key" :row="row">{{row[col.key]}}</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="perPage" class="row align-center">
      <span class="grow">
        {{page*perPage+1}} &ndash; {{Math.min(rows.length, (page+1)*perPage)}} of {{rows.length}}
      </span>
      <mad-button flat :disabled="page<=0" @click="page--">
        <mad-icon mdi="chevron-left"/>
      </mad-button>
      <mad-button flat :disabled="page>totalPages-2" @click="page++">
        <mad-icon mdi="chevron-right"/>
      </mad-button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    rows: { type: Array, required: true },
    columns: { type: Array, required: true },
    perPage: Number,
    value: Array,
  },

  data: () => ({
    sortKey: null,
    sortDir: 1,
    page: 0,
  }),

  computed: {
    currentRows() {
      let rows = this.rows.slice(0)
      const sortCol = this.sortKey && this.columns.find(c => c && c.key == this.sortKey)
      if (sortCol && sortCol.sort) {
        let getSortVal = sortCol.sort
        if (typeof sortCol.sort === 'string') getSortVal = row => row[sortCol.sort]
        if (sortCol.sort === true) getSortVal = row => row[sortCol.key]
        rows = rows.sort((a, b) => {
          const valueA = getSortVal(a), valueB = getSortVal(b)
          let diff = valueB - valueA
          if (isNaN(diff) && typeof valueB == 'string') diff = valueB.localeCompare(valueA)
          return this.sortDir * diff
        })
      }
      if (this.perPage) {
        rows = rows.slice(this.perPage * this.page, this.perPage * (this.page + 1))
      }
      return rows
    },

    validColumns() {
      return this.columns.filter(c => c)
    },

    totalPages() {
      if (!this.perPage) return 1
      return Math.ceil(this.rows.length / this.perPage)
    },
  },

  methods: {
    onItemClick(item, event) {
      if (item.click) item.click(event)
    },

    toggleSort(col) {
      if (!col || !col.sort) return
      if (this.sortKey == col.key) {
        if (this.sortDir < 0) {
          this.sortKey = null
        } else {
          this.sortDir = -1
        }
      } else {
        this.sortDir = 1
        this.sortKey = col.key
      }
    },

    selectAll() {
      if (this.value.length == this.rows.length) {
        this.$emit('input', [])
      } else {
        this.$emit('input', this.rows.slice(0))
      }
    },

    selectRow(row) {
      if (this.value.includes(row)) {
        this.$emit('input', this.value.filter(x => x != row))
      } else {
        this.$emit('input', this.value.concat(row))
      }
    },

    keyToLabel(key) {
      let s = key.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
      return s.slice(0, 1).toUpperCase() + s.slice(1)
    },

    getRowClasses(row) {
      return {
        '-clickable-row': !!row.click,
      }
    },
    
  },

}
</script>
