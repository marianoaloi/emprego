
// Filter types
export type RemoteWorkType = 'H' | 'R' | 'O'; // Hybrid, Remote, On-site
export type SystemRecruiterType = 'LinkedIn' | 'Others' | 'Empty';
export type LanguageCode = 'pt' | 'it' | 'en' | string;

// Job search/filter entity
export interface JobSearchFilter {
  applied?: boolean;
  companyName?: string;
  country?: string;
  dataf?: string; // End date filter (relative formats like "-7d", "-1M")
  datai?: string; // Start date filter (relative formats like "-7d", "-1M")
  formattedLocation?: string;
  id?: string; // Comma-separated list of job IDs
  ignore?: boolean;
  lang?: LanguageCode;
  limit?: number;
  locationGranular?: string;
  nostatus?: boolean;
  remote?: RemoteWorkType;
  systemRecruter?: SystemRecruiterType;
  title?: string;
  wait?: boolean;
  sort?: {
    lastupdate?: -1 | 0 | 1;
    expireAt?: -1 | 0 | 1;
    listedAt?: -1 | 0 | 1;
    originalListedAt?: -1 | 0 | 1;
  }
}

// Default filter values
export const DEFAULT_JOB_FILTER: JobSearchFilter = {
  limit: 100,
  sort: {
    lastupdate: -1,
  },
};
