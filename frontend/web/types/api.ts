// Pagination metadata returned by API
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Successful API response wrapper
export interface ApiResponse<T> {
	success: true;
	data: T;
	meta?: PaginationMeta;
}

// Error response from API
export interface ApiError {
	success: false;
	error: {
		code: string;
		message: string;
		details?: Record<string, string[]>;
	};
}

// Union type for any API response
export type ApiResult<T> = ApiResponse<T> | ApiError;

// Type guard to check if response is successful
export function isApiSuccess<T>(result: ApiResult<T>): result is ApiResponse<T> {
	return result.success === true;
}

// Type guard to check if response is error
export function isApiError<T>(result: ApiResult<T>): result is ApiError {
	return result.success === false;
}
