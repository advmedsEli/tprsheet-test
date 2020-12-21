<template>
  <td class="tprsheet-td-chart">
    <div id="tprsheet-chart" ref="chart" class="tprsheet-td" />
  </td>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'TdChart',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      w: 0,
      h: 0
    }
  },
  mounted () {
    window.addEventListener('resize', this.init)
    this.init()
  },
  methods: {
    init () {
      this.$refs.chart.innerHTML = ''
      this.w = this.$refs.chart.clientWidth
      this.h = this.$refs.chart.clientHeight
      d3.select('#tprsheet-chart').append('svg').attr('id', 'mySvg').attr('width', this.w).attr('height', this.h)
      this.drawGrid()
      this.drawFieldsChart()
    },
    drawGrid () {
      const group = d3.select('#mySvg').append('g')

      const xLineLength = 6 + (5 * (this.items.length - 1)) - 2
      const xEqual = this.w / (this.items.length * 5)
      for (let index = 0; index < xLineLength; index++) {
        const lineWidth = (index + 1) % 5 === 0 ? 3 : 1
        group
          .append('line')
          .attr('x1', xEqual * (index + 1))
          .attr('y1', 0)
          .attr('x2', xEqual * (index + 1))
          .attr('y2', this.h)
          .attr('stroke', '#ccc')
          .attr('stroke-width', lineWidth + 'px')
      }

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
          .attr('stroke', '#ccc')
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
      const breatheColor = '#00f'

      const pulseScaleY = d3.scaleLinear().domain([210, 10]).range([0, this.h])
      const pulseColor = '#0f0'

      const temperatureScaleY = d3.scaleLinear().domain([43.5, 33.5]).range([0, this.h])
      const temperatureColor = '#f00'

      this.fields.forEach(field => {
        const btline = d3.line()
          .x(item => {
            return scaleX(new Date(item.date).getTime())
          })
          .y((item, i) => {
            if (field === 'breathe') return breatheScaleY(item.breathe)
            else if (field === 'pulse') return pulseScaleY(item.pulse)
            else if (field === 'temperature') return temperatureScaleY(item.temperature)
          })

        const group = chart.append('g').selectAll('g').data(datalist).enter().append('g')
        group
          .append('circle')
          .attr('cx', item => {
            return scaleX(new Date(item.date).getTime())
          })
          .attr('cy', item => {
            if (field === 'breathe') return breatheScaleY(item.breathe)
            else if (field === 'pulse') return pulseScaleY(item.pulse)
            else if (field === 'temperature') return temperatureScaleY(item.temperature)
          })
          .attr('r', '4px')
          .attr('fill', field === 'breathe' ? breatheColor : field === 'pulse' ? pulseColor : temperatureColor)

        group
          .append('path')
          .attr('d', btline(datalist))
          .attr('stroke', field === 'breathe' ? breatheColor : field === 'pulse' ? pulseColor : temperatureColor)
          .attr('stroke-width', '2px')
          .attr('fill', 'none')
      })
    }
  }
}
</script>
