import {
	ApiResponse,
	createEmptySuccessApiResponse,
	createFailedApiResponse
} from './apiResponse.js';
import { HttpStatus } from './httpStatusCode.js';

export function trimTrailingSlash(url: string): string {
	return url.replace(/[/]+$/g, '');
}

const GENERIC_FAILURE_REASON = 'Unknown HTTP failure';

function buildApiResponseFromFailedHttpRequest(error: object): ApiResponse {
	let errorDetails = GENERIC_FAILURE_REASON;

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#exceptions
	if (error instanceof TypeError) {
		errorDetails = (error as TypeError).message;
	}

	return createFailedApiResponse(
		errorDetails as unknown as object,
		HttpStatus.SERVICE_NOT_AVAILABLE
	);
}

async function buildApiResponseFromHttpRequest(httpResponse: Response): Promise<ApiResponse> {
	if (httpResponse.status == HttpStatus.NO_CONTENT || httpResponse.status == HttpStatus.ACCEPTED) {
		return createEmptySuccessApiResponse(httpResponse.status);
	}

	const body = await httpResponse.json();
	return new ApiResponse(body, httpResponse.status);
}

export function safeFetchJson(
	url: URL | RequestInfo,
	init?: RequestInit | undefined
): Promise<ApiResponse> {
	// http://blog.niftysnippets.org/2018/06/common-fetch-errors.html
	// https://stackoverflow.com/questions/66931012/why-promise-catch-also-call-then-if-it-is-not-in-the-right-order
	return fetch(url, init)
		.then((response) => buildApiResponseFromHttpRequest(response))
		.catch((err) => buildApiResponseFromFailedHttpRequest(err));
}
