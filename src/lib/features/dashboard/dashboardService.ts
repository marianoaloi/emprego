import { DEFAULT_JOB_FILTER, JobSearchFilter } from "@/types/job.filter.types";
import { fetchRetry, API_BASE_URL } from "../UtilREquest";
import {
    SalaryDashboardResponse,
    LangCountryDashboardResponse,
    CountryLocalDashboardResponse,
    CountryDashboardResponse
} from "./dashboardTruck";


// POST /dashboard/salary
export const salaryRequest = async (filter?: JobSearchFilter): Promise<SalaryDashboardResponse> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };

    const response = await fetchRetry(`${API_BASE_URL}/dashboard/salary`, 10_000, 5, {
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

// POST /dashboard/ - base dashboard
export const langCountry = async (filter?: JobSearchFilter): Promise<LangCountryDashboardResponse> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };

    const response = await fetchRetry(`${API_BASE_URL}/dashboard`, 10_000, 5, {
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

// POST /dashboard/countryLocal
export const countryLocal = async (filter?: JobSearchFilter): Promise<CountryLocalDashboardResponse> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };

    const response = await fetchRetry(`${API_BASE_URL}/dashboard/countryLocal`, 10_000, 5, {
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

// POST /dashboard/countries
export const countries = async (filter?: JobSearchFilter): Promise<CountryDashboardResponse> => {
    const finalFilter = { ...DEFAULT_JOB_FILTER, ...filter };

    const response = await fetchRetry(`${API_BASE_URL}/dashboard/countries`, 10_000, 5, {
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

