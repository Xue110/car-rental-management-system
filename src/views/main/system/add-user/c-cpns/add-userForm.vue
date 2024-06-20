<template>
  <div class="form">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名" prop="username" size="large">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="name" size="large">
        <el-input v-model="form.name" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="large">
        <el-input v-model="form.password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email" size="large">
        <el-input v-model="form.email" placeholder="请输入用户邮箱" />
      </el-form-item>
      <el-form-item label="用户性别" prop="gender" size="large">
        <el-select v-model="form.gender" placeholder="请选择用户性别">
          <el-option
            v-for="item in entireGender"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择车辆" prop="carId" size="large">
        <el-select v-model="form.carId" placeholder="请选择车辆" style="width: 100%">
          <template v-for="item in entireCars" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="租用天数" prop="time" size="large">
        <el-input-number v-model="form.time" :min="1" style="width: 100%" />
      </el-form-item>
      <el-form-item>
        <el-button class="add" type="primary" @click="onSubmit" size="large">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const entireGender = [
  { id: 0, name: '男' },
  { id: 1, name: '女' }
]

const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireCars } = storeToRefs(mainStore)
const editData = ref()

const form = reactive({
  username: '',
  name: '',
  password: '',
  email: '',
  gender: '',
  carId: '',
  time: 0
})

function onSubmit() {
  // 提交表单数据
  const currentTime = Date.now()
  const timeInMs = form.time * 24 * 60 * 60 * 1000
  const endTime = new Date(currentTime + timeInMs)
  const state = 0
  // TODO: 处理确认按钮点击事件

  console.log('开始时间:', new Date(currentTime))
  console.log('结束时间:', endTime)
  console.log('状态:', state)
  const data = reactive<any>({
    username: form.username,
    name: form.name,
    password: form.password,
    email: form.email,
    gender: form.gender,
    carId: form.carId,
    time: form.time,
    beginTime: new Date(formatUTC(new Date(currentTime).toISOString())),
    endTime: new Date(formatUTC(endTime.toISOString())),
    status: state
  })
  console.log(data)
  systemStore.newUserDataAction(data)
}
</script>

<style lang="less" scoped>
/* 这里可以添加你的样式 */
.form {
  padding: 0 20px;
}

.add {
  width: 600px;
}

::v-deep .el-form-item__label {
  color: rgb(23, 170, 133);
  font-size: 18px;
  font-weight: 800;
}
</style>
