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

const breadcrumb = ref('核心技术')
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
      if (path === '/main/analysis/overview') {
        breadcrumb.value = '核心技术'
        menuTitle.value = '系统总览'
      } else if (path === '/main/analysis/dashboard') {
        breadcrumb.value = '汽车统计'
        menuTitle.value = '系统总览'
      } else if (path === '/main/system/user') {
        breadcrumb.value = '用户信息'
        menuTitle.value = '用户管理'
      } else if (path === '/main/system/add-user') {
        breadcrumb.value = '添加用户'
        menuTitle.value = '用户管理'
      } else if (path === '/main/system/role') {
        breadcrumb.value = '汽车信息'
        menuTitle.value = '汽车管理'
      } else if (path === '/main/system/add-car') {
        breadcrumb.value = '添加汽车'
        menuTitle.value = '汽车管理'
      }
    }
  }
)

const menuTitle = ref('系统总览')
</script>
