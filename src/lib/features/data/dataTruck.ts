import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataRequest, DataCountRequest, appliedbymeRequest, CloseRequest, IgnoreRequest, WaitRequest } from "./dataService";
import { JobSearchFilter } from "@/types/job.filter.types";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (filter?: JobSearchFilter) => {
    return await DataRequest(filter);
  }
);

export const fetchDataCount = createAsyncThunk(
  'data/fetchDataCount',
  async (filter?: JobSearchFilter) => {
    return await DataCountRequest(filter);
  }
);

export const appliedbyme = createAsyncThunk(
  'data/appliedbyme',
  async ({ jobId, undo, token }: { jobId: string; undo: boolean | undefined, token : string | null }) => {
    const response = await appliedbymeRequest(jobId, undo, token);
    return { ...response, jobId, undo, token };
  }
);

export const closeJob = createAsyncThunk(
  'data/closeJob',
  async ({ jobId, undo, token }: { jobId: string; undo: boolean | undefined, token : string | null }) => {
    const response = await CloseRequest(jobId, undo, token);
    return { ...response, jobId, undo, token };
  }
);

export const ignoreJob = createAsyncThunk(
  'data/ignoreJob',
  async ({ jobId, undo, token }: { jobId: string; undo: boolean | undefined, token : string | null }) => {
    const response = await IgnoreRequest(jobId, undo, token);
    return { ...response, jobId, undo, token };
  }
);

export const waitJob = createAsyncThunk(
  'data/waitJob',
  async ({ jobId, undo, token }: { jobId: string; undo: boolean | undefined, token : string | null }) => {
    const response = await WaitRequest(jobId, undo, token);
    return { ...response, jobId, undo, token };
  }
);

