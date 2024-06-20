<template>
  <div class="chart-cylinder">
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
mainStore.fetchCylinderDataAction()
const { cylinderList } = storeToRefs(mainStore)
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      xAxis: {
        type: 'category',
        data: ['空闲中', '租赁中', '维修中']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '车辆数量',
          type: 'bar',
          data: [
            cylinderList.value.freeCar,
            cylinderList.value.leaseCar,
            cylinderList.value.repairCar
          ] // 修改为柱形图的数据格式
        }
      ]
    })
  }
  // 监听cylinderList的变化，重新设置series的data
  watch(cylinderList, () => {
    setOption()
  })
})
</script>

<style lang="less" scoped>
.chart-cylinder {
  color: red;
}

.echart {
  height: 450px;
  /* 设置图表容器的高度 */
}
</style>
