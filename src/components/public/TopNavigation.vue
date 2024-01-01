<script setup lang="ts">
import { ref } from 'vue'
import { type RouteRecordName, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()

const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const searchType = ref('')

const menuElement = ref([
  {
    title: '书籍检索',
    toName: 'search'
  },
  {
    title: '书籍借阅',
    toName: 'borrow'
  }
])

function goPage(Page: RouteRecordName) {
  router.push({
    name: Page
  })
}

const userStore = useUserStore()

function cancelLogin() {
  window.localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="(elem, index) in menuElement"
      :key="index"
      :index="elem.toName"
      @click="goPage(elem.toName)"
    >
      <template #title>{{ elem.title }}</template>
    </el-menu-item>
    <el-menu-item @click="goPage('storage')" v-if="userStore.userData.privilege == 1">
      <template #title>出入库管理</template>
    </el-menu-item>
    <!-- 中间栏-分割左对齐组件与右对齐组件 -->
    <div class="flex-grow" />
    <div class="searchBar">
      <el-input
        v-model="searchType"
        class="w-50 m-2"
        placeholder="Type Your Problem"
        suffix-icon="Search"
      />
    </div>
    <div class="h-full flex items-center mr-5r">
      <el-button @click="cancelLogin()">退出登录</el-button>
    </div>

    <!--    <div class="wrapImg">-->
    <!--      <img class="avatar" src="../../assets/icon/avatar.jpg" alt="" />-->
    <!--    </div>-->
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  display: flex;
  height: var(--top-nav-height);
  padding-left: 10px;
  background-color: var(--sidebar-color);
  color: var(--text-color);
  gap: 10px;
  transition: background-color 500ms ease;
}
.flex-grow {
  flex-grow: 1;
}
.wrapImg {
  display: flex;
  margin-right: 30px;
  justify-items: center;
  align-items: center;
}
.avatar {
  min-width: 50px;
  min-height: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 3px solid rgb(188, 188, 188);
}

.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 20px;
}
:deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--search-bar-border, var(--search-bar-border)) inset;
  background-color: var(--search-bar-background);
}
:deep(.el-input__inner) {
  color: var(--search-bar-input-color);
}
:deep(input::-webkit-input-placeholder) {
  color: var(--search-bar-placeholder-color);
}
.el-sub-menu .el-sub-menu__icon-arrow {
  display: none;
}
//样式穿透
:deep(.el-sub-menu__title) {
  padding-right: 20px;
}
:deep(.el-menu-item) {
  font-weight: 800;
  color: #595959;
  padding: 0 10px 0 10px;
}
</style>
