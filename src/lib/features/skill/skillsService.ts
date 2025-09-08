import { fetchRetry } from "../UtilREquest";


import { API_BASE_URL } from "../UtilREquest";
export interface JobSkills {
    _id: string;
    match: {
        skillOnProfile: boolean;
        localizedSkillDisplayName: string;
        skillMatchActionButton?: string;
    }[];
    text: string;
}

export const getSkillsRequest = async (jobId: string): Promise<JobSkills | null> => {
    const response = await fetchRetry(`${API_BASE_URL}/skill`, 10_000, 5, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([jobId]),
    });
     if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.status} ${response.statusText}`);
    }
    const result = await response.json() as JobSkills[];
    if(!result)
        return null
    return result[0];
}