export type ErrorOrigin =
	| 'internal-api'
	| 'internal-ui'
	| 'external'
	| 'WCS'
	| 'unknown' // TODO: add types as needed

export type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 408 | 500

export interface HttpError {
	status: HttpErrorCode
	stack: string
	message: string
	internalUrl: string
	externalUrl: string
	origin: ErrorOrigin
	nonBlockingErrorKey?: string
}

export interface RecordedHttpError extends HttpError {
	id: string
}
