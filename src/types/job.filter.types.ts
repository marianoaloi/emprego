
// Filter types
export type RemoteWorkType = 'H' | 'R' | 'O'; // Hybrid, Remote, On-site
export type SystemRecruiterType = 'LinkedIn' | 'Others' | 'Empty';
export type LanguageCode = 'pt' | 'it' | 'en' | string;
export type WorkType = 'Part-time' | 'Other' | 'Full-time' | 'Contract' | 'Temporary' | 'Volunteer' | 'Internship';

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
  percentualMatch?: number; // Percentual Match filter (0-100 integer)
  percentualMatchGreaterThan?: boolean; // true = greater than, false = less than
  remote?: RemoteWorkType;
  systemRecruter?: SystemRecruiterType;
  title?: string;
  wait?: boolean;
  workTypes?: WorkType[]; // Multiple work type selection
  workRemoteAllowed?: boolean; // Filter for jobs that allow remote work
  regexFilter?: string; // Regex pattern to filter job content
  skillsFilter?: string[]; // Array of skills to filter by
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
  applied: undefined,
  companyName: undefined,
  country: undefined,
  dataf: undefined,
  datai: undefined,
  formattedLocation: undefined,
  id: undefined,
  ignore: undefined,
  lang: undefined,
  locationGranular: undefined,
  nostatus: undefined,
  percentualMatch: 0,
  percentualMatchGreaterThan: undefined,
  remote: undefined,
  systemRecruter: undefined,
  title: "",
  wait: undefined,
  workTypes: ["Full-time", "Part-time"],
  workRemoteAllowed: undefined,
  regexFilter: undefined,
  skillsFilter: undefined,
};
