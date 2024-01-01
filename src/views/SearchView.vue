<script setup lang="ts">
import { ref } from 'vue'
import type { Book } from '@/utils/interface'
import { getBooks } from '@/api/search'
import { ElMessage } from 'element-plus'
import { newBorrowRecord } from '@/api/borrow'
import { useUserStore } from '@/stores/userStore'
import { ElMessageBox } from 'element-plus'

const input = ref('')

const columns = ref([
  { prop: 'bid', label: '书籍编号' },
  { prop: 'bname', label: '书籍名称' },
  { prop: 'author', label: '作者' },
  { prop: 'category', label: '分类' },
  { prop: 'publish', label: '出版商' },
  { prop: 'location', label: '书籍位置' },
  { prop: 'totalQuantity', label: '总库存' },
  { prop: 'stockQuantity', label: '现有库存' },
  { prop: 'button', label: '操作' }
])

const booksData = ref<Book>()

async function getBooksData(str: String) {
  await getBooks(str)
    .then((res) => {
      if (res.code == 200) {
        booksData.value = res.data
      }
    })
    .catch((error) => {
      console.log(error.msg)
    })
}

function inputSearch() {
  getBooksData(input.value)
}

function cleanSearch() {
  input.value = ''
  booksData.value = undefined
}

const userStore = useUserStore()

async function addBorrowRecord(bid: String, uid: String) {
  await newBorrowRecord(bid, uid)
    .then((res) => {
      inputSearch()
      console.log(res)
    })
    .catch((error) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: error.msg
      })
    })
}
function borrowBook(bid: String, bname: string) {
  ElMessageBox.confirm('是否确定要借阅《' + bname + '》?', '提示', {
    confirmButtonText: '是',
    cancelButtonText: '否',
    type: 'warning'
  })
    .then(() => {
      if (userStore.userData.uid != undefined) {
        addBorrowRecord(bid, userStore.userData.uid)
      }
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        type: 'warning',
        message: '取消借阅'
      })
    })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="text-5xl text-center">书籍检索服务</div>
    <div class="text-center mt-4">
      <el-input v-model="input" placeholder="请输入搜索内容" clearable class="h-10 w-20r">
        <template #append>
          <el-button type="primary" @click="inputSearch()">开始搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="h-55vh w-75vw mt-3 flex flex-col" v-if="booksData">
      <div class="flex">
        <div class="">搜索结果</div>
        <div class="flex-1"></div>
        <el-button type="danger" @click="cleanSearch()">清空结果</el-button>
      </div>
      <el-divider class="my-1" />
      <div>
        <el-table :data="booksData" stripe style="width: 100%; height: 50vh" class="">
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            class="w-full"
            sortable
          >
            <template v-if="item.prop == 'button'" #default="scope">
              <el-button
                v-if="scope.row.stockQuantity > 0"
                type="primary"
                size="small"
                @click="borrowBook(scope.row.bid, scope.row.bname)"
                >借阅</el-button
              >
              <el-tooltip v-else content="当前库存为空" effect="light" placement="top">
                <el-button type="primary" size="small" disabled>借阅</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
