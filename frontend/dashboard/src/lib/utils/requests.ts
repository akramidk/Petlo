import config from '$lib/config';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type devEnv = 'dev' | 'prod';

export default class Requests {
	static async makeRequest(
		env: devEnv,
		method: Method,
		action: string,
		body: any,
		params: any = {},
		headers: HeadersInit = {},
		bodySerializer: any = JSON.stringify
	): Promise<any> {
		return this._makeRequest(env, method, action, params, headers, body, bodySerializer);
	}

	static async makeAuthRequest(
		env: devEnv,
		method: Method,
		action: string,
		body: any,
		params: any = {},
		headers: HeadersInit = {},
		bodySerializer: any = JSON.stringify
	): Promise<any> {
		return this._makeRequest(
			env,
			method,
			action,
			params,
			{
				Authorization: `Bearer ${config.backendApiToken}`,
				...headers
			},
			body,
			bodySerializer
		);
	}

	private static async _makeRequest(
		env: devEnv = 'dev',
		method: string,
		action: string,
		params: any,
		headers: HeadersInit,
		body: any,
		bodySerializer: any
	): Promise<any> {
		const backendAddress = env === 'prod' ? config.backendAddress : config.backendDevAddress;
		return fetch(`${backendAddress}/${action}?${this.parseParams(params)}`, {
			method: method,
			mode: 'cors',
			headers: headers,
			body: body ? bodySerializer(body) : null
		});
	}

	private static parseParams(params: any): string {
		return new URLSearchParams(params).toString();
	}
}
