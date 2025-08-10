import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobDescription } from "../data/dataService";

export const fetchJobText = createAsyncThunk(
  'textJob/fetchJobText',
  async (jobId: string) => {
    const response = await fetchJobDescription(jobId);
    if (!response) {
      throw new Error('Job description not found');
    }
    return { jobId, ...response };
  }
);