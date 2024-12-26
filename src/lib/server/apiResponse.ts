
export enum Status {
	SUCCESS,
	ERROR
}

export class ApiResponse {
	readonly requestId: string;
	readonly status: Status;
	readonly details: object;

	constructor(response: { requestId: string; status: string; details: object }) {
		this.requestId = response.requestId;
		this.status = (response.status === "SUCCESS" ? Status.SUCCESS : Status.ERROR);
		this.details = response.details;
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

	public getDetails(): object {
		return this.details;
	}
}

export function createFailedApiResponse(details: object): ApiResponse {
	return new ApiResponse({
		requestId: '00000000-0000-0000-0000-000000000000',
		status: 'ERROR',
		details: details
	});
}

export function createEmptySuccessApiResponse(): ApiResponse {
	return new ApiResponse({
		requestId: '00000000-0000-0000-0000-000000000000',
		status: 'SUCCESS',
		details: {}
	});
}
