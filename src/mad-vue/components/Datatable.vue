<template>
  <div>
    <table class="mad-datatable">
      <tr>
        <th v-if="value">
          <input type="checkbox" :checked="value.length == items.length"
            @click="selectAll">
        </th>
        <th v-for="(col,i) in validColumns" :key="i"
          :class="{
            '-sortable': col.sort,
            '-sorted': col.key == sortKey,
          }"
          @click="toggleSort(col)"
          :align="col.align">
          <div class="row align-center">
            <div class="grow capitalize">
              <slot :name="col.key+'-label'" :column="col">
                {{col.label || keyToLabel(col.key)}}
              </slot>
            </div>
            <div v-if="col.sort">
              &nbsp;
              <mad-icon
                :class="sortKey == col.key ? '' : 'faded'"
                :mdi="sortKey == col.key ? sortDir > 0 ? 'sort-descending' : 'sort-ascending' : 'sort'"/>
            </div>
          </div>
        </th>
      </tr>
      <tr v-for="(item,i) in currentItems" :key="i"
        :class="{
          '-clickable': itemIsClickable(item)
        }">
        <td v-if="value" width="20" @click="selectItem(item)">
          <input type="checkbox" :checked="value.includes(item)">
        </td>
        <td v-for="(col,i) in validColumns" :key="i"
          :align="col.align">
          <component class="mad-datatable_td-fill"
            :is="rowLink && rowLink(item) ? 'a' : 'div'" :href="rowLink && rowLink(item)"
            @click.prevent="onItemClick(item)">
            <slot :name="col.key" :item="item">{{item[col.key]}}</slot>
          </component>
        </td>
      </tr>
    </table>
    <p v-if="perPage" class="row align-center">
      <span class="grow">
        {{page*perPage+1}} &ndash; {{Math.min(items.length, (page+1)*perPage)}} of {{items.length}}
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
    items: { type: Array, required: true },
    columns: { type: Array, required: true },
    perPage: Number,
    value: Array,
    clickItem: { type: [String, Function] },
    rowLink: Function,
    rowClick: Function,
  },

  data: () => ({
    sortKey: null,
    sortDir: 1,
    page: 0,
  }),

  computed: {
    currentItems() {
      let items = this.items.slice(0)
      const sortCol = this.sortKey && this.columns.find(c => c && c.key == this.sortKey)
      if (sortCol && sortCol.sort) {
        items = items.sort((a, b) => {
          const valueA = a[sortCol.key], valueB = b[sortCol.key]
          let diff = valueB - valueA
          if (typeof sortCol.sort == 'function') diff = sortCol.sort(b) - sortCol.sort(a)
          else if (isNaN(diff) && typeof valueB == 'string') diff = valueB.localeCompare(valueA)
          return this.sortDir * diff
        })
      }
      if (this.perPage) {
        items = items.slice(this.perPage * this.page, this.perPage * (this.page + 1))
      }
      return items
    },

    validColumns() {
      return this.columns.filter(c => c)
    },

    totalPages() {
      if (!this.perPage) return 1
      return Math.ceil(this.items.length / this.perPage)
    },
  },

  methods: {
    itemIsClickable(item) {
      return this.rowClick || (this.rowLink && this.rowLink(item))
    },

    onItemClick(item) {
      if (this.rowClick) {
        this.rowClick(item)
      } else if (this.rowLink) {
        if (this.$router) this.$router.push(this.rowLink(item))
        else window.location.href = this.rowLink(item)
      }
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

    keyToLabel(key) {
      let s = key.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
      return s.slice(0, 1).toUpperCase() + s.slice(1)
    }
  },

}
</script>
