<template>
  <div class="content">
    <div class="header">
      <h3 class="ti">用户信息</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column type="index" label="序号" align="center" width="60px" />
        <el-table-column label="用户ID" prop="id" align="center" width="130px" />
        <el-table-column label="用户名" prop="name" align="center" width="150px" />
        <el-table-column label="性别" prop="gender" align="center" width="130px">
          <template #default="{ row }">
            <span>{{ row.gender === 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="汽车ID" prop="carId" align="center" width="140px" />
        <el-table-column align="center" label="开始时间" prop="beginTime" width="200px">
          <template #default="scope">
            {{ formatUTC(scope.row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间" prop="endTime" align="center" width="200px">
          <template #default="scope">
            {{ formatUTC(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" prop="status" align="center" width="140px">
          <template #default="{ row }">
            <el-button v-if="row.status === 0" type="primary" plain>租赁中</el-button>
            <el-button v-else-if="row.status === 1" type="success" plain>已归还</el-button>
            <el-button v-else-if="row.status === 2" type="danger" plain>已逾期</el-button>
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
        layout="total, sizes, prev, pager, next, jumper" :total="usersTotalCount" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 发起action,get请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 获取数据，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 页码相关逻辑
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = currentPage.value

  const pageInfo = { size, offset }

  if (Object.keys(formData).length > 0) {
    // 如果 formData 不为空，使用条件分页查询
    systemStore.getUsersListDataAction({ ...pageInfo, ...formData })
  } else {
    // 如果 formData 为空，使用普通分页查询
    systemStore.postUsersListAction(pageInfo)
  }
}

// 删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

// 新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}
// 编辑用户的操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
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
