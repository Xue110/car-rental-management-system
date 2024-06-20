<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">汽车租赁管理系统</h2>
    </div>

    <div class="menu">
      <el-menu :collapse="isFold" :default-openeds="['1']" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <!-- 1.系统总览 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>信息列表</span>
          </template>
          <el-menu-item @click="handleMenuClick('/message/car-message')" :class="{ 'is-active': activeIndex === '1' }">
            租赁信息
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const activeIndex = ref('1') // 默认激活的菜单项索引为'1'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

function handleMenuClick(path) {
  router.push(path)
  if (path === '/message/car-message') {
    activeIndex.value = '1'
  }
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 20px;
    font-weight: 800;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
    background-color: #0a61bd4f;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
