<template>
  <div class="tprsheet">
    <table>
      <tbody>
        <template v-for="field of fields">
          <template v-if="field.chart">
            <tr v-if="field.time === undefined ? true : field.time" :key="`${field.key}-time`">
              <Th label="時間" />
              <TdTime v-for="(datalist, index) of computedItems" :key="index" />
            </tr>

            <tr :key="`${field.key}-content`" class="tprsheet-chartwrap">
              <ThChart :fields="field.fields" />
              <TdChart
                v-for="(datalist, index) of computedItems"
                :key="index"
                :first-child="index === 0"
                :items="computedItems"
                :datalist="datalist"
                :fields="field.fields"
                :options="computedOptions"
              />
            </tr>
          </template>

          <tr v-else :key="field.key">
            <Th :label="field.label" :children="field.children" />
            <Td
              v-for="(datalist, index) of computedItems"
              :key="index"
              :single="field.single"
              :field-key="field.key"
              :datalist="datalist"
            />
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import Th from '@/components/Th.vue'
import ThChart from '@/components/ThChart.vue'
import Td from '@/components/Td.vue'
import TdTime from '@/components/TdTime.vue'
import TdChart from '@/components/TdChart.vue'

export default {
  name: 'Tprsheet',
  components: {
    Th,
    ThChart,
    Td,
    TdTime,
    TdChart
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    computedOptions () {
      const options = {
        backgroundColor: '#fff',
        borderColor: '#bcb7b7',
        chart: {
          circleRadius: '5px',
          lineWidth: '2px'
        }
      }
      Object.keys(this.options).forEach(key => {
        if (typeof (options[key]) === 'object') options[key] = Object.assign(options[key], this.options[key])
        else options[key] = this.options[key]
      })
      return options
    },
    computedItems () {
      const dataObj = {}
      this.items.forEach(item => {
        if (new Date(item.date).toString() === 'Invalid Date') return
        const year = new Date(item.date).getFullYear()
        const month = new Date(item.date).getMonth() + 1
        const date = new Date(item.date).getDate()
        const dateKey = `${year}${month}${date}`
        if (dataObj[dateKey]) dataObj[dateKey].push(item)
        else dataObj[dateKey] = [item]
      })
      return Object.keys(dataObj).sort().map(key => dataObj[key].sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) return 1
        else if (new Date(a.date) < new Date(b.date)) return -1
        else return 0
      }))
    }
  },
  mounted () {
    if (this.computedOptions.backgroundColor) document.documentElement.style.setProperty('--tpr-bg-color', this.computedOptions.backgroundColor)
    if (this.computedOptions.borderColor) document.documentElement.style.setProperty('--tpr-border-color', this.computedOptions.borderColor)
  }
}
</script>

<style lang="scss">
@import './scss/style';
</style>
