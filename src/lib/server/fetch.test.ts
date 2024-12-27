import { describe, it, expect } from 'vitest';
import { safeFetchJson, trimTrailingSlash } from './fetch.js';
import fetchMock from 'fetch-mock';
import { HttpStatus } from './httpStatusCode.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';

describe('Trimming last trailing slash', () => {
	it('should not trim anything when not ending with slash', () => {
		const expected = 'url/not/ending/with/slash';
		const actual = trimTrailingSlash(expected);

		expect(actual).toBe(expected);
	});

	it('should trim last slash when ending with slash', () => {
		const actual = trimTrailingSlash('/url/ending/with/slash/');

		expect(actual).toBe('/url/ending/with/slash');
	});

	it('should trim all slashes when multiple at end of url', () => {
		const actual = trimTrailingSlash('/url/ending/with/multiple/slash///');

		expect(actual).toBe('/url/ending/with/multiple/slash');
	});
});

describe('Safe fetch JSON', () => {
	it('should make a request to provided URL', () => {
		// https://www.wheresrhys.co.uk/fetch-mock/docs#examples
		fetchMock.mockGlobal().route('http://example.com/route/1', HttpStatus.OK);

		safeFetchJson('http://example.com/route/1');

		// http://www.wheresrhys.co.uk/fetch-mock/docs/API/CallHistory#calledfilter-options
		expect(fetchMock.callHistory.called('http://example.com/route/1')).toBe(true);
	});

	// https://stackblitz.com/edit/vitest-dev-vitest-wsycmj?file=test%2Fasync.test.ts
	it('should return response from server', async () => {
		const mockedResponse = {
			body: {
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: 'my-data'
			},
			status: HttpStatus.OK
		};
		fetchMock.mockGlobal().route('http://example.com/route/2', mockedResponse);

		const actual = await safeFetchJson('http://example.com/route/2');

		expect(actual.is2xxOk()).toBe(true);
		expect(actual.isSuccess()).toBe(true);
		expect(actual.getRequestId()).toBe(SAMPLE_REQUEST_ID);
		expect(actual.getDetails()).toBe('my-data');
	});

	it('should return failed API response when fetch fails with TypeError', async () => {
		const mockedResponse = () => {
			return Promise.reject(new TypeError('sample-failure'));
		};
		fetchMock.mockGlobal().route('http://example.com/route/3', mockedResponse);

		const actual = await safeFetchJson('http://example.com/route/3');

		expect(actual.is5xxError()).toBe(true);
		expect(actual.isError()).toBe(true);
		expect(actual.getDetails()).toBe('sample-failure');
	});

	it('should return failed API response when fetch fails with unknown error', async () => {
		const mockedResponse = () => {
			return Promise.reject('sample-failure');
		};
		fetchMock.mockGlobal().route('http://example.com/route/4', mockedResponse);

		const actual = await safeFetchJson('http://example.com/route/4');

		expect(actual.is5xxError()).toBe(true);
		expect(actual.isError()).toBe(true);
		expect(actual.getDetails()).toBe('Unknown HTTP failure');
	});

	it('should return API response when HTTP status is not 2xx', async () => {
		const mockedResponse = {
			body: {
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {
					Code: 1000,
					Message: 'my failure message'
				}
			},
			status: HttpStatus.BAD_REQUEST
		};
		fetchMock.mockGlobal().route('http://example.com/route/5', mockedResponse);

		const actual = await safeFetchJson('http://example.com/route/5');

		expect(actual.is4xxBadRequest()).toBe(true);
		expect(actual.isError()).toBe(true);
		expect(actual.getDetails()).toEqual({
			Code: 1000,
			Message: 'my failure message'
		});
	});

	it('should not return any data when HTTP status is 204 no content', async () => {
		fetchMock.mockGlobal().route('http://example.com/route/6', HttpStatus.NO_CONTENT);

		const actual = await safeFetchJson('http://example.com/route/6');

		expect(actual.is2xxOk()).toBe(true);
		expect(actual.isSuccess()).toBe(true);
		expect(actual.getDetails()).toEqual({});
	});
});
