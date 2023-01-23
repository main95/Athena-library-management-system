import { createBookApi, deleteBookApi, getBookByIdApi, getBooksApi, updateBookApi } from '../../api/apiCalls'
import { AppThunk } from '../../app/store'
import { Book } from '../../types/Books'
import { slice } from './slice'

const getBooksAction = (): AppThunk => dispatch => {
	getBooksApi().then(
		books => books && dispatch(slice.actions._setBooks(books))
	).catch(error => console.log(error))
}

const getBookByIdAction = (bookId: string): AppThunk => (dispatch, getState) => {
	const state = getState()
	getBookByIdApi(bookId).then(
		book => book && dispatch(slice.actions._setCurrentBook(book))
	).catch(error => console.log(error))
}

const createStoreAction = (newBook: Book): AppThunk => dispatch => {
	createBookApi(newBook).then(newBook => {
		// newBook && history.push(`/admin?selectedTab=stores`)
	}).catch(error => console.log(error))
}

const updateStoreAction = (book: Book): AppThunk => dispatch => {
	updateBookApi(book).then().catch(error => console.log(error))
}

const deleteStoreAction = (bookId: string): AppThunk => dispatch => {
	deleteBookApi(bookId).then(newBook => {
		// newBook && history.push(`/admin?selectedTab=stores`)
	}).catch(error => console.log(error))
}

const storesActions = {
	...slice.actions,
	getBooksAction,
	getBookByIdAction,
	createStoreAction,
	updateStoreAction,
	deleteStoreAction,
}

export default storesActions
