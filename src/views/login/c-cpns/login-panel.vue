<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">汽车租赁管理系统</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登录 -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>

        <!-- 账号注册 -->
        <el-tab-pane label="账号注册" name="register">
          <template #label>
            <div class="label">
              <el-icon>
                <FolderAdd />
              </el-icon>
              <span class="text">账号注册</span>
            </div>
          </template>
          <pane-register ref="regRef"></pane-register>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox :class="{ active: activeName === 'register' }" v-model="isRemPwd" label="记住密码" size="large" />
      <el-link :class="{ active: activeName === 'register' }" type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn" :class="{ active: activeName === 'register' }" style="margin-top: 0">
      <el-button class="login-btn" type="primary" size="large" @click="handleLoginUser">
        用户登录
      </el-button>
      <el-button class="login-btn login-btn1" type="success" size="large" @click="handleLoginAdmin">
        管理员登录
      </el-button>
    </div>
    <div class="login-btn2" :class="{ active: activeName === 'account' }" style="margin-top: 0">
      <el-button class="login-btn2" type="primary" size="large" @click="handleRegUser">
        用户注册
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from './panel-account.vue'
import PaneRegister from './pane-register.vue'
const activeName = ref('account')
const isRemPwd = ref<boolean>(localStorage.getItem('isRemPwd') === 'true' || false)
watch(isRemPwd, (newValue) => {
  localStorage.setItem('isRemPwd', newValue.toString())
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const regRef = ref<InstanceType<typeof PaneRegister>>()

function handleLoginUser(isRemPwd) {
  accountRef.value?.loginAction(isRemPwd)
}

function handleLoginAdmin(isRemPwd) {
  accountRef.value?.adminLoginAction(isRemPwd)
}

function handleRegUser() {
  regRef.value?.regAction()
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 430px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }
}

.controls {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.login-btn {
  margin-top: 10px;
  width: 70%;
}

.login-btn1 {
  position: relative;
  bottom: 50px;
  left: 70%;
}

.login-btn2 {
  margin-top: 10px;
  width: 100%;
}

.active {
  display: none;
}
</style>
