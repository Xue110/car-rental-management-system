<template>
  <div class="dashboard">
    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card />
      </el-col>
      <el-col :span="10">
        <chart-ring />
      </el-col>
      <el-col :span="7">
        <chart-rose />
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="8">
      <el-col :span="12">
        <chart-cylinder type="line" />
      </el-col>
      <el-col :span="12">
        <chart-line type="bar" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ChartRing from './c-cpns/chart-card/chart-ring.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import ChartRose from './c-cpns/chart-card/chart-rose.vue'
import ChartCylinder from './c-cpns/chart-card/chart-cylinder.vue'
import ChartLine from './c-cpns/chart-card/chart-line.vue'
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}

.echart {
  height: 250px;
}
</style>
