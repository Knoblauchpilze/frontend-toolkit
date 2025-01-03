import { describe, expect, it } from 'vitest';
import { ApiFailure } from './apiResponseAnalyzer.js';
import { HttpStatus } from './httpStatusCode.js';
import { getHttpStatusCodeFromApiFailure } from './apiFailureToHttpStatus.js';

describe.concurrent('Converting failures to HTTP codes', () => {
	it('should handle NONE', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.NONE);
		expect(actual).toBe(HttpStatus.OK);
	});

	it('should handle UNKNOWN_ERROR', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.UNKNOWN_ERROR);
		expect(actual).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
	});

	it('should handle BAD_REQUEST', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.BAD_REQUEST);
		expect(actual).toBe(HttpStatus.BAD_REQUEST);
	});

	it('should handle NOT_FOUND', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.NOT_FOUND);
		expect(actual).toBe(HttpStatus.NOT_FOUND);
	});

	it('should handle SERVICE_UNAVAILABLE', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.SERVICE_UNAVAILABLE);
		expect(actual).toBe(HttpStatus.SERVICE_NOT_AVAILABLE);
	});

	it('should handle NOT_AUTHENTICATED', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.NOT_AUTHENTICATED);
		expect(actual).toBe(HttpStatus.UNAUTHORIZED);
	});

	it('should handle API_KEY_EXPIRED', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.API_KEY_EXPIRED);
		expect(actual).toBe(HttpStatus.UNAUTHORIZED);
	});

	it('should handle NO_SUCH_USER', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.NO_SUCH_USER);
		expect(actual).toBe(HttpStatus.NOT_FOUND);
	});

	it('should handle INVALID_CREDENTIALS', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.INVALID_CREDENTIALS);
		expect(actual).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
	});

	it('should handle INVALID_REGISTRATION_DATA', () => {
		const actual = getHttpStatusCodeFromApiFailure(ApiFailure.INVALID_REGISTRATION_DATA);
		expect(actual).toBe(HttpStatus.BAD_REQUEST);
	});
});
