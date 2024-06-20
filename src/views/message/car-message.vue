<template>
  <div class="car-message">
    <div class="header">
      <h3 class="ti">租赁信息</h3>
      <el-button type="success">这是您当前的租赁信息列表</el-button>
    </div>
    <div class="table">
      <el-table :data="Array.isArray(entireMessageInfos)
          ? entireMessageInfos
          : entireMessageInfos
            ? [entireMessageInfos]
            : []
        " border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column type="index" label="序号" align="center" width="60px" />
        <el-table-column label="用户名" prop="username" align="center" width="120px" />
        <el-table-column label="汽车名称" prop="name" align="center" width="120px" />
        <el-table-column label="汽车图片" prop="image" align="center" width="220px">
          <template #default="{ row }">
            <img :src="row.image" alt="Car name" style="width: 168px; height: auto" />
          </template>
        </el-table-column>
        <el-table-column label="汽车价格" prop="price" align="center" width="120px" />
        <el-table-column align="center" label="开始时间" prop="beginTime" width="180px">
          <template #default="scope">
            {{ formatUTC(scope.row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间" prop="endTime" align="center" width="180px">
          <template #default="scope">
            {{ formatUTC(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center" width="140px">
          <template #default="{ row }">
            <el-button v-if="row.status === 0" type="primary" plain>租赁中</el-button>
            <el-button v-else-if="row.status === 1" type="success" plain>已归还</el-button>
            <el-button v-else-if="row.status === 2" type="danger" plain>已超时</el-button>
            <el-button v-else>-</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="147px">
          <el-button size="small" icon="Edit" type="primary" text @click="handleEditBtnClick()">续租</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMessageStore from '@/store/message/message'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'

const MessageStore = useMessageStore()
MessageStore.fetchMessageDataAction()
const { entireMessageInfos } = storeToRefs(MessageStore)
console.log(entireMessageInfos)
function handleEditBtnClick() {
  alert('暂不支持该功能')
}
</script>

<style lang="less" scoped>
.car-message {
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
