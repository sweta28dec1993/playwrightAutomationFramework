import { APIRequestContext, APIResponse } from '@playwright/test';

export class APIClient {
    constructor(private request: APIRequestContext) {}

    async get(endpoint: string, headers?: { [key: string]: string }, params?: { [key: string]: string | number | boolean }): Promise<APIResponse> {
        console.log(`[APIClient] GET ${endpoint}`);
        return this.request.get(endpoint, { headers, params });
    }

    async post(endpoint: string, data: any, headers?: { [key: string]: string }): Promise<APIResponse> {
        console.log(`[APIClient] POST ${endpoint} - Payload: ${JSON.stringify(data)}`);
        return this.request.post(endpoint, { data, headers });
    }

    async put(endpoint: string, data: any, headers?: { [key: string]: string }): Promise<APIResponse> {
        console.log(`[APIClient] PUT ${endpoint} - Payload: ${JSON.stringify(data)}`);
        return this.request.put(endpoint, { data, headers });
    }

    async delete(endpoint: string, headers?: { [key: string]: string }): Promise<APIResponse> {
        console.log(`[APIClient] DELETE ${endpoint}`);
        return this.request.delete(endpoint, { headers });
    }
}
