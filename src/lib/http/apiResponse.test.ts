import { describe, it, expect } from 'vitest';
import {
	createEmptySuccessApiResponse,
	createFailedApiResponse,
	ApiResponse,
	Status
} from './apiResponse.js';
import { HttpStatus } from './httpStatusCode.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';
const SAMPLE_RESPONSE_DETAILS = {
	requestId: SAMPLE_REQUEST_ID,
	status: 'unknown-status',
	details: {}
};

describe.concurrent('Creating an ApiResponse', () => {
	it('should use the provided request identifier', () => {
		const actual = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: {}
			},
			HttpStatus.OK
		);

		expect(actual.getRequestId()).toBe(SAMPLE_REQUEST_ID);
	});

	it('should not expect request identifier to be a uuid', () => {
		const actual = new ApiResponse(
			{
				requestId: 'my-custom-identifier',
				status: 'SUCCESS',
				details: {}
			},
			HttpStatus.OK
		);

		expect(actual.getRequestId()).toBe('my-custom-identifier');
	});

	it('should recognize SUCCESS status', () => {
		const actual = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: {}
			},
			HttpStatus.OK
		);

		expect(actual.getStatus()).toBe(Status.SUCCESS);
		expect(actual.isSuccess()).toBe(true);
		expect(actual.isError()).toBe(false);
	});

	it('should recognize ERROR status', () => {
		const actual = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.BAD_REQUEST
		);

		expect(actual.getStatus()).toBe(Status.ERROR);
		expect(actual.isSuccess()).toBe(false);
		expect(actual.isError()).toBe(true);
	});

	it('should recognize unknown status as ERROR', () => {
		const actual = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'unknown-status',
				details: {}
			},
			HttpStatus.BAD_REQUEST
		);

		expect(actual.getStatus()).toBe(Status.ERROR);
		expect(actual.isSuccess()).toBe(false);
		expect(actual.isError()).toBe(true);
	});

	it('should correctly interpret 2xx HTTP status code', () => {
		let actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.OK);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);

		actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.NO_CONTENT);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 4xx HTTP status code', () => {
		let actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.BAD_REQUEST);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);

		actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.FORBIDDEN);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 5xx HTTP status code', () => {
		const actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.INTERNAL_SERVER_ERROR);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(true);
	});

	it('should correctly use the provided HTTP status code', () => {
		let actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.INTERNAL_SERVER_ERROR);
		expect(actual.statusCode()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

		actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.OK);
		expect(actual.statusCode()).toBe(HttpStatus.OK);

		actual = new ApiResponse(SAMPLE_RESPONSE_DETAILS, HttpStatus.CONFLICT);
		expect(actual.statusCode()).toBe(HttpStatus.CONFLICT);
	});
});

describe.concurrent('Creating a failed ApiResponse', () => {
	it('should have ERROR status', () => {
		const actual = createFailedApiResponse({}, HttpStatus.INTERNAL_SERVER_ERROR);

		expect(actual.isError()).toBe(true);
	});

	it('should use the provided details', () => {
		const expectedDetails = {
			key: 'value',
			key2: 1,
			nested: {
				anotherKey: [2.3, 3.7]
			}
		};
		const actual = createFailedApiResponse(expectedDetails, HttpStatus.INTERNAL_SERVER_ERROR);

		expect(actual.getDetails()).toBe(expectedDetails);
	});

	it('should correctly interpret 2xx HTTP status code', () => {
		let actual = createFailedApiResponse({}, HttpStatus.OK);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);

		actual = createFailedApiResponse({}, HttpStatus.NO_CONTENT);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 4xx HTTP status code', () => {
		let actual = createFailedApiResponse({}, HttpStatus.BAD_REQUEST);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);

		actual = createFailedApiResponse({}, HttpStatus.FORBIDDEN);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 5xx HTTP status code', () => {
		const actual = createFailedApiResponse({}, HttpStatus.INTERNAL_SERVER_ERROR);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(true);
	});
});

describe.concurrent('Creating an empty success ApiResponse', () => {
	it('should have SUCCESS status', () => {
		const actual = createEmptySuccessApiResponse(HttpStatus.NO_CONTENT);

		expect(actual.isSuccess()).toBe(true);
	});

	it('should not have any details', () => {
		const actual = createEmptySuccessApiResponse(HttpStatus.NO_CONTENT);

		expect(actual.getDetails()).toEqual({});
	});

	it('should correctly interpret 2xx HTTP status code', () => {
		let actual = createEmptySuccessApiResponse(HttpStatus.OK);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);

		actual = createEmptySuccessApiResponse(HttpStatus.NO_CONTENT);
		expect(actual.is2xxOk()).toBe(true);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 4xx HTTP status code', () => {
		let actual = createEmptySuccessApiResponse(HttpStatus.BAD_REQUEST);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);

		actual = createEmptySuccessApiResponse(HttpStatus.FORBIDDEN);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.is5xxError()).toBe(false);
	});

	it('should correctly interpret 5xx HTTP status code', () => {
		const actual = createEmptySuccessApiResponse(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(actual.is2xxOk()).toBe(false);
		expect(actual.is4xxBadRequest()).toBe(false);
		expect(actual.is5xxError()).toBe(true);
	});
});
