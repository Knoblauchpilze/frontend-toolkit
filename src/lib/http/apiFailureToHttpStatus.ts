import { ApiFailure } from './apiResponseAnalyzer.js';
import { HttpStatus } from './httpStatusCode.js';

export function getHttpStatusCodeFromApiFailure(failure: ApiFailure): number {
	switch (failure) {
		case ApiFailure.NONE:
			return HttpStatus.OK;
		case ApiFailure.UNKNOWN_ERROR:
			return HttpStatus.INTERNAL_SERVER_ERROR;
		case ApiFailure.BAD_REQUEST:
			return HttpStatus.BAD_REQUEST;
		case ApiFailure.NOT_FOUND:
			return HttpStatus.NOT_FOUND;
		case ApiFailure.SERVICE_UNAVAILABLE:
			return HttpStatus.SERVICE_NOT_AVAILABLE;
		case ApiFailure.NOT_AUTHENTICATED:
		case ApiFailure.API_KEY_EXPIRED:
			return HttpStatus.UNAUTHORIZED;
		case ApiFailure.NO_SUCH_USER:
			return HttpStatus.NOT_FOUND;
		case ApiFailure.INVALID_CREDENTIALS:
			return HttpStatus.UNPROCESSABLE_ENTITY;
		case ApiFailure.INVALID_REGISTRATION_DATA:
			return HttpStatus.BAD_REQUEST;
		default:
			return HttpStatus.OK;
	}
}
