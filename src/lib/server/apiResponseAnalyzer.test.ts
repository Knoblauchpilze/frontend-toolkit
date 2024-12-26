import { describe, it, expect } from 'vitest';
import { ApiResponse } from './apiResponse.js';
import { ApiFailure, tryGetFailureReason } from './apiResponseAnalyzer.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';

describe('Getting failure reason', () => {
	it('should not find reason for success response', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'SUCCESS',
			details: {}
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NONE);
	});

	it('should return generic error when failure is unknown', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: {}
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.UNKNOWN_ERROR);
	});

	it('should recognize not found', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: {
				message: 'Not Found'
			}
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NOT_FOUND);
	});

	it('should recognize bad request', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: 'Invalid id syntax' as unknown as object
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.BAD_REQUEST);
	});

	it('should recognize unauthenticated', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: {
				Code: 1000,
				Message: 'Sample message does not matter'
			}
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NOT_AUTHENTICATED);
	});

	it('should recognize api key expired', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: {
				Code: 1001,
				Message: 'Sample message does not matter'
			}
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.API_KEY_EXPIRED);
	});

	it('should recognize unknown user', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: 'No such user' as unknown as object
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.NO_SUCH_USER);
	});

	it('should recognize invalid credentials', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: 'Invalid credentials' as unknown as object
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_CREDENTIALS);
	});

	it('should recognize invalid email', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: 'Invalid email' as unknown as object
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_REGISTRATION_DATA);
	});

	it('should recognize invalid password', () => {
		const apiResponse = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: 'Invalid password' as unknown as object
		});

		const actual = tryGetFailureReason(apiResponse);
		expect(actual).toBe(ApiFailure.INVALID_REGISTRATION_DATA);
	});
});
