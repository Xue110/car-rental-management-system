<template>
  <div class="chart-card">
    <el-card class="box-card">
      <div class="echart" ref="echartRef"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useAnaylsisStore from '@/store/main/analysis/analysis'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
const mainStore = useAnaylsisStore()
mainStore.fetchRingDataAction()
const { ringList } = storeToRefs(mainStore)
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!)
  const setOption = () => {
    echartInstance.setOption({
      title: {
        text: '车辆类型',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '车辆类型',
          type: 'pie',
          radius: ['40%', '70%'], // 设置内外半径，形成圆环
          data: [
            { value: ringList.value.sedan, name: '轿车' },
            { value: ringList.value.suv, name: 'SUV' },
            { value: ringList.value.luxuryCar, name: '豪华车' },
            { value: ringList.value.mpv, name: 'MPV' },
            { value: ringList.value.bus, name: '客车' }
          ]
        }
      ]
    })
  }
  // 监听ringList的变化，重新设置series的data
  watch(ringList, () => {
    setOption()
  })
})
</script>

<style lang="less" scoped>
.chart-ring {
  color: red;
}

.echart {
  height: 300px;
  /* 设置图表容器的高度 */
}
</style>
