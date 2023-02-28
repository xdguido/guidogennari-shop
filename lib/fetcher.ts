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

export default async function fetcher(url: string) {
    const res = await fetch(url);

    if (!res.ok) {
        const error: Exception = await res.json();
        console.error(error);
        const message = error.name;
        const clientString = error.clientString;
        throw new FetchError(res.status, message, clientString);
    }

    return parseResponse(res);
}
