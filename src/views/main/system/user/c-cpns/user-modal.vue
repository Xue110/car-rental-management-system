<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入用户邮箱" />
          </el-form-item>
          <el-form-item label="用户性别" prop="gender">
            <el-select v-model="formData.gender" placeholder="请选择用户性别">
              <el-option v-for="item in entireGender" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择车辆" prop="carId">
            <el-select v-model="formData.carId" placeholder="请选择车辆" style="width: 100%">
              <template v-for="item in entireCars" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="租用天数" prop="time">
            <el-select v-model="formData.time" placeholder="请选择租用天数" style="width: 100%">
              <template v-for="item in entireTimes" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { reactive, ref, defineExpose } from 'vue'

const entireGender = [
  { id: 0, name: '男' },
  { id: 1, name: '女' }
]

const entireTimes = [
  { id: 1, name: '1天' },
  { id: 2, name: '2天' },
  { id: 3, name: '3天' },
  { id: 4, name: '4天' },
  { id: 5, name: '5天' },
  { id: 6, name: '6天' },
  { id: 7, name: '7天' },
  { id: 8, name: '8天' },
  { id: 9, name: '9天' },
  { id: 10, name: '10天' }
]

// 定义内部的属性
const formData = reactive<any>({
  username: '',
  name: '',
  password: '',
  email: '',
  gender: '',
  carId: '',
  time: '',
  status: ''
})
const isNewRef = ref(true)
const editData = ref()

const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireCars } = storeToRefs(mainStore)
console.log(entireCars)
const dialogVisible = ref(false)

function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (itemData) {
    editData.value = itemData
  } else {
    editData.value = ''
  }
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

function handleConfirmClick() {
  dialogVisible.value = false

  const currentTime = Date.now()
  const timeInMs = formData.time * 24 * 60 * 60 * 1000
  const endTime = new Date(currentTime + timeInMs)
  const state = 0
  // TODO: 处理确认按钮点击事件

  console.log('开始时间:', new Date(currentTime))
  console.log('结束时间:', endTime)
  console.log('状态:', state)
  const data = reactive<any>({
    id: editData.value.id,
    username: formData.username,
    name: formData.name,
    password: formData.password,
    email: formData.email,
    gender: formData.gender,
    carId: formData.carId,
    time: formData.time,
    beginTime: new Date(formatUTC(new Date(currentTime).toISOString())),
    endTime: new Date(formatUTC(endTime.toISOString())),
    status: state
  })
  console.log(data)
  if (!isNewRef.value) {
    console.log('我要开始执行编辑用户功能了')
    systemStore.editUserDdataAction(data)
    console.log('我编辑成功了吗？？？？')
  } else {
    //创建新的用户
    console.log('我要开始执行新建用户功能了')
    systemStore.newUserDataAction(data)
    console.log('我新建成功了吗？？？？')
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
