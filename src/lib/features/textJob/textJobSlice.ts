import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobText } from './textJobTruck';
import { JobDescriptionResponse } from '@/types/job-description.types';

interface JobTextState {
  jobId: string;
  loading: boolean;
  error: string | null;
}

interface TextJobState {
  // Cache of job descriptions by jobId
  descriptions: JobDescriptionResponse | null;
  // Current loading/error states by jobId
  loadingStates: JobTextState | null;
}

const initialState: TextJobState = {
  descriptions: null,
  loadingStates: null,
};

const textJobSlice = createSlice({
  name: 'textJob',
  initialState,
  reducers: {
    // Clear description from cache
    clearJobDescription: (state) => {
      state.descriptions = null;
      state.loadingStates = null;
    },
    // Clear all cached descriptions
    clearAllJobDescriptions: (state) => {
      state.descriptions = null;
      state.loadingStates = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobText.pending, (state, action) => {
        const jobId = action.meta.arg;
        state.loadingStates = {
          jobId,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchJobText.fulfilled, (state, action: PayloadAction<JobDescriptionResponse & { jobId: string }>) => {
        const { jobId, _id, text, attributes } = action.payload;
        
        // Store the job description
        state.descriptions = {
          _id,
          text,
          attributes,
        };
        
        // Update loading state
        state.loadingStates = {
          jobId,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchJobText.rejected, (state, action) => {
        const jobId = action.meta.arg;
        state.loadingStates = {
          jobId,
          loading: false,
          error: action.error.message || 'Failed to fetch job description',
        };
      });
  },
});

export const { clearJobDescription, clearAllJobDescriptions } = textJobSlice.actions;

export default textJobSlice.reducer;