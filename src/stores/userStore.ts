import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { User } from '@/utils/interface'

export const useUserStore = defineStore('userData', () => {
  //state
  const userData = reactive<User>({
    uid: '100000000',
    uname: 'test',
    birthday: '1999-09-01',
    phone: '11219038213',
    email: 'test@qq.com',
    privilege: 1
  })

  return {
    userData
  }
})
