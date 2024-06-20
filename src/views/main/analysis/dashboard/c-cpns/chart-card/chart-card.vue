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
mainStore.fetchCardDataAction()
const { cardList } = storeToRefs(mainStore)
const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!)

  const setOption = () => {
    echartInstance.setOption({
      title: {
        text: '车辆总数',
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
          name: '车辆状态',
          type: 'pie',
          radius: '50%',
          data: [
            { value: cardList.value.leaseCar, name: '租赁中' },
            { value: cardList.value.repairCar, name: '维修中' },
            { value: cardList.value.freeCar, name: '空闲中' }
          ]
        }
      ]
    })
  }
  // 监听cardList的变化，重新设置series的data
  watch(cardList, () => {
    setOption()
  })
})
</script>

<style lang="less" scoped>
.chart-card {
  color: red;
}

.echart {
  height: 300px;
  /* 设置图表容器的高度 */
}
</style>
