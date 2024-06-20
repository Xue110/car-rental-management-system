<template>
  <div class="role">
    <car-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <car-content ref="contentRef" @new-click="handleNewBtnClick" @edit-click="handleEditBtnClick" />
    <car-model ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import CarSearch from './c-cpns/car-search.vue'
import CarContent from './c-cpns/car-content.vue'
import CarModel from './c-cpns/car-model.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof CarContent>>()

function handleQueryClick(formData: any) {
  console.log(formData)
  contentRef.value?.fetchCarListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchCarListData()
}

const modalRef = ref<InstanceType<typeof CarModel>>()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.role {
  border-radius: 8px;
  overflow: hidden;
}
</style>
