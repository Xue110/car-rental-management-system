<template>
  <div class="add-car">
    <add-car-form />
  </div>
</template>

<script setup lang="ts">
import AddCarForm from './c-cpns/add-carForm.vue'
</script>

<style lang="less" scoped>
.add-car {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://img0.baidu.com/it/u=1279480520,2208473416&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1716656400&t=eb64a76d5eebcaa46b19ee493d3b659a);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
