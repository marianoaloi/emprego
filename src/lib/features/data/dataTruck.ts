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
  async ({ jobId, undo }: { jobId: string; undo?: boolean }) => {
    const response = await appliedbymeRequest(jobId, undo);
    return { ...response, jobId, undo };
  }
);

export const closeJob = createAsyncThunk(
  'data/closeJob',
  async ({ jobId, undo }: { jobId: string; undo?: boolean }) => {
    const response = await CloseRequest(jobId, undo);
    return { ...response, jobId, undo };
  }
);

export const ignoreJob = createAsyncThunk(
  'data/ignoreJob',
  async ({ jobId, undo }: { jobId: string; undo?: boolean }) => {
    const response = await IgnoreRequest(jobId, undo);
    return { ...response, jobId, undo };
  }
);

export const waitJob = createAsyncThunk(
  'data/waitJob',
  async ({ jobId, undo }: { jobId: string; undo?: boolean }) => {
    const response = await WaitRequest(jobId, undo);
    return { ...response, jobId, undo };
  }
);

