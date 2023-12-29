<script setup lang="ts">
import BottomFooter from '@/components/public/BottomFooter.vue'
import TopNavigation from '@/components/public/TopNavigation.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopNavigation></TopNavigation>
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
      <el-footer>
        <BottomFooter></BottomFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss">
// 重复使用的样式
:root {
  // 颜色
  --footer-color: #d2d9dd;
  --sidebar-color: #fff;
  --text-color: #707070;

  --search-bar-background: #ffffff;
  --search-bar-border: #dcdfe6;
  --search-bar-placeholder-color: #a8abb2;
  --search-bar-input-color: #606266;
}
.common-layout {
  min-height: 100vh;
  background-color: var(--body-color);
  transition: all 500ms ease;
}
.el-header {
  padding: 0;
  z-index: 999;
  position: sticky;
  top: 0;

  --top-nav-height: 65px;
}

.el-main {
  --el-main-padding: 1rem 0rem;
  min-height: calc(100vh - 10.9rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.el-footer {
  --el-footer-padding: 0px;
  width: 100%;
}
</style>
