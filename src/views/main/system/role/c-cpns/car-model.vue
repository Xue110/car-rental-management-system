<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建汽车' : '编辑汽车'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="汽车名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入汽车名称" />
          </el-form-item>
          <el-form-item label="汽车图片" prop="image">
            <el-input v-model="formData.image" placeholder="请输入汽车图片路径" />
          </el-form-item>
          <el-form-item label="汽车类型" prop="category">
            <el-select v-model="formData.category" placeholder="请选择车辆类别" style="width: 100%">
              <template v-for="item in entireCategorys" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="汽车价格" prop="price">
            <el-input v-model="formData.price" placeholder="请输入汽车价格" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from 'vue'
import useCarStore from '@/store/main/car/car'
import useMainStore from '@/store/main/main'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { entireCars } = storeToRefs(mainStore)

const formData = reactive({
  name: '',
  image: '',
  price: '',
  category: ''
})

const isNewRef = ref(true)
const editData = ref()
const dialogVisible = ref(false)

const systemStore = useCarStore()

const entireCategorys = [
  { id: 1, name: '轿车' },
  { id: 2, name: 'SUV' },
  { id: 3, name: '豪华车' },
  { id: 4, name: 'MPV' },
  { id: 5, name: '客车' }
]

function setModalVisible(isNew = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (itemData) {
    editData.value = itemData
  } else {
    editData.value = ''
  }
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key] || ''
    }
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

function cancel() {
  dialogVisible.value = false
}

function confirm() {
  dialogVisible.value = false
  const currentTime = Date.now()
  const state = 0

  const data = {
    id: editData.value.id,
    name: formData.name,
    image: formData.image,
    price: formData.price,
    category: formData.category,
    addTime: new Date(formatUTC(new Date(currentTime).toISOString())),
    status: state
  }
  console.log('我看看我都传的啥数据', data)
  if (!isNewRef.value) {
    systemStore.editCarDdataAction(data)
  } else {
    systemStore.newCarDataAction(data)
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
