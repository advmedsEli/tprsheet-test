<template>
  <div id="app">
    <Tprsheet :fields="fields" :items="items" />
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
          key: 'chart',
          fields: ['breathe', 'pulse', 'temperature']
        },
        {
          key: 'painIndex',
          label: '疼痛指數'
        },
        {
          key: 'bloodPressure',
          label: '血壓'
        },
        {
          key: 'comaScale',
          label: '昏迷指數',
          children: ['E', 'V', 'M']
        }
      ],
      items: [
        {
          date: '2020/11/13 06:00',
          day: '第一天',
          painIndex: 0,
          bloodPressure: [125, 80],
          comaScale: [4, 4, 6],
          breathe: 30,
          pulse: 80,
          temperature: 36
        },
        {
          date: '2020/11/13 12:00',
          day: '第一天',
          painIndex: 1,
          bloodPressure: [130, 85],
          comaScale: [5, 5, 5],
          breathe: 83,
          pulse: 90,
          temperature: 36.2
        },
        {
          date: '2020/11/14 06:00',
          day: '第二天',
          painIndex: 2,
          bloodPressure: [127, 82],
          comaScale: [3, 2, 1],
          breathe: 45,
          pulse: 82,
          temperature: 36.5
        },
        {
          date: '2020/11/14 11:00',
          day: '第二天',
          painIndex: 3,
          bloodPressure: [129, 81],
          comaScale: [2, 2, 2],
          breathe: 40,
          pulse: 85,
          temperature: 35
        }
      ]
    }
  }
}
</script>
<style>
  html {
    background-color: #ccc;
  }
</style>
