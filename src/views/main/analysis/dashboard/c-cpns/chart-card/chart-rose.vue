<template>
  <div class="chart-rose">
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
mainStore.fetchRoseDataAction()
const { roseList } = storeToRefs(mainStore)
const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!)
  const setOption = () => {
    echartInstance.setOption({
      title: {
        text: '用户状态',
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
          name: '用户状态',
          type: 'pie',
          roseType: 'radius', // 设置为'radius'实现玫瑰状
          radius: ['20%', '70%'], // 设置内外半径，形成玫瑰状
          data: [
            { value: roseList.value.notReturned, name: '未归还' },
            { value: roseList.value.returned, name: '已归还' },
            { value: roseList.value.overdue, name: '已逾期' }
          ]
        }
      ]
    })
  }
  // 监听roseList的变化，重新设置series的data
  watch(roseList, () => {
    setOption()
  })
})
</script>

<style lang="less" scoped>
.chart-rose {
  color: red;
}

.echart {
  height: 300px;
  /* 设置图表容器的高度 */
}
</style>
