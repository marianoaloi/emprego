
import { Cookie } from '@/types/cookies.types';
import { API_BASE_URL, fetchRetry } from '../UtilREquest';
import { JobPosting } from '@/types/job.types';

export const getCookie = async (token: string): Promise<Cookie[] | null> => {
    const response = await fetchRetry(`${API_BASE_URL}/cookie`, 10_000, 5, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch cookie: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

export const updateOpportunities = async (oportunitie: JobPosting,token: string) => {
    const response = await fetchRetry(`${API_BASE_URL}/cookie`, 10_000, 5, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(oportunitie),
    }); 
    if (!response.ok) {
        throw new Error(`Failed to update opportunities: ${response.status} ${response.statusText}`);
    }
    return response.json();
};
