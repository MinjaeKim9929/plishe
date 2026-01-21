const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type RequestOptions = {
	headers?: Record<string, string>;
};

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
		const url = new URL(`${this.baseUrl}${endpoint}`);
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, String(value));
				}
			});
		}
		return url.toString();
	}

	async get<T>(
		endpoint: string,
		params?: Record<string, string | number | boolean>,
		options?: RequestOptions,
	): Promise<T> {
		const url = this.buildUrl(endpoint, params);

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Request failed' }));
			throw new Error(error.message || `API Error: ${response.status}`);
		}

		return response.json();
	}

	async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Request failed' }));
			throw new Error(error.message || `API Error: ${response.status}`);
		}

		return response.json();
	}

	async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Request failed' }));
			throw new Error(error.message || `API Error: ${response.status}`);
		}

		return response.json();
	}

	async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Request failed' }));
			throw new Error(error.message || `API Error: ${response.status}`);
		}

		return response.json();
	}
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
