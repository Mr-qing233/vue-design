<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue'
import type { Book, BookVo, Storage } from '@/utils/interface'
import { addNewBook, getBooks } from '@/api/search'
import {
  ElMessage,
  ElMessageBox,
  ElSlider,
  ElSwitch,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { alterStorageRecord, getAllStorageRecord } from '@/api/storage'
import { useUserStore } from '@/stores/userStore'
import ChangeNumber from '@/components/alter/ChangeNumber.vue'
import { useBookStore } from '@/stores/bookStore'

const dataState = ref<boolean>(false)

const bookColumns = ref([
  { prop: 'bid', label: '书籍编号' },
  { prop: 'bname', label: '书籍名称' },
  { prop: 'author', label: '作者' },
  { prop: 'category', label: '分类' },
  { prop: 'publish', label: '出版商' },
  { prop: 'location', label: '书籍位置' },
  { prop: 'totalQuantity', label: '总库存' },
  { prop: 'stockQuantity', label: '现有库存' }
])

const storageColumns = ref([
  { prop: 'storageId', label: '出入编号' },
  { prop: 'uid', label: '用户id' },
  { prop: 'bid', label: '书籍id' },
  { prop: 'count', label: '数量' }
])

const bookData = ref<Book>()
const storageData = ref<Storage>()

async function getBookData() {
  await getBooks('')
    .then((res) => {
      bookData.value = res.data
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: err.msg
      })
    })
}
async function getStorageData() {
  await getAllStorageRecord()
    .then((res) => {
      storageData.value = res.data
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
  getBookData()
  getStorageData()
})

const userStore = useUserStore()
const bookStore = useBookStore()
async function alterBook(uid: String, bid: String, count: Number) {
  await alterStorageRecord(uid, bid, count)
    .then(() => {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '修改成功'
      })
      bookStore.cleanNum()
      getBookData()
      getStorageData()
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: err.msg
      })
    })
}

function alterBookProcess(uid: String, bid: String) {
  ElMessageBox({
    title: '提示',
    // 使用自定义组件
    message: () => h(ChangeNumber),
    confirmButtonText: '是',
    showCancelButton: true,
    cancelButtonText: '否',
    type: 'warning'
  })
    .then(() => {
      alterBook(uid, bid, bookStore.alterNum)
    })
    .catch(() => {
      bookStore.cleanNum()
      ElMessage({
        showClose: true,
        type: 'warning',
        message: '取消修改'
      })
    })
}

const dialogFormVisible = ref<boolean>(false)
const newBook = ref<BookVo>({
  bid: '0',
  author: undefined,
  bname: undefined,
  category: undefined,
  location: undefined,
  location1: '',
  location2: '',
  publish: undefined,
  stockQuantity: undefined,
  totalQuantity: undefined
})

const options = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' }
]

// 提交事件
async function submitNewBook(book: Book, uid: String) {
  await addNewBook(book, uid)
    .then(() => {
      ElMessage({
        showClose: true,
        type: 'success',
        message: '添加成功'
      })
      dialogFormVisible.value = false
      getBookData()
      getStorageData()
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: err.msg
      })
    })
}

const ruleFormRef = ref<FormInstance>()

function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      newBook.value.stockQuantity = newBook.value.totalQuantity
      newBook.value.location = newBook.value.location1 + '-' + newBook.value.location2
      submitNewBook(newBook.value, userStore.userData.uid)
      formEl.resetFields()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

function cancelForm(formEl: FormInstance | undefined) {
  dialogFormVisible.value = false
  if (!formEl) return
  formEl.resetFields()
}

function checkRange(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('请输入数量'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字'))
    } else {
      if (value <= 0) {
        callback(new Error('数量必须大于0'))
      } else {
        callback()
      }
    }
  }, 100)
}

const rules = reactive({
  author: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  bname: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  category: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  location1: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  location2: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  publish: [{ required: true, message: '请输入对应内容', trigger: 'blur' }],
  totalQuantity: [
    { required: true, message: '请输入对应内容', trigger: 'blur' },
    { validator: checkRange, trigger: 'blur' }
  ]
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex">
      <div class="text-5xl">书库详情</div>
    </div>

    <div class="h-55vh w-75vw mt-3 flex flex-col">
      <el-divider class="my-1" />
      <div class="flex mt-1">
        <el-switch v-model="dataState" active-text="出入库记录" inactive-text="书籍一览" />
        <div class="flex-1"></div>
        <el-button type="success" @click="dialogFormVisible = true">新增书籍</el-button>
      </div>
      <div>
        <el-table
          :data="dataState ? storageData : bookData"
          stripe
          style="width: 100%; height: 50vh"
          class=""
        >
          <el-table-column
            v-for="(item, index) in dataState ? storageColumns : bookColumns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            class="w-full"
            sortable
          />
          <el-table-column
            v-if="dataState == false"
            prop="button"
            label="操作"
            class="w-full"
            sortable
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="alterBookProcess(userStore.userData.uid, scope.row.bid)"
                >调整数目</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="新增书籍"
    :before-close="
      () => {
        resetForm(ruleFormRef)
        dialogFormVisible = false
      }
    "
  >
    <el-form
      label-position="right"
      :model="newBook"
      label-width="5rem"
      class="px-8"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="作者" prop="author">
        <el-input class="w-4/12" v-model="newBook.author" placeholder="请输入作者名字" clearable />
      </el-form-item>
      <el-form-item label="书籍名称" prop="bname">
        <el-input class="w-4/12" v-model="newBook.bname" placeholder="请输入书籍名称" clearable />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input class="w-4/12" v-model="newBook.category" placeholder="请输入分类" clearable />
      </el-form-item>
      <el-form-item label="位置" required>
        <el-col :span="5">
          <el-form-item prop="location1">
            <el-select v-model="newBook.location1" clearable placeholder="请选择书架">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center"><span>-</span></el-col>
        <el-col :span="5">
          <el-form-item prop="location2">
            <el-input v-model="newBook.location2" placeholder="请输入位号" clearable />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="出版社" prop="publish">
        <el-input class="w-4/12" v-model="newBook.publish" placeholder="请输入出版社" clearable />
      </el-form-item>
      <el-form-item label="数量" prop="totalQuantity">
        <el-input
          class="w-4/12"
          v-model.number="newBook.totalQuantity"
          placeholder="请输入入库数量"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm(ruleFormRef)">取消提交</el-button>
        <el-button type="info" @click="resetForm(ruleFormRef)">清空内容</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">确认提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
