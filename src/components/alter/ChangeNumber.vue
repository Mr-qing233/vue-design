<script setup lang="ts">
import { useBookStore } from '@/stores/bookStore'

const bookStore = useBookStore()
</script>

<template>
  <div class="flex flex-col">
    <div class="">请输入增加/减少数量</div>
    <el-input-number v-model="bookStore.alterNum" />
  </div>
</template>

<style scoped lang="scss"></style>
