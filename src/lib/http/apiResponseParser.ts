import type { ApiResponse } from './apiResponse.js';

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://www.simonholywell.com/post/typescript-constructor-type/
export type Constructor<T> = new (arg: object) => T;

export function parseApiResponseAsSingleValue<T>(
	response: ApiResponse,
	destinationType: Constructor<T>
): T | undefined {
	if (response.isError()) {
		return undefined;
	}
	return new destinationType(response.getDetails());
}

export function parseApiResponseAsArray<T>(
	response: ApiResponse,
	destinationType: Constructor<T>
): T[] {
	if (response.isError()) {
		return [];
	}

	const details = response.getDetails();
	if (!Array.isArray(details)) {
		return [];
	}

	return details.map((obj) => new destinationType(obj));
}
