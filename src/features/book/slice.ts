import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book, BooksState } from '../../types/Books'

const initialState: BooksState = {
	books: [],
	currentBook: undefined,
}

export const slice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		_setBooks: (state, { payload }: PayloadAction<Book[]>) => {
			state.books = payload
		},
		_setCurrentBook: (state, { payload }: PayloadAction<Book>) => {
			state.currentBook = payload
		},
		_resetBooks: (state) => {
			state.books = []
		},
	},
})

export default slice.reducer
