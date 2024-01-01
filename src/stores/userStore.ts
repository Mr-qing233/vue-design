import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { User } from '@/utils/interface'

export const useUserStore = defineStore('userData', () => {
  //state
  const userData = ref<User>({
    uid: undefined,
    uname: undefined,
    birthday: undefined,
    phone: undefined,
    email: undefined,
    privilege: undefined
  })

  return {
    userData
  }
})
