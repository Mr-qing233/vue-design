import request from '@/request'

export function newBorrowRecord(bid: String, uid: String) {
  return request({
    method: 'post',
    url: '/borrow/saveRecord',
    data: {
      bid: bid,
      uid: uid,
      state: 0
    }
  })
}

export function findAllBorrowRecord(uid: String) {
  return request({
    method: 'get',
    url: '/borrowVo/userRecord',
    params: {
      uid: uid
    }
  })
}

export function findBorrowNotReturn(uid: String) {
  return request({
    method: 'get',
    url: '/borrowVo/notReturn',
    params: {
      uid: uid
    }
  })
}

export function borrowReturn(borrowId: Number) {
  return request({
    method: 'post',
    url: '/borrow/return',
    params: {
      borrowId: borrowId
    }
  })
}
