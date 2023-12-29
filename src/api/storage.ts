import request from '@/request'

export function getAllStorageRecord() {
  return request({
    method: 'get',
    url: '/storage/showAll'
  })
}

export function alterStorageRecord(uid: String, bid: String, count: Number) {
  return request({
    method: 'post',
    url: '/storage/newStorage',
    params: {
      uid: uid,
      bid: bid,
      count: count
    }
  })
}
