import type { HttpRequest } from '$lib/utils/util';
import { PUBLIC_API_URL } from '$env/static/public';

interface RequestParams {
	method: HttpRequest;
	path: string;
	body?: string;
	auth?: string;
}

export async function makeRequest(params: RequestParams) {
	const opts: RequestInit = {};
	let headers: HeadersInit = {};

	if (params.body) {
		headers = { 'Content-Type': 'application/json' };
		opts.body = params.body;
	}

	if (params.auth) headers = { ...headers, Authorization: `Bearer ${params.auth}` };

	opts.method = params.method;
	opts.headers = headers;

	const response = await fetch(`${PUBLIC_API_URL}${params.path}`, opts);

	if (!response.ok) return await response.json();

	const text = await response.text();
	return text ? JSON.parse(text) : {};
}
