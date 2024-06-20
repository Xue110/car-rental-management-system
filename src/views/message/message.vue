<template>
  <div class="message">
    <el-container class="message-content">
      <el-aside :width="isFold ? '60px' : '240px'">
        <message-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <message-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageMenu from '@/components/message-menu/message-menu.vue'
import MessageHeader from '@/components/message-header/message-header.vue'

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.message {
  height: 100%;
}

.message-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
