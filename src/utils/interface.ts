type Book = {
  bid: String | undefined
  bname: String | undefined
  author: String | undefined
  category: String | undefined
  publish: String | undefined
  location: String | undefined
  totalQuantity: Number | undefined
  stockQuantity: Number | undefined
}

type BookVo = {
  bid: String | undefined
  bname: String | undefined
  author: String | undefined
  category: String | undefined
  publish: String | undefined
  location: String | undefined
  location1: String | undefined
  location2: String | undefined
  totalQuantity: Number | undefined
  stockQuantity: Number | undefined
}

type User = {
  uid?: String
  uname?: String
  password?: String
  birthday?: String
  phone?: String
  email?: String
  privilege?: number
}

type Borrow = {
  borrowId: String
  bname: String
  uname: String
  borrowDate: String
  returnDate: String
  state: Number
}

type Storage = {
  storageId: Number
  uid: String
  bid: String
  count: Number
}

type CheckDto = {
  uid: String
  password: String
}

export type { Book, BookVo, User, Borrow, Storage, CheckDto }
