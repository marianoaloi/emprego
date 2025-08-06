import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataRequest } from "./dataService";
import { JobSearchFilter } from "@/types/job.filter.types";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (filter?: JobSearchFilter) => {
    return await DataRequest(filter);
  }
);

