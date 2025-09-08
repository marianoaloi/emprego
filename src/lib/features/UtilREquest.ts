
export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://us-central1-emprego-4bb54.cloudfunctions.net/api'
    : 'http://localhost:5001/emprego-4bb54/us-central1/api';

function wait(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export function fetchRetry(url: string, delay: number, tries: number, fetchOptions = {}): Promise<Response> {
    const onError = (err: Error): Promise<Response> => {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }
        return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
    }

    const errorIn404 = (response: Response): Response => {
        if (response.status === 404) {
            throw new Error(`404 Not Found: ${url}`);
        }
        return response;
    }
    return fetch(url, fetchOptions).then(errorIn404).catch(onError);
}