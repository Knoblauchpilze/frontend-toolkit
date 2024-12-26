export enum Status {
	SUCCESS,
	ERROR
}

export class ApiResponse {
	private readonly requestId: string;
	private readonly status: Status;
	private readonly details: object;
	private readonly httpCode: number;

	constructor(response: { requestId: string; status: string; details: object }, httpCode: number) {
		this.requestId = response.requestId;
		this.status = response.status === 'SUCCESS' ? Status.SUCCESS : Status.ERROR;
		this.details = response.details;
		this.httpCode = httpCode;
	}

	public getRequestId(): string {
		return this.requestId;
	}

	public getStatus(): Status {
		return this.status;
	}

	public isSuccess(): boolean {
		return this.status === Status.SUCCESS;
	}

	public isError(): boolean {
		return !this.isSuccess();
	}

	public is2xxOk(): boolean {
		return this.httpCode >= 200 && this.httpCode < 300;
	}

	public is4xxBadRequest(): boolean {
		return this.httpCode >= 400 && this.httpCode < 500;
	}

	public is5xxError(): boolean {
		return this.httpCode >= 500 && this.httpCode < 600;
	}

	public getDetails(): object {
		return this.details;
	}
}

export function createFailedApiResponse(details: object, httpCode: number): ApiResponse {
	return new ApiResponse(
		{
			requestId: '00000000-0000-0000-0000-000000000000',
			status: 'ERROR',
			details: details
		},
		httpCode
	);
}

export function createEmptySuccessApiResponse(httpCode: number): ApiResponse {
	return new ApiResponse(
		{
			requestId: '00000000-0000-0000-0000-000000000000',
			status: 'SUCCESS',
			details: {}
		},
		httpCode
	);
}
