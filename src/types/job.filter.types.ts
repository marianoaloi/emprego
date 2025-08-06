
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
}

// Default filter values
export const DEFAULT_JOB_FILTER: JobSearchFilter = {
  limit: 100,
};
