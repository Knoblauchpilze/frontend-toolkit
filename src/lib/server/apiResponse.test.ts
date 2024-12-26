import { describe, it, expect } from 'vitest';
import {
	createEmptySuccessApiResponse,
	createFailedApiResponse,
	ApiResponse,
	Status
} from './apiResponse.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';

describe('Creating an ApiResponse', () => {
	it('should recognize SUCCESS status', () => {
		const actual = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'SUCCESS',
			details: {}
		});

		expect(actual.getStatus()).toBe(Status.SUCCESS);
		expect(actual.isSuccess()).toBe(true);
		expect(actual.isError()).toBe(false);
	});

	it('should recognize ERROR status', () => {
		const actual = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'ERROR',
			details: {}
		});

		expect(actual.getStatus()).toBe(Status.ERROR);
		expect(actual.isSuccess()).toBe(false);
		expect(actual.isError()).toBe(true);
	});

	it('should recognize unknown status as ERROR', () => {
		const actual = new ApiResponse({
			requestId: SAMPLE_REQUEST_ID,
			status: 'unknown-status',
			details: {}
		});

		expect(actual.getStatus()).toBe(Status.ERROR);
		expect(actual.isSuccess()).toBe(false);
		expect(actual.isError()).toBe(true);
	});
});

describe('Creating a failed ApiResponse', () => {
	it('should have ERROR status', () => {
		const actual = createFailedApiResponse({});

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
		const actual = createFailedApiResponse(expectedDetails);

		expect(actual.getDetails()).toBe(expectedDetails);
	});
});

describe('Creating an empty success ApiResponse', () => {
	it('should have SUCCESS status', () => {
		const actual = createEmptySuccessApiResponse();

		expect(actual.isSuccess()).toBe(true);
	});

	it('should not have any details', () => {
		const actual = createEmptySuccessApiResponse();

		expect(actual.getDetails()).toEqual({});
	});
});
