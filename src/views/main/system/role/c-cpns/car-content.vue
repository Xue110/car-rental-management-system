<template>
  <div class="car-content">
    <div class="header">
      <h3 class="ti">汽车信息</h3>
      <el-button type="primary" @click="handleNewUserClick">添加汽车</el-button>
    </div>
    <div class="table">
      <el-table :data="carsList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column type="index" label="序号" align="center" width="60px" />
        <el-table-column label="汽车ID" prop="id" align="center" width="130px" />
        <el-table-column label="汽车名称" prop="name" align="center" width="150px" />
        <el-table-column label="汽车图片" prop="image" align="center" width="220px">
          <template #default="{ row }">
            <img :src="row.image" alt="Car name" style="width: 168px; height: auto" />
          </template>
        </el-table-column>
        <el-table-column label="汽车类型" prop="category" align="center" width="140px">
          <template #default="{ row }">
            <el-button v-if="row.category === 1" type="primary" plain>轿车</el-button>
            <el-button v-else-if="row.category === 2" type="success" plain>SUV</el-button>
            <el-button v-else-if="row.category === 3" type="danger" plain>豪华车</el-button>
            <el-button v-else-if="row.category === 4" type="info" plain>MPV</el-button>
            <el-button v-else-if="row.category === 5" type="warning" plain>客车</el-button>
            <el-button v-else>-</el-button>
          </template>
        </el-table-column>
        <el-table-column label="汽车价格" prop="price" align="center" width="140px" />
        <el-table-column align="center" label="加入时间" prop="addTime" width="210px">
          <template #default="scope">
            {{ formatUTC(scope.row.addTime) }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center" width="120px">
          <template #default="{ row }">
            <el-button v-if="row.status === 0" type="primary" plain>空闲中</el-button>
            <el-button v-else-if="row.status === 1" type="success" plain>租赁中</el-button>
            <el-button v-else-if="row.status === 2" type="danger" plain>维修中</el-button>
            <el-button v-else>-</el-button>
          </template>
        </el-table-column>

        <el-table-column #default="scope" label="操作" align="center" width="147px">
          <el-button size="small" icon="Edit" type="primary" text @click="handleEditBtnClick(scope.row)">编辑</el-button>
          <el-button size="small" icon="Delete" type="danger" text
            @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper" :total="carsTotalCount" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useCarStore from '@/store/main/car/car'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 发起action,get请求carsList的数据
const systemStore = useCarStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchCarListData()

// 获取数据，进行展示
const { carsList, carsTotalCount } = storeToRefs(systemStore)

// 页码相关逻辑
function handleSizeChange() {
  fetchCarListData()
}
function handleCurrentChange() {
  fetchCarListData()
}

// 定义函数，用于发送网络请求
function fetchCarListData(formData: any = {}) {
  const size = pageSize.value
  const offset = currentPage.value

  const pageInfo = { size, offset }

  if (Object.keys(formData).length > 0) {
    // 如果 formData 不为空，使用条件分页查询
    systemStore.getCarsListDataAction({ ...pageInfo, ...formData })
  } else {
    // 如果 formData 为空，使用普通分页查询
    systemStore.postCarsListAction(pageInfo)
  }
}

// 删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteCarByIdAction(id)
  console.log('删除操作', id)
}

// 新建用户的操作
function handleNewUserClick() {
  emit('newClick')
  console.log('新建操作')
}
// // 编辑用户的操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
  console.log('编辑操作', itemData)
}
defineExpose({ fetchCarListData })
</script>

<style lang="less" scoped>
.car-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
