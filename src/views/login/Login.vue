<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../../assets/img/login-bg.svg);
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>
