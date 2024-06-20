<template>
  <div class="car-search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="汽车ID" prop="id">
            <el-input v-model="searchForm.id" placeholder="请输入查询的汽车ID" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汽车名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的汽车名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汽车类型" prop="category">
            <el-select v-model="searchForm.category" placeholder="请选择车辆" style="width: 100%">
              <template v-for="item in entireCategorys" :key="item.category">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前状态" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择查询的状态" style="width: 100%">
              <el-option label="租赁中" :value="1" />
              <el-option label="空闲中" :value="0" />
              <el-option label="维修中" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const entireCategorys = [
  { id: 1, name: '轿车' },
  { id: 2, name: 'SUV' },
  { id: 3, name: '豪华车' },
  { id: 4, name: 'MPV' },
  { id: 5, name: '客车' }
]
// 定义查询数据
const searchForm = reactive({
  id: '',
  name: '',
  status: '',
  category: ''
})

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

// 查询操作
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.car-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
