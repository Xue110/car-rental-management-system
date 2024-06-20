<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" label-width="70px" size="large" status-icon ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import adminUseLoginStore from '@/store/login/adminLogin'

// 1.定义数据
const account = reactive<{ username: string; password: string }>({
  username: localStorage.getItem('username') ?? '',
  password: localStorage.getItem('password') ?? ''
})

// 定义校验规则
const accountRules: FormRules = {
  username: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位数字或字母组成~', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字或字母组成~', trigger: 'change' }
  ]
}

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const username = account.username
      const password = account.password

      // 向服务器发送网络请求(携带账号密码)
      loginStore.loginAccountAction({ username, password }).then((res) => {
        if (isRemPwd) {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
        } else {
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
      })
    } else {
      ElMessage.error('Oops，请您输入正确的格式后在操作~~.')
    }
  })
}
const adminLoginStore = adminUseLoginStore()
function adminLoginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const username = account.username
      const password = account.password

      // 向服务器发送网络请求(携带账号密码)
      adminLoginStore.adminLoginAccountAction({ username, password }).then((res) => {
        if (isRemPwd) {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
        }
      })
    } else {
      ElMessage.error('Oops，请您输入正确的格式后在操作~~.')
    }
  })
}
defineExpose({
  loginAction,
  adminLoginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
