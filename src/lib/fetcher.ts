interface FetchOptions {
    headers?: { [key: string]: string };
    method?: string;
    body?: any;
}

export default async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const res = await fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body
    });
    if (!res.ok) {
        throw new Error('FetchError');
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        return data as T;
    }

    const textData = await res.text();
    return textData as unknown as T;
}
