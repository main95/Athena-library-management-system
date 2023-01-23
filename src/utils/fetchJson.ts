import { HttpError, HttpErrorCode } from '../types/model'

export const isHttpError = (error: unknown): error is HttpError =>
	typeof error === 'object' &&
	error !== null &&
	'status' in error &&
	'message' in error &&
	'internalUrl' in error &&
	'origin' in error &&
	'externalUrl' in error


const decodeStatus = (status: string | number): HttpErrorCode => {
	const statusNumber = Number(status)
	switch (statusNumber) {
		case 400:
		case 401:
		case 403:
		case 404:
		case 405:
		case 408:
		case 500:
			return statusNumber
		default:
			return 500
	}
}

const SUCCESS_CODES = [200, 201]

export const getCommonHeaders = () => {
	const token = ''
	const lang = ''
	const storeId = ''
	const sessionId = ''

	return {
		accept: 'application/json',
		'Content-type': 'application/json',
		authorization: `Bearer ${token}`,
		lang: lang || 'en-US',
		'x-store': storeId || '0',
		'session-id': sessionId,
	}
}

export const decodeResMayNotBeJson = async <T>(
	res: Response,
	typeGuard: (x: any) => x is T,
): Promise<T | HttpError> => {
	const dataText = await res.text()

	let data: string | T = dataText
	let decodeErrorMessage = ''
	try {
		data = JSON.parse(dataText)
	} catch (e) {
		decodeErrorMessage = `The response ${dataText} is not a valid JSON`
	}

	if (
		SUCCESS_CODES.includes(res.status) &&
		!decodeErrorMessage &&
		typeGuard(data)
	) {
		return data
	}

	const httpError: HttpError = {
		status: SUCCESS_CODES.includes(res.status) ? 500 : decodeStatus(res.status),
		message: [res.statusText, data, decodeErrorMessage]
			.filter(a => a)
			.join(' - '),
		internalUrl: res.url,
		externalUrl: '',
		origin: 'internal-api',
		stack: '',
	}
	return httpError
}

export const fetchJson = <T = void>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<T> => {
	return window
		.fetch(
			input,
			Object.assign(
				{
					headers: getCommonHeaders(),
				},
				init || {},
			),
		)
		.then(res => {
			return res.json()
		})
		.catch((error: unknown) => {
			return error as any
		})
}
