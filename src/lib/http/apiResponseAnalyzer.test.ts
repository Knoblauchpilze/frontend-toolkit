import { describe, it, expect } from 'vitest';
import { ApiResponse } from './apiResponse.js';
import { ApiFailure, tryGetFailureReason } from './apiResponseAnalyzer.js';
import { HttpStatus } from './httpStatusCode.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';

describe('Getting failure reason', () => {
	it('should not find reason for success response', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: {}
			},
			HttpStatus.OK
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NONE);
	});

	it('should return error based on HTTP error when failure is unknown', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.BAD_REQUEST);
	});

	it('should return generic error when failure is unknown', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.UNKNOWN_ERROR);
	});

	it('should recognize not found', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {
					message: 'Not Found'
				}
			},
			HttpStatus.NOT_FOUND
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NOT_FOUND);
	});

	it('should recognize bad request', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'Invalid id syntax' as unknown as object
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.BAD_REQUEST);
	});

	it('should recognize unauthenticated', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {
					Code: 1000,
					Message: 'Sample message does not matter'
				}
			},
			HttpStatus.FORBIDDEN
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NOT_AUTHENTICATED);
	});

	it('should recognize api key expired', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {
					Code: 1001,
					Message: 'Sample message does not matter'
				}
			},
			HttpStatus.FORBIDDEN
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.API_KEY_EXPIRED);
	});

	it('should recognize unknown user', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'No such user' as unknown as object
			},
			HttpStatus.NOT_FOUND
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NO_SUCH_USER);
	});

	it('should recognize invalid credentials', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'Invalid credentials' as unknown as object
			},
			HttpStatus.UNAUTHORIZED
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_CREDENTIALS);
	});

	it('should recognize invalid email', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'Invalid email' as unknown as object
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_REGISTRATION_DATA);
	});

	it('should recognize invalid password', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'Invalid password' as unknown as object
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_REGISTRATION_DATA);
	});

	it('should recognize duplicated email', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'Email already in use' as unknown as object
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_REGISTRATION_DATA);
	});

	it('should recognize HTTP 200', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.OK
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NONE);
	});

	it('should recognize HTTP 404', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.BAD_REQUEST
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.BAD_REQUEST);
	});

	it('should recognize HTTP 403', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.FORBIDDEN
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.BAD_REQUEST);
	});

	it('should recognize fetch failure', () => {
		const apiResponse = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: 'fetch failed' as unknown as object
			},
			HttpStatus.FORBIDDEN
		);

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.SERVICE_UNAVAILABLE);
	});
});
