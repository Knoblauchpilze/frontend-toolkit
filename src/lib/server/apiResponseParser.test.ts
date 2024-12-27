import { describe, it, expect, assert } from 'vitest';
import { ApiResponse } from './apiResponse.js';
import { HttpStatus } from './httpStatusCode.js';
import { parseApiResponseAsArray, parseApiResponseAsSingleValue } from './apiResponseParser.js';

const SAMPLE_REQUEST_ID = 'e0bcdaa7-9e60-411b-a308-75e0c079abed';

class DummyObject {
	public foo: number = 0;
	public bar: string = 'test';

	constructor(obj: object) {
		assert('foo' in obj && typeof obj.foo === 'number');
		this.foo = obj.foo;

		assert('bar' in obj && typeof obj.bar === 'string');
		this.bar = obj.bar;
	}
}

class DummyObjectWithoutConstructor {
	public foo: number = 0;
	public bar: string = 'test';
}

describe('Parsing API response as single value', () => {
	it('should return empty object if response is error', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.UNAUTHORIZED
		);

		const actual = parseApiResponseAsSingleValue(response, DummyObject);

		expect(actual).toBe(undefined);
	});

	it('should return details as object', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: {
					foo: 789,
					bar: 'sample-data'
				}
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsSingleValue(response, DummyObject);

		expect(actual).toEqual({
			foo: 789,
			bar: 'sample-data'
		});
	});

	it('should return default value when no constructor exists', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: {
					foo: 789,
					bar: 'sample-data'
				}
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsSingleValue(response, DummyObjectWithoutConstructor);

		expect(actual).toEqual({
			foo: 0,
			bar: 'test'
		});
	});

	it('should correctly parse number', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: 1 as unknown as object
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsSingleValue(response, Number);

		expect(actual).toEqual(new Number(1));
	});

	it('should correctly parse string', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: 'test string' as unknown as object
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsSingleValue(response, String);

		expect(actual).toEqual(new String('test string'));
	});
});

describe('Parsing API response as array', () => {
	it('should return empty array if response is error', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'ERROR',
				details: {}
			},
			HttpStatus.FORBIDDEN
		);

		const actual = parseApiResponseAsArray(response, DummyObject);

		expect(actual).toEqual([]);
	});

	it('should return details as array', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: [
					{
						foo: 789,
						bar: 'sample-data'
					},
					{
						foo: 123,
						bar: 'some-other-data'
					}
				]
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsArray(response, DummyObject);

		expect(actual).toEqual([
			{
				foo: 789,
				bar: 'sample-data'
			},
			{
				foo: 123,
				bar: 'some-other-data'
			}
		]);
	});

	it('should correctly parse number', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: [1 as unknown as object, 1.28 as unknown as object, -3.58 as unknown as object]
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsArray(response, Number);

		expect(actual).toEqual([new Number(1), new Number(1.28), new Number(-3.58)]);
	});

	it('should correctly parse string', () => {
		const response = new ApiResponse(
			{
				requestId: SAMPLE_REQUEST_ID,
				status: 'SUCCESS',
				details: ['test string' as unknown as object, 'this is another string' as unknown as object]
			},
			HttpStatus.OK
		);

		const actual = parseApiResponseAsArray(response, String);

		expect(actual).toEqual([new String('test string'), new String('this is another string')]);
	});
});
