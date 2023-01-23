import config from '../config'
import { Book } from '../types/Books'
import { fetchJson } from '../utils/fetchJson'

export const getBooksApi = () =>
	fetchJson<Book[]>(
		`${config.apiUrl}/${config.routes.book}/getBooks`,
		{},
	)

export const getBookByIdApi = (bookId: string) =>
	fetchJson<Book>(
		`${config.apiUrl}/${config.routes.book}/getBook/${bookId}`,
		{},
	)

export const createBookApi = (book: Book) =>
	fetchJson<Book>(
		`${config.apiUrl}/${config.routes.book}/manageBook`,
		{
			method: 'POST',
			body: JSON.stringify(book),
		},
	)

export const updateBookApi = (book: Book) =>
	fetchJson<Book>(
		`${config.apiUrl}/${config.routes.book}/manageBook`,
		{
			method: 'PUT',
			body: JSON.stringify(book),
		},
	)

export const deleteBookApi = (bookId: string) =>
	fetchJson<Book>(
		`${config.apiUrl}/${config.routes.book}/manageBook/${bookId}`,
		{
			method: 'DELETE',
		},
	)