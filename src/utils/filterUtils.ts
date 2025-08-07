import { JobSearchFilter } from '@/types/job.filter.types';

// Type for URL query parameters
type JobFilterParams = Record<string, string>;

/**
 * Converts JobSearchFilter to URL query parameters for API requests
 */
export const filterToParams = (filter: JobSearchFilter): JobFilterParams => {
  const params: JobFilterParams = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Convert boolean values to strings
      if (typeof value === 'boolean') {
        params[key as keyof JobFilterParams] = value.toString();
      } 
      // Convert numbers to strings
      else if (typeof value === 'number') {
        params[key as keyof JobFilterParams] = value.toString();
      } 
      // Keep strings as is
      else {
        params[key as keyof JobFilterParams] = value as string;
      }
    }
  });

  return params;
};

/**
 * Converts URL search params back to JobSearchFilter
 */
export const paramsToFilter = (params: URLSearchParams): JobSearchFilter => {
  const filter: JobSearchFilter = {};

  // Boolean fields
  const booleanFields = ['applied', 'ignore', 'nostatus', 'wait'];
  // Number fields
  const numberFields = ['limit'];

  params.forEach((value, key) => {
    if (booleanFields.includes(key)) {
      (filter as any)[key] = value === 'true';
    } else if (numberFields.includes(key)) {
      (filter as any)[key] = parseInt(value, 10);
    } else {
      (filter as any)[key] = value;
    }
  });

  return filter;
};

/**
 * Validates date filter format (supports relative formats like "-7d", "-1M")
 */
export const validateDateFilter = (dateFilter: string): boolean => {
  // Relative format pattern: -\d+[dMy] (e.g., "-7d", "-1M", "-2y")
  const relativePattern = /^-\d+[dMy]$/;
  
  // ISO date pattern: YYYY-MM-DD
  const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
  
  return relativePattern.test(dateFilter) || isoPattern.test(dateFilter);
};

/**
 * Validates remote work type
 */
export const validateRemoteType = (remote: string): boolean => {
  return ['H', 'R', 'O'].includes(remote);
};

/**
 * Validates system recruiter type
 */
export const validateSystemRecruiter = (systemRecruter: string): boolean => {
  return ['LinkedIn', 'Others', 'Empty'].includes(systemRecruter);
};

/**
 * Creates a clean filter object by removing empty/undefined values
 */
export const cleanFilter = (filter: JobSearchFilter): JobSearchFilter => {
  const cleaned: JobSearchFilter = {};
  
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key as keyof JobSearchFilter] = value;
    }
  });
  
  return cleaned;
};