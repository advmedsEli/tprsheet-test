<template>
  <td>
    <span v-if="single">{{ singleData }}</span>

    <div v-else class="tprsheet-td">
      <div v-for="data of datalist" :key="data.date" class="tprsheet-td-row">
        <template v-if="Array.isArray(data[fieldKey])">
          <span v-for="(subdate, index) of data[fieldKey]" :key="index" class="tprsheet-td-data">{{ subdate }}</span>
        </template>
        <span v-else-if="data[fieldKey]" class="tprsheet-td-data">{{ data[fieldKey] }}</span>
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
    datalist: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    singleData () {
      if (this.fieldKey === 'date') {
        const year = new Date(this.datalist[0].date).getFullYear()
        const month = new Date(this.datalist[0].date).getMonth() + 1
        const date = new Date(this.datalist[0].date).getDate()
        return `${year}/${month}/${date}`
      } else if (this.datalist[0]) return this.datalist[0][this.fieldKey]
      else return ''
    }
  }
}
</script>
