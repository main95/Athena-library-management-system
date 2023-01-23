import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { BooksState } from '../types/Books'
import books from '../features/book/slice'

export const store = configureStore({
  reducer: {
    books: books,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = {
  books: BooksState
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
