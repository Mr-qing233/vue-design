<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Borrow } from '@/utils/interface'
import { useUserStore } from '@/stores/userStore'
import { borrowReturn, findAllBorrowRecord, findBorrowNotReturn } from '@/api/borrow'
import { ElMessage, ElMessageBox } from 'element-plus'

const dataState = ref<boolean>(true)

const columns = ref([
  { prop: 'borrowId', label: '借阅编号' },
  { prop: 'bname', label: '书籍名称' },
  { prop: 'borrowDate', label: '借出日期' },
  { prop: 'returnDate', label: '归还日期' },
  { prop: 'state', label: '状态' }
])

const borrowData = ref<Borrow>()
const borrowNotReturnData = ref<Borrow>()
const userStore = useUserStore()

async function getBorrowData() {
  if (userStore.userData.uid != undefined)
    await findAllBorrowRecord(userStore.userData.uid)
      .then((res) => {
        borrowData.value = res.data
      })
      .catch((err) => {
        ElMessage({
          showClose: true,
          type: 'error',
          message: err.msg
        })
      })
}

async function getBorrowNotReturn() {
  if (userStore.userData.uid != undefined)
    await findBorrowNotReturn(userStore.userData.uid)
      .then((res) => {
        borrowNotReturnData.value = res.data
      })
      .catch((err) => {
        ElMessage({
          showClose: true,
          type: 'error',
          message: err.msg
        })
      })
}

onMounted(() => {
  getBorrowData()
  getBorrowNotReturn()
})

async function returnBook(borrowId: Number) {
  await borrowReturn(borrowId)
    .then(() => {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '归还成功'
      })
      getBorrowData()
      getBorrowNotReturn()
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: err.msg
      })
    })
}

function returnProcess(borrowId: Number, bname: String) {
  ElMessageBox.confirm('是否确定要归还《' + bname + '》?', '提示', {
    confirmButtonText: '是',
    cancelButtonText: '否',
    type: 'warning'
  })
    .then(() => {
      returnBook(borrowId)
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        type: 'warning',
        message: '取消归还'
      })
    })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="text-5xl">借阅记录</div>
    <div class="h-55vh w-75vw mt-3 flex flex-col">
      <div>
        <el-switch v-model="dataState" active-text="全部记录" inactive-text="仅未归还" />
      </div>
      <el-divider class="my-1" />
      <div>
        <el-table
          :data="dataState ? borrowData : borrowNotReturnData"
          stripe
          style="width: 100%; height: 50vh"
          class=""
        >
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            class="w-full"
            sortable
          >
            <template v-if="item.prop == 'state'" #default="scope">
              <el-text type="success" v-if="scope.row.state == 1">已归还</el-text>
              <el-text type="warning" v-else-if="scope.row.state == 0">未归还</el-text>
              <el-text type="danger" v-else-if="scope.row.state == 2">已逾期</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="button" label="操作" class="w-full" sortable>
            <template #default="scope">
              <el-button
                v-if="scope.row.state != 1"
                type="primary"
                size="small"
                @click="returnProcess(scope.row.borrowId, scope.row.bname)"
                >归还</el-button
              >
              <el-tooltip v-else content="已经归还" effect="light" placement="top">
                <el-button type="primary" size="small" disabled>归还</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--        <el-table v-else :data="borrowData" stripe style="width: 100%; height: 50vh" class=""></el-table>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
