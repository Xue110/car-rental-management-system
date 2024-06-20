<template>
  <div class="chart-line">
    <el-card class="box-card">
      <div class="echart" ref="echartRef"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// import useAnaylsisStore from '@/store/main/analysis/analysis'
import * as echarts from 'echarts'
// import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
// const mainStore = useAnaylsisStore()
// mainStore.fetchLineDataAction()
// const { lineList } = storeToRefs(mainStore)
const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!)
  // const setOption = () => {
  echartInstance.setOption({
    title: {
      text: '车辆租赁总数趋势',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['车辆数量']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2024-01-10', '2024-02-12', '2024-03-14', '2024-04-23', '2024-05-11', '2024-06-12']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '车辆数量',
        type: 'line',
        smooth: true,
        data: [800, 850, 900, 950, 1000, 1050] // 折线图的数据格式
      }
    ]
  })
  // }
  // 监听lineList的变化，重新设置series的data
  // watch(lineList, () => {
  //   setOption()
  // })
})
</script>

<style lang="less" scoped>
.chart-line {
  color: #000;
}

.echart {
  height: 450px;
  /* 设置图表容器的高度 */
}
</style>
