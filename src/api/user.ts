import request from '@/request'
import type { CheckDto, User } from '@/utils/interface'
import type { Ref, UnwrapRef } from 'vue'

export function submitLogin(check: CheckDto) {
  return request({
    method: 'post',
    url: '/login/user',
    data: check
  })
}

export function checkNameExist(val: String) {
  return request({
    method: 'get',
    url: '/register/nameExist',
    params: {
      uname: val
    }
  })
}

export function submitRegister(user: User) {
  return request({
    method: 'post',
    url: '/register/createUser',
    data: user
  })
}
