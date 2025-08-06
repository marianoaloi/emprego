export interface JobPosting {
  _id: string;
  allJobHiringTeamMembersInjectionResult: HiringTeamMembersInjection;
  allowedToEdit: boolean;
  applies: number;
  applyMethod: ApplyMethod;
  applyingInfo: ApplyingInfo;
  benefits: Record<string, any>;
  benefitsDataSource: string;
  claimableByViewer: boolean;
  companyDescription: TextDescription;
  companyDetails: CompanyDetails;
  contentSource: string;
  country: string;
  dashEntityUrn: string;
  dashJobPostingCardUrn: string;
  description: TextDescription;
  eligibleForLearningCourseRecsUpsell: boolean;
  eligibleForReferrals: boolean;
  eligibleForSharingProfileWithPoster: boolean;
  employmentStatus: string;
  employmentStatusResolutionResult: EmploymentStatusResult;
  encryptedPricingParams: string;
  entityUrn: string;
  expireAt: number;
  formattedEmploymentStatus: string;
  formattedExperienceLevel: string;
  formattedIndustries: Record<string, string>;
  formattedJobFunctions: Record<string, string>;
  formattedLocation: string;
  hiringDashboardViewEnabled: boolean;
  industries: Record<string, number>;
  jobApplicationLimitReached: boolean;
  jobFunctions: Record<string, string>;
  jobPosterEntitlements: JobPosterEntitlements;
  jobPostingId: number;
  jobPostingUrl: string;
  jobState: string;
  lastupdate: number;
  listedAt: number;
  locationUrn: string;
  locationVisibility: string;
  new: boolean;
  originalListedAt: number;
  ownerViewEnabled: boolean;
  salaryInsights: SalaryInsights;
  savingInfo: SavingInfo;
  sourceDomain: string;
  talentHubJob: boolean;
  thirdPartySourced: boolean;
  title: string;
  topNRelevanceReasonsInjectionResult: RelevanceReasonsInjection;
  trackingUrn: string;
  views: number;
  workRemoteAllowed: boolean;
  workplaceTypes: Record<string, string>;
  workplaceTypesResolutionResults: Record<string, WorkplaceTypeResult>;
  llm: string;
  ignore: Date;
}

export interface HiringTeamMembersInjection {
  hiringTeamMembers: Record<string, any>;
  entityUrn: string;
}

export interface ApplyMethod {
  comlinkedinvoyagerjobsOffsiteApply: {
    applyStartersPreferenceVoid: boolean;
    companyApplyUrl: string;
    inPageOffsiteApply: boolean;
  };
}

export interface ApplyingInfo {
  closed: boolean;
  entityUrn: string;
  applied: boolean;
}

export interface TextDescription {
  attributes: Record<string, TextAttribute>;
  text: string;
  lang?: string;
}

export interface TextAttribute {
  start: number;
  length: number;
  type: {
    comlinkedinpemberlytextLineBreak?: Record<string, any>;
  };
  attributeKindUnion: {
    lineBreak?: Record<string, any>;
  };
}

export interface CompanyDetails {
  comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany: {
    companyResolutionResult: CompanyResolution;
    company: string;
  };
}

export interface CompanyResolution {
  description: string;
  staffCount: number;
  viewerFollowingJobsUpdates: boolean;
  entityUrn: string;
  staffCountRange: {
    start: number;
    end: number;
  };
  headquarter: CompanyHeadquarter;
  logo: CompanyLogo;
  universalName: string;
  specialities: Record<string, string>;
  followingInfo: FollowingInfo;
  url: string;
  lcpTreatment: boolean;
  industries: Record<string, string>;
  name: string;
  backgroundCoverImage: CompanyImage;
}

export interface CompanyHeadquarter {
  country: string;
  geographicArea: string;
  city: string;
  postalCode: string;
  line1: string;
}

export interface CompanyLogo {
  image: {
    comlinkedincommonVectorImage: VectorImage;
  };
  type: string;
}

export interface CompanyImage {
  image: {
    comlinkedincommonVectorImage: VectorImage;
  };
  cropInfo: {
    x: number;
    width: number;
    y: number;
    height: number;
  };
}

export interface VectorImage {
  artifacts: Record<string, ImageArtifact>;
  rootUrl: string;
}

export interface ImageArtifact {
  width: number;
  fileIdentifyingUrlPathSegment: string;
  expiresAt: number;
  height: number;
}

export interface FollowingInfo {
  entityUrn: string;
  dashFollowingStateUrn: string;
  following: boolean;
  followingType: string;
  followerCount: number;
}

export interface EmploymentStatusResult {
  localizedName: string;
  entityUrn: string;
}

export interface JobPosterEntitlements {
  entitledToViewFreeJobInfo: boolean;
  entitledToPromoteJob: boolean;
  entitledToEditJob: boolean;
  entitledToCopyJob: boolean;
  entitledToAccessJobDashboard: boolean;
  entitledToViewBillingInfo: boolean;
}

export interface SalaryInsights {
  lockModuleShown: boolean;
  salaryExplorerUrl: string;
  insightExists: boolean;
  jobCompensationAvailable: boolean;
}

export interface SavingInfo {
  saved: boolean;
  entityUrn: string;
  dashSaveStateUrn: string;
}

export interface WorkplaceTypeResult {
  localizedName: string;
  entityUrn: string;
}

export interface RelevanceReasonsInjection {
  reasons: Record<string, RelevanceReason>;
}

export interface RelevanceReason {
  jobPostingRelevanceReasonDetail: {
    applicantCount: number;
    relevanceReasonFlavor: string;
  };
  entityUrn: string;
  jobPosting: string;
  details: {
    comlinkedinvoyagerjobssharedHiddenGemRelevanceReasonDetails: Record<string, any>;
  };
}

// Simplified interface for table display
export interface JobPostingDisplay {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  applies: number;
  views: number;
  listedDate: string;
  description: string;
  applyUrl?: string;
}
