# TPR Sheet

## Global Registration
```
import Vue from 'vue'
import Tprsheet from 'tprsheet'

Vue.component('Tprsheet', Tprsheet)
```

## Local Registration
```
import Tprsheet from 'tprsheet'

export default {
  components: {
    Tprsheet
  }
}
```

## Import css or scss
```
import tprsheet.css
```
```
@import tprsheet.css
```

## Options Prop
```
<Tprsheet :fields="fields" :items="items" :options="options"/>
```
`fields` Object[]
* `key` *String: 對應 `items` 資料內的 `key`
* `label` String: 標題
* `single` Boolean: 僅顯示當天第一筆
* `children` String[]: 副標題
* `chart` Boolean: 是否顯示折線圖
* `time` Boolean: `chart` 為 `true` 時生效，顯示時間列，預設為 true
* `fields` Object[]: `chart` 為 `true` 時生效，圖表內的設定
  * `key` *String: 可填入 `breathe`、`pulse` 與 `temperature`，對應呼吸、脈搏與體溫
  * `alias` String: 對應 `items` 資料內的 `key`，預設為 `key` 值
  * `color` String: 折線圖線段顏色

```
fields: [
  {
    key: 'date',
    label: '日期',
    single: true
  },
  {
    key: 'comaScale',
    label: '昏迷指數',
    children: ['E', 'V', 'M']
  },
  {
    key: 'chart',
    chart: true,
    time: true,
    fields: [
      {
        key: 'breathe',
        alias: 'aliasBreathe',
        color: '#6fc0d3'
      },
      {
        key: 'pulse',
        color: '#1a6f8f'
      },
      {
        key: 'temperature',
        color: '#ef7610'
      }
    ]
  },
]
```

`items` Object[]
* `date` *String: 時間

其餘資料格式為 String、Number 或 Array
* String, Number: 單一顯示
* Array: 多行顯示

```
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
  }
]
```

`options` Object
* `backgroundColor` String: 背景顏色
* `borderColor` String: 格線顏色
* `chart` Object
  * `circleRadius` String: 折線圖圓點半徑，預設為 '5px'
  * `lineWidth` String: 折線圖線寬，預設為 '3px'

```
options: {
  backgroundColor: '#fff',
  borderColor: ' #bcb7b7',
  chart: {
    circleRadius: '5px',
    lineWidth: '3px'
  }
}
```