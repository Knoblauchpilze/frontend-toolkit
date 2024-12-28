import type { ApiResponse } from './apiResponse.js';

export enum ApiFailure {
	NONE = 0,
	UNKNOWN_ERROR = 1,

	BAD_REQUEST = 10,
	NOT_FOUND = 11,

	SERVICE_UNAVAILAVLE = 20,

	NOT_AUTHENTICATED = 50,
	API_KEY_EXPIRED = 51,
	NO_SUCH_USER = 52,
	INVALID_CREDENTIALS = 53,
	INVALID_REGISTRATION_DATA = 54
}

interface GenericError {
	readonly message: string;
}

interface ErrorWithCode {
	readonly code: number;
	readonly message: string;
}

export function tryGetFailureReason(apiResponse: ApiResponse): ApiFailure {
	if (!apiResponse.isError()) {
		return ApiFailure.NONE;
	}

	const details = apiResponse.getDetails();
	if (typeof details === 'string') {
		return tryGetFailureReasonFromString(details as string);
	}

	const hasGenericMessage = 'message' in details && typeof details.message === 'string';
	if (hasGenericMessage) {
		const error = {
			message: details.message as string
		};
		return tryGetFailureReasonFromGenericError(error);
	}

	const hasCode = 'Code' in details && typeof details.Code === 'number';
	const hasMessage = 'Message' in details && typeof details.Message === 'string';
	if (hasCode && hasMessage) {
		const error = {
			code: details.Code as number,
			message: details.Message as string
		};
		return tryGetFailureReasonFromError(error);
	}

	return tryGetFailureFromHttpCode(apiResponse);
}

function tryGetFailureReasonFromString(errorDetails: string): ApiFailure {
	switch (errorDetails) {
		case 'fetch failed':
			return ApiFailure.SERVICE_UNAVAILAVLE;
		case 'Invalid id syntax':
			return ApiFailure.BAD_REQUEST;
		case 'No such user':
			return ApiFailure.NO_SUCH_USER;
		case 'Invalid credentials':
			return ApiFailure.INVALID_CREDENTIALS;
		case 'Invalid email':
		case 'Invalid password':
			return ApiFailure.INVALID_REGISTRATION_DATA;
		default:
			return ApiFailure.UNKNOWN_ERROR;
	}
}

enum ErrorCode {
	NOT_AUTHENTICATED = 1000,
	API_KEY_EXPIRED = 1001,
	INVALID_CREDENTIALS = 1002
}

function tryGetFailureReasonFromGenericError(error: GenericError): ApiFailure {
	switch (error.message) {
		case 'Not Found':
			return ApiFailure.NOT_FOUND;
		default:
			return ApiFailure.UNKNOWN_ERROR;
	}
}

function tryGetFailureReasonFromError(error: ErrorWithCode): ApiFailure {
	switch (error.code) {
		case ErrorCode.NOT_AUTHENTICATED:
			return ApiFailure.NOT_AUTHENTICATED;
		case ErrorCode.API_KEY_EXPIRED:
			return ApiFailure.API_KEY_EXPIRED;
		case ErrorCode.INVALID_CREDENTIALS:
			return ApiFailure.INVALID_CREDENTIALS;
		default:
			return ApiFailure.UNKNOWN_ERROR;
	}
}

function tryGetFailureFromHttpCode(response: ApiResponse): ApiFailure {
	if (response.is2xxOk()) {
		return ApiFailure.NONE;
	}

	if (response.is4xxBadRequest()) {
		return ApiFailure.BAD_REQUEST;
	}

	return ApiFailure.UNKNOWN_ERROR;
}
