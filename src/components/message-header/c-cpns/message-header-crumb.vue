<template>
  <div class="header-crumb">
    <el-breadcrumb :separator-icon="CaretRight">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ menuTitle }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadcrumb }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const breadcrumb = ref('租赁信息')
const router = useRouter()

// 监听路由变化更新面包屑
watch(
  () => router.currentRoute.value.path,
  (path) => {
    if (path === '/main') {
      // 如果当前路由为首页，则只显示首页的面包屑项
      breadcrumb.value = ''
      menuTitle.value = ''
    } else {
      // 根据当前路由路径更新面包屑内容
      if (path === '/message/car-message') {
        breadcrumb.value = '租赁信息'
        menuTitle.value = '信息列表'
      }
    }
  }
)

const menuTitle = ref('信息列表')
</script>
