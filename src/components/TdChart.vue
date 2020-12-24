<template>
  <td ref="wrap" class="tprsheet-chart tprsheet-chart">
    <div class="tprsheet-td">
      <div v-for="data of datalist" :key="data.date" class="tprsheet-td-row" />
    </div>

    <template v-if="firstChild">
      <div id="tprsheet-chart" ref="chart" class="tprsheet-chart-svg" />
      <div v-if="popoverData" ref="popoverData" class="tprsheet-chart-popover">
        <div>
          <span v-if="popoverData.fieldKey === 'breathe'">呼吸 </span>
          <span v-if="popoverData.fieldKey === 'pulse'">脈搏 </span>
          <span v-if="popoverData.fieldKey === 'temperature'">體溫 </span>
          {{ popoverData[popoverData.fieldKey] }}
        </div>
        <div>{{ popoverDate }}</div>
      </div>
    </template>
  </td>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'TdChart',
  props: {
    firstChild: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    datalist: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      w: 0,
      h: 0,
      popoverData: null
    }
  },
  computed: {
    popoverDate () {
      if (this.popoverData === null) return ''
      else {
        let hour = new Date(this.popoverData.date).getHours()
        let min = new Date(this.popoverData.date).getMinutes()
        if (String(hour).length === 1)hour = '0' + hour
        if (String(min).length === 1)min = '0' + min
        return `${hour}:${min}`
      }
    }
  },
  mounted () {
    if (this.firstChild) {
      window.addEventListener('resize', this.init)
      this.init()
    }
  },
  methods: {
    init () {
      this.$refs.chart.innerHTML = ''
      this.w = this.$refs.wrap.offsetWidth * this.items.length
      this.h = this.$refs.wrap.offsetHeight
      this.$refs.chart.style.width = this.w
      this.$refs.chart.style.height = this.h
      d3.select('#tprsheet-chart').append('svg').attr('id', 'mySvg').attr('width', this.w).attr('height', this.h)
      this.drawGrid()
      this.drawFieldsChart()
    },
    drawGrid () {
      const group = d3.select('#mySvg').append('g')

      const yLineLength = 8
      const yEqual = this.h / 10
      for (let index = 0; index < yLineLength; index++) {
        const labelHeight = 0.5
        group
          .append('line')
          .attr('x1', 0)
          .attr('y1', yEqual * (labelHeight + index + 1))
          .attr('x2', this.w)
          .attr('y2', yEqual * (labelHeight + index + 1))
          .attr('stroke', this.options.borderColor)
          .attr('stroke-width', '1px')
      }
    },
    drawFieldsChart () {
      const chart = d3.select('#mySvg')
      const datalist = this.items.reduce((accumulator, item) => accumulator.concat(item), [])

      const startDay = new Date(datalist[0].date).setHours(0, 0, 0, 0)
      const endDay = new Date(datalist[datalist.length - 1].date).setHours(24, 0, 0, 0)
      const scaleX = d3.scaleLinear().domain([startDay, endDay]).range([0, this.w])

      const breatheScaleY = d3.scaleLinear().domain([95, -5]).range([0, this.h])
      const pulseScaleY = d3.scaleLinear().domain([210, 10]).range([0, this.h])
      const temperatureScaleY = d3.scaleLinear().domain([43.5, 33.5]).range([0, this.h])

      this.fields.forEach(field => {
        const color = field.color || '#000'

        const linePath = d3.line()
          .x(item => {
            return scaleX(new Date(item.date).getTime())
          })
          .y((item, i) => {
            if (field.key === 'breathe') {
              if (field.alias) return breatheScaleY(item[field.alias])
              else return breatheScaleY(item.breathe)
            } else if (field.key === 'pulse') {
              if (field.alias) return pulseScaleY(item[field.alias])
              else return pulseScaleY(item.pulse)
            } else if (field.key === 'temperature') {
              if (field.alias) return temperatureScaleY(item[field.alias])
              else return temperatureScaleY(item.temperature)
            }
          })

        const group = chart.append('g').selectAll('g').data(datalist).enter().append('g')
        const circle = group
          .append('circle')
          .attr('cx', item => {
            return scaleX(new Date(item.date).getTime())
          })
          .attr('cy', item => {
            if (field.key === 'breathe') {
              if (field.alias) return breatheScaleY(item[field.alias])
              else return breatheScaleY(item.breathe)
            } else if (field.key === 'pulse') {
              if (field.alias) return pulseScaleY(item[field.alias])
              else return pulseScaleY(item.pulse)
            } else if (field.key === 'temperature') {
              if (field.alias) return temperatureScaleY(item[field.alias])
              else return temperatureScaleY(item.temperature)
            }
          })
          .attr('r', this.options.chart.circleRadius)
          .attr('fill', color)

        group
          .append('path')
          .attr('d', linePath(datalist))
          .attr('stroke', color)
          .attr('stroke-width', this.options.chart.lineWidth)
          .attr('fill', 'none')

        circle.on('mouseover', (event, item) => {
          this.popoverData = item
          this.popoverData.fieldKey = field.key
          this.$nextTick(() => {
            let top = 0
            let left = 0
            left = scaleX(new Date(item.date).getTime())
            if (field.key === 'breathe') {
              if (field.alias) top = breatheScaleY(item[field.alias])
              else top = breatheScaleY(item.breathe)
            } else if (field.key === 'pulse') {
              if (field.alias) top = pulseScaleY(item[field.alias])
              else top = pulseScaleY(item.pulse)
            } else if (field.key === 'temperature') {
              if (field.alias) top = temperatureScaleY(item[field.alias])
              else top = temperatureScaleY(item.temperature)
            }
            this.$refs.popoverData.style.top = `calc(${top - this.$refs.popoverData.offsetHeight - 15 + 'px'} - ${this.options.chart.circleRadius})`
            this.$refs.popoverData.style.left = left - (this.$refs.popoverData.offsetWidth / 2) + 'px'
          })
        }).on('mouseout', () => {
          this.popoverData = null
        })
      })
    }
  }
}
</script>
