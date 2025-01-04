import type { ApiResponse } from './apiResponse.js';

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://www.simonholywell.com/post/typescript-constructor-type/
export type Constructor<T> = new (arg: object) => T;

export function parseObjectAsSingleValue<T>(
	data: object,
	destinationType: Constructor<T>
): T | undefined {
	return new destinationType(data);
}

export function parseApiResponseAsSingleValue<T>(
	response: ApiResponse,
	destinationType: Constructor<T>
): T | undefined {
	if (response.isError()) {
		return undefined;
	}
	return parseObjectAsSingleValue(response.getDetails(), destinationType);
}

export function parseObjectAsArray<T>(data: object, destinationType: Constructor<T>): T[] {
	if (!Array.isArray(data)) {
		return [];
	}

	return data.map((obj) => new destinationType(obj));
}

export function parseApiResponseAsArray<T>(
	response: ApiResponse,
	destinationType: Constructor<T>
): T[] {
	if (response.isError()) {
		return [];
	}

	const details = response.getDetails();
	return parseObjectAsArray(details, destinationType);
}
