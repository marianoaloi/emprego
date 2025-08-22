import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData, fetchDataCount, appliedbyme, closeJob, ignoreJob, waitJob } from './dataTruck';
import { JobPosting } from '@/types/job.types';
import { JobActionResponse } from './dataService';

export interface DataItem {
  id: number;
  [key: string]: any;
}

interface DataState {
  items: DataItem[];
  jobPostings: JobPosting[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
  actionError: string | null;
  totalCount: number;
  countLoading: boolean;
  countError: string | null;
}

const initialState: DataState = {
  items: [],
  jobPostings: [],
  loading: false,
  error: null,
  actionLoading: false,
  actionError: null,
  totalCount: 0,
  countLoading: false,
  countError: null,
};

// Helper function to update job posting in state
const updateJobPosting = (state: DataState, jobId: string, updates: Partial<JobPosting>) => {
  const jobIndex = state.jobPostings.findIndex(job => job._id === jobId);
  if (jobIndex !== -1) {
    state.jobPostings[jobIndex] = { ...state.jobPostings[jobIndex], ...updates };
  }
};




const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setJobPostings: (state, action: PayloadAction<JobPosting[]>) => {
      state.jobPostings = action.payload;
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
        } else {
          // Fallback to generic data items
          state.items = payload;
          state.jobPostings = [];
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      // Applied By Me actions
      .addCase(appliedbyme.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(appliedbyme.fulfilled, (state, action: PayloadAction<JobActionResponse & { jobId: string; undo?: boolean }>) => {
        state.actionLoading = false;
        if (action.payload.modifiedCount === 1) {
          const { jobId, undo } = action.payload;
          const updates: Partial<JobPosting> = undo
            ? { appliedbyme: undefined, applied: false }
            : { appliedbyme: new Date().toISOString(), applied: true };
          updateJobPosting(state, jobId, updates);
        }
      })
      .addCase(appliedbyme.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.error.message || 'Failed to mark job as applied';
      })
      // Close Job actions
      .addCase(closeJob.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(closeJob.fulfilled, (state, action: PayloadAction<JobActionResponse & { jobId: string; undo?: boolean }>) => {
        state.actionLoading = false;
        if (action.payload.modifiedCount === 1) {
          const { jobId, undo } = action.payload;
          const updates: Partial<JobPosting> = { closed: !undo };
          updateJobPosting(state, jobId, updates);
        }
      })
      .addCase(closeJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.error.message || 'Failed to close job';
      })
      // Ignore Job actions
      .addCase(ignoreJob.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(ignoreJob.fulfilled, (state, action: PayloadAction<JobActionResponse & { jobId: string; undo?: boolean }>) => {
        state.actionLoading = false;
        if (action.payload.modifiedCount === 1) {
          const { jobId, undo } = action.payload;
          const updates: Partial<JobPosting> = undo
            ? { ignore: undefined }
            : { ignore: new Date().toISOString() };
          updateJobPosting(state, jobId, updates);
        }
      })
      .addCase(ignoreJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.error.message || 'Failed to ignore job';
      })
      // Wait Job actions
      .addCase(waitJob.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(waitJob.fulfilled, (state, action: PayloadAction<JobActionResponse & { jobId: string; undo?: boolean }>) => {
        state.actionLoading = false;
        if (action.payload.modifiedCount === 1) {
          const { jobId, undo } = action.payload;
          const updates: Partial<JobPosting> = undo
            ? { wait: undefined }
            : { wait: new Date().toISOString() };
          updateJobPosting(state, jobId, updates);
        }
      })
      .addCase(waitJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.error.message || 'Failed to mark job as wait';
      })
      // Fetch Data Count actions
      .addCase(fetchDataCount.pending, (state) => {
        state.countLoading = true;
        state.countError = null;
      })
      .addCase(fetchDataCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.countLoading = false;
        state.totalCount = action.payload;
      })
      .addCase(fetchDataCount.rejected, (state, action) => {
        state.countLoading = false;
        state.countError = action.error.message || 'Failed to fetch data count';
      });
  },
});

export const { setJobPostings } = dataSlice.actions;

export default dataSlice.reducer;