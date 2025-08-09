// Salary compensation breakdown structure
export interface SalaryCompensationBreakdown {
  maxSalary: string;
  payPeriod: string;
  minSalary: string;
  currencyCode: string;
  compensationType: string;
}

// Salary insights matching the new API structure
export interface SalaryInsights {
  providedByEmployer: boolean;
  rightRailEligible: boolean;
  jobCompensationAvailable: boolean;
  compensationBreakdown: Record<string, SalaryCompensationBreakdown>;
  lockModuleShown: boolean;
  compensationSource: string;
  salaryExplorerUrl: string;
  insightExists: boolean;
}

// Simplified JobPosting interface matching the new API structure
export interface JobPosting {
  _id: string;
  applicantTrackingSystem: string;
  applied: boolean;
  appliedbyme?: string;
  applies: number;
  closed: boolean;
  companyId: string;
  companyName: string;
  country: string;
  description: string;
  employmentStatus: string;
  expireAt: number;
  formattedEmploymentStatus: string;
  formattedExperienceLevel: string;
  formattedLocation: string;
  headquartercity: string;
  headquartercountry: string;
  headquartergeographicArea: string;
  ignore?: string;
  lang: string;
  lastupdate: number;
  listedAt: number;
  llm: string;
  new: boolean;
  originalListedAt: number;
  salaryInsights?: SalaryInsights;
  standardizedTitle: string;
  title: string;
  wait?: string;
  workplaceTypes: string;
  workRemoteAllowed: boolean;
}
