<template>
  <div id="app">
    <Tprsheet :fields="fields" :items="items" :options="options" />
  </div>
</template>

<script>
import Tprsheet from '../Tprsheet'

export default {
  name: 'App',
  components: {
    Tprsheet
  },
  data () {
    return {
      options: {
        backgroundColor: '#fff',
        borderColor: ' #bcb7b7',
        chart: {
          circleRadius: '5px',
          lineWidth: '5px'
        }
      },
      fields: [
        {
          key: 'date',
          label: '日期',
          single: true
        },
        {
          key: 'day',
          label: '住院日數',
          single: true
        },
        {
          key: 'a',
          label: '手術產生日期',
          single: true
        },
        {
          key: 'b',
          label: '重要藥物及檢查',
          single: true
        },
        {
          key: 'chart',
          chart: true,
          time: true,
          fields: [
            {
              key: 'breathe',
              alias: 'breathe',
              color: '#6fc0d3'
            },
            {
              key: 'pulse',
              alias: 'pulse',
              color: '#1a6f8f'
            },
            {
              key: 'temperature',
              alias: 'temperature',
              color: '#ef7610'
            }
          ]
        },
        {
          key: 'bloodPressure',
          label: '血壓'
        },
        {
          key: 'painIndex',
          label: '疼痛指數'
        },
        {
          key: 'comaScale',
          label: '昏迷指數',
          children: ['E', 'V', 'M']
        },
        {
          key: 'pr',
          label: 'Pupils Reaction',
          children: ['R', 'L']
        },
        {
          key: 'oxygen',
          label: '血氧濃度'
        },
        {
          key: 'io',
          label: 'I/O 差異量'
        },
        {
          key: 'sdds',
          label: '重要異常報告'
        }
      ],
      items: [
        {
          date: '2020/11/13 18:00',
          day: '第一天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 97,
          io: -1530
        },
        {
          date: '2020/11/13 06:00',
          day: '第一天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 10,
          pulse: 80,
          temperature: 35.8,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/13 12:00',
          day: '第一天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 15,
          pulse: 95,
          temperature: 36.2,
          pr: ['4T', '4T'],
          oxygen: 96,
          io: -1530
        },
        {
          date: '2020/11/13 14:00',
          day: '第一天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 21,
          pulse: 79,
          temperature: 35.5,
          pr: ['4T', '4T'],
          oxygen: 98,
          io: -1530
        },
        {
          date: '2020/11/13 19:00',
          day: '第一天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 97,
          io: -1530
        },
        {
          date: '2020/11/14 06:00',
          day: '第二天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 10,
          pulse: 80,
          temperature: 35.8,
          pr: ['4T', '4T'],
          oxygen: 100,
          io: -1530
        },
        {
          date: '2020/11/14 12:00',
          day: '第二天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 15,
          pulse: 95,
          temperature: 36.2,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/14 14:00',
          day: '第二天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 21,
          pulse: 79,
          temperature: 35.5,
          pr: ['4T', '4T'],
          oxygen: 97,
          io: -1530
        },
        {
          date: '2020/11/14 18:00',
          day: '第二天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/14 19:00',
          day: '第二天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/15 06:00',
          day: '第三天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 10,
          pulse: 80,
          temperature: 35.8,
          pr: ['4T', '4T'],
          oxygen: 98,
          io: -1530
        },
        {
          date: '2020/11/15 12:00',
          day: '第三天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 15,
          pulse: 95,
          temperature: 36.2,
          pr: ['4T', '4T'],
          oxygen: 96,
          io: -1530
        },
        {
          date: '2020/11/15 14:00',
          day: '第三天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 21,
          pulse: 79,
          temperature: 35.5,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/15 18:00',
          day: '第三天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 91,
          io: -1530
        },
        {
          date: '2020/11/15 19:00',
          day: '第三天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 91,
          io: -1530
        },
        {
          date: '2020/11/16 06:00',
          day: '第四天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 10,
          pulse: 80,
          temperature: 35.8,
          pr: ['4T', '4T'],
          oxygen: 99,
          io: -1530
        },
        {
          date: '2020/11/16 12:00',
          day: '第四天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 15,
          pulse: 95,
          temperature: 36.2,
          pr: ['4T', '4T'],
          oxygen: 98,
          io: -1530
        },
        {
          date: '2020/11/16 14:00',
          day: '第四天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 21,
          pulse: 79,
          temperature: 35.5,
          pr: ['4T', '4T'],
          oxygen: 95,
          io: -1530
        },
        {
          date: '2020/11/16 18:00',
          day: '第四天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 96,
          io: -1530
        },
        {
          date: '2020/11/16 19:00',
          day: '第四天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 21,
          pulse: 91,
          temperature: 36.6,
          pr: ['4T', '4T'],
          oxygen: 96,
          io: -1530
        }
      ]
    }
  }
}
</script>

<style>
  html {
    background-color: #afd7e0;
  }
</style>
