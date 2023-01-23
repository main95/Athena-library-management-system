import { createBookApi, deleteBookApi, getBookByIdApi, getBooksApi, updateBookApi } from '../../api/apiCalls'
import { AppThunk } from '../../app/store'
import { Book } from '../../types/Books'
import { slice } from './slice'

const getBooksAction = (): AppThunk => dispatch => {
	getBooksApi().then(
		(res: any) => {
			res && dispatch(slice.actions._setBooks(res.results))
		}
	).catch(error => console.log(error))
}

const getBookByIdAction = (bookId: string): AppThunk => (dispatch, getState) => {
	const state = getState()
	getBookByIdApi(bookId).then(
		book => book && dispatch(slice.actions._setCurrentBook(book))
	).catch(error => console.log(error))
}

const createBookAction = (newBook: Book): AppThunk => dispatch => {
	createBookApi(newBook).then(newBook => {
		// newBook && history.push(`/admin?selectedTab=stores`)
	}).catch(error => console.log(error))
}

const updateBookAction = (book: Book): AppThunk => dispatch => {
	updateBookApi(book).then().catch(error => console.log(error))
}

const deleteBookAction = (bookId: string): AppThunk => dispatch => {
	deleteBookApi(bookId).then(newBook => {
		// newBook && history.push(`/admin?selectedTab=stores`)
	}).catch(error => console.log(error))
}

const booksActions = {
	...slice.actions,
	getBooksAction,
	getBookByIdAction,
	createBookAction,
	updateBookAction,
	deleteBookAction,
}

export default booksActions

