import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Book } from '../../types/Books'

export const selectBooks = (state: RootState): Book[] => {
	return state.books.books
}

export const selectStoreByStoreId =
	(storeId: string) =>
	(state: RootState): Book[] | undefined => {
		return state.books.books
	}
