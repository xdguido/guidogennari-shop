/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exception } from '@lib/api/errorException';

class FetchError extends Error {
    clientString: { [key: string]: string };
    constructor(
        public readonly status: number,
        message: string,
        clientString: { [key: string]: string }
    ) {
        super(message);
        this.name = 'FetchError';
        this.clientString = clientString;
    }
}

async function parseResponse(res: Response): Promise<any> {
    const contentType = res.headers.get('Content-Type');
    if (contentType?.startsWith('application/json')) {
        return res.json();
    } else if (contentType?.startsWith('text/')) {
        return res.text();
    } else {
        return res.blob();
    }
}

interface FetchOptions {
    headers?: { [key: string]: string };
    method?: string;
    body?: any;
}

export default async function fetcher(url: string, options: FetchOptions = {}) {
    const res = await fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body
    });

    if (!res.ok) {
        let error;
        try {
            error = await res.json();
            if (!(error instanceof Exception)) {
                throw new Error(res.statusText);
            }
        } catch (e) {
            error = new Error(res.statusText);
        }
        console.error(error);
        const message = error.name;
        const clientString = error.clientString;
        throw new FetchError(res.status, message, clientString);
    }

    return parseResponse(res);
}
