<template>
  <td>
    <span v-if="single">{{ singleData }}</span>

    <div v-else class="tprsheet-td">
      <div v-for="data of item" :key="data.date" class="tprsheet-td-row">
        <template v-if="Array.isArray(data[fieldKey])">
          <span v-for="(subdate, index) of data[fieldKey]" :key="index" class="tprsheet-td-data">{{ subdate }}</span>
        </template>
        <span v-else class="tprsheet-td-data">{{ data[fieldKey] }}</span>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'Td',
  props: {
    single: {
      type: Boolean,
      default: false
    },
    fieldKey: {
      type: String,
      required: true
    },
    item: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isDate () {
      return this.fieldKey === 'date'
    },
    singleData () {
      if (!this.single) return null

      if (this.item[0] && this.isDate) {
        const year = new Date(this.item[0].date).getFullYear()
        const month = new Date(this.item[0].date).getMonth() + 1
        const date = new Date(this.item[0].date).getDate()
        return `${year}/${month}/${date}`
      } else if (this.item[0]) return this.item[0][this.fieldKey]
      else return ''
    }
  }
}
</script>
