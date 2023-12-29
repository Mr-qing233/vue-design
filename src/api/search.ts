import request from '@/request'
import type { Book } from '@/utils/interface'

export function getBooks(str: String) {
  return request({
    method: 'get',
    url: '/book/findAllColumn',
    params: {
      contain: str
    }
  })
}

export function addNewBook(book: Book, uid: String) {
  return request({
    method: 'post',
    url: '/book/newBook/' + uid,
    data: book
  })
}
