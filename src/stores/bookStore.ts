import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('bookData', () => {
  const alterNum = ref<number>(0)

  function cleanNum() {
    alterNum.value = 0
  }

  return {
    alterNum,
    cleanNum
  }
})
