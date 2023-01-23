export type BookStatus = 'in'| 'out'

export type BookType = 'fiction' | 'nonFiction'

export type Book = {
  id: string,
  title: string,
  status: BookStatus,
  type: BookType,
  authorName: string,
  authorSurname: string,
}

export type BooksTableHeader = {
  _id: keyof Book | '',
  label?: string,
  alignRight?: boolean
}

export type BooksState = {
  books: Book[],
  currentBook: Book | undefined,
}
