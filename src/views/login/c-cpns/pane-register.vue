<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="110px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
      <el-form-item label="再次输入密码" prop="rePassword">
        <el-input v-model="account.rePassword" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="account.email" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import useRegStore from '@/store/register/register'

// 1.定义数据
const account = reactive<{ username: string; password: string; rePassword: string; email: string }>(
  {
    username: '',
    password: '',
    rePassword: '',
    email: ''
  }
)

// 定义验证函数
function validateRePassword(rule, value, callback, account) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== account.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

// 定义校验规则
const accountRules: FormRules = {
  username: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位数字或字母组成~', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字或字母组成~', trigger: 'change' }
  ],
  rePassword: [
    {
      required: true,
      message: '必须再次输入密码~',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => validateRePassword(rule, value, callback, account),
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      type: 'email',
      message: '请输入有效的邮箱地址',
      trigger: 'blur'
    }
  ]
}

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const regStore = useRegStore()
function regAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const username = account.username
      const password = account.password
      const rePassword = account.rePassword
      const email = account.email
      console.log(regStore)
      // 向服务器发送网络请求(携带账号密码)
      regStore.regAccountAction({ username, password, rePassword, email })
    } else {
      ElMessage.error('Oops，请您输入正确的格式后在操作~~.')
    }
  })
}
defineExpose({
  regAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
