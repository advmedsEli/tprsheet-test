<template>
  <div class="tprsheet">
    <table>
      <tbody>
        <template v-for="field of fields">
          <template v-if="field.key === 'chart'">
            <tr :key="`${field.key}-time`">
              <Th label="時間" />
              <TdTime v-for="(item, index) of computedItems" :key="index" />
            </tr>

            <tr :key="`${field.key}-content`">
              <ThChart />
              <TdChart :colspan="computedItems[0].length" :items="computedItems" :fields="field.fields" />
            </tr>
          </template>

          <tr v-else :key="field.key">
            <Th :label="field.label" :children="field.children ? field.children : []" />
            <Td
              v-for="(item, index) of computedItems"
              :key="index"
              :single="!!field.single"
              :item="item"
              :field-key="field.key"
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
    }
  },
  computed: {
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
      return Object.keys(dataObj).sort().map(key => dataObj[key])
    }
  }
}
</script>

<style lang="scss">
@import './scss/style';
</style>
