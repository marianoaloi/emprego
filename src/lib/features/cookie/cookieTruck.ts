import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, updateOpportunities } from "./CookieService";
import { JobPosting } from "@/types/job.types";

export const fetchCookies = createAsyncThunk(
  'cookie/fetchCookies',
  async (token: string) => {
    return await getCookie(token);
  }
);

export const updateOpportunity = createAsyncThunk(
  'cookie/updateOpportunity',
  async ({ opportunity, token }: { opportunity: JobPosting; token: string }) => {
    return await updateOpportunities(opportunity, token);
  }
);