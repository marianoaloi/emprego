import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataRequest } from './dataService';
import { fetchData } from './dataTruck';
import { JobPosting, JobPostingDisplay } from '@/types/job.types';

export interface DataItem {
  id: number;
  [key: string]: any;
}

interface DataState {
  items: DataItem[];
  jobPostings: JobPosting[];
  displayJobs: JobPostingDisplay[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  jobPostings: [],
  displayJobs: [],
  loading: false,
  error: null,
};



// Helper function to transform JobPosting to JobPostingDisplay
const transformJobPostingToDisplay = (job: JobPosting): JobPostingDisplay => {
  const companyName = job.companyDetails?.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany?.companyResolutionResult?.name || 'Unknown Company';
  const applyUrl = job.applyMethod?.comlinkedinvoyagerjobsOffsiteApply?.companyApplyUrl;
  
  return {
    id: job._id,
    title: job.title,
    company: companyName,
    location: job.formattedLocation,
    employmentType: job.formattedEmploymentStatus,
    applies: job.applies,
    views: job.views,
    listedDate: new Date(job.listedAt).toLocaleDateString(),
    description: job.description.text,
    applyUrl
  };
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setJobPostings: (state, action: PayloadAction<JobPosting[]>) => {
      state.jobPostings = action.payload;
      state.displayJobs = action.payload.map(transformJobPostingToDisplay);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const payload = action.payload;
        
        // Check if the data is an array of job postings
        if (Array.isArray(payload) && payload.length > 0 && payload[0]._id) {
          const jobPostings = payload as JobPosting[];
          state.jobPostings = jobPostings;
          state.displayJobs = jobPostings.map(transformJobPostingToDisplay);
        } else {
          // Fallback to generic data items
          state.items = payload;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setJobPostings } = dataSlice.actions;

export default dataSlice.reducer;