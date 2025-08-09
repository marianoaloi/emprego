
import { JobSearchFilter, DEFAULT_JOB_FILTER } from '@/types/job.filter.types';
import { JobPosting } from '@/types/job.types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://us-central1-affitiudine.cloudfunctions.net/api' 
  : 'http://localhost:5000';

console.log('Environment:', process.env.NODE_ENV);

function wait(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url: string, delay: number, tries: number, fetchOptions = {}): Promise<Response> {
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

export const DataRequest = async (filter?: JobSearchFilter) : Promise<JobPosting[]> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };
    
    const response = await fetchRetry(`${API_BASE_URL}/data`, 10_000, 5, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFilter),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

export interface JobActionResponse {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
}

export const appliedbymeRequest = async (jobId: string, undo?: boolean): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/appliedbyme?${params}`;
    
    const response = await fetchRetry(url, 10_000, 3);
    
    if (!response.ok) {
        throw new Error(`Failed to mark as applied: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

export const CloseRequest = async (jobId: string, undo?: boolean): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/close?${params}`;
    
    const response = await fetchRetry(url, 10_000, 3);
    
    if (!response.ok) {
        throw new Error(`Failed to close job: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

export const IgnoreRequest = async (jobId: string, undo?: boolean): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/ignore?${params}`;
    
    const response = await fetchRetry(url, 10_000, 3);
    
    if (!response.ok) {
        throw new Error(`Failed to ignore job: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

export const WaitRequest = async (jobId: string, undo?: boolean): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/wait?${params}`;
    
    const response = await fetchRetry(url, 10_000, 3);
    
    if (!response.ok) {
        throw new Error(`Failed to mark as wait: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

