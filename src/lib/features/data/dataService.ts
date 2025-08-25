
import { JobSearchFilter, DEFAULT_JOB_FILTER } from '@/types/job.filter.types';
import { JobPosting } from '@/types/job.types';
import { JobDescriptionResponse, JobDescriptionApiResponse } from '@/types/job-description.types';
import { fetchRetry } from '../UtilREquest';

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://us-central1-emprego-4bb54.cloudfunctions.net/api'
    : 'http://localhost:5001/emprego-4bb54/us-central1/api';

console.log('Environment:', process.env.NODE_ENV);


export const DataRequest = async (filter?: JobSearchFilter): Promise<JobPosting[]> => {
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

export const appliedbymeRequest = async (jobId: string, undo: boolean | undefined, token: string | null): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/actions/appliedbyme?${params}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    const response = await fetchRetry(url, 10_000, 5, headers);

    if (!response.ok) {
        throw new Error(`Failed to mark as applied: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const CloseRequest = async (jobId: string, undo: boolean | undefined, token: string | null): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/actions/close?${params}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    const response = await fetchRetry(url, 10_000, 5, headers);

    if (!response.ok) {
        throw new Error(`Failed to close job: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const IgnoreRequest = async (jobId: string, undo: boolean | undefined, token: string | null): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/actions/ignore?${params}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    const response = await fetchRetry(url, 10_000, 5, headers);

    if (!response.ok) {
        throw new Error(`Failed to ignore job: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const WaitRequest = async (jobId: string, undo: boolean | undefined, token: string | null): Promise<JobActionResponse> => {
    const params = new URLSearchParams({ id: jobId });
    if (undo) params.append('undo', 'true');
    const url = `${API_BASE_URL}/actions/wait?${params}`;
    const headers = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    const response = await fetchRetry(url, 10_000, 5, headers);

    if (!response.ok) {
        throw new Error(`Failed to mark as wait: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const fetchJobDescription = async (jobId: string): Promise<JobDescriptionResponse | null> => {
    try {
        const response = await fetchRetry(`${API_BASE_URL}/text`, 10_000, 5, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: [jobId] }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: JobDescriptionApiResponse = await response.json();
        return data.find(item => item._id === jobId) || null;
    } catch (error) {
        console.error('Error fetching job description:', error);
        throw error;
    }
};

export const DataCountRequest = async (filter?: JobSearchFilter): Promise<number> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };

    const response = await fetchRetry(`${API_BASE_URL}/data/count`, 10_000, 5, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFilter),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data count: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.count || 0;
};

