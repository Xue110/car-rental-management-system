<template>
  <div class="form">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="汽车名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入汽车名称" />
      </el-form-item>
      <el-form-item label="汽车图片" prop="image">
        <el-input v-model="form.image" placeholder="请输入汽车图片路径" />
      </el-form-item>
      <el-form-item label="汽车类别" prop="category">
        <el-select v-model="form.category" placeholder="请选择车辆类别" style="width: 100%">
          <template v-for="item in entireCategorys" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="汽车价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入汽车价格" />
      </el-form-item>
      <el-form-item>
        <el-button class="add" type="primary" @click="onSubmit" size="large">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useCarStore from '@/store/main/car/car'
import useMainStore from '@/store/main/main'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const mainStore = useMainStore()
const systemStore = useCarStore()
const { entireCars } = storeToRefs(mainStore)

const form = reactive({
  name: '',
  image: '',
  price: '',
  category: ''
})

const entireCategorys = [
  { id: 1, name: '轿车' },
  { id: 2, name: 'SUV' },
  { id: 3, name: '豪华车' },
  { id: 4, name: 'MPV' },
  { id: 5, name: '客车' }
]
function onSubmit() {
  // 提交表单数据
  const currentTime = Date.now()
  const state = 0
  // TODO: 处理确认按钮点击事件

  console.log('加入时间:', new Date(currentTime))
  console.log('状态:', state)
  const data = reactive<any>({
    name: form.name,
    image: form.image,
    price: form.price,
    category: form.category,
    addTime: new Date(formatUTC(new Date(currentTime).toISOString())),
    status: state
  })
  console.log(data)
  systemStore.newCarDataAction(data)
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
  color: rgb(216, 64, 4);
  font-size: 18px;
  font-weight: 800;
}
</style>
