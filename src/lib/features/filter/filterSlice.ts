import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobSearchFilter, DEFAULT_JOB_FILTER } from '@/types/job.filter.types';

import Cookies from "js-cookie";


const FILTER_COOKIE_KEY = "employment_filter";

function getInitialFilter(): JobSearchFilter {
  const cookie = Cookies.get(FILTER_COOKIE_KEY);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return DEFAULT_JOB_FILTER;
    }
  }
  return DEFAULT_JOB_FILTER;
}

interface FilterState {
  filters: JobSearchFilter;
}

const initialState: FilterState = {
  filters: getInitialFilter() || DEFAULT_JOB_FILTER,
};



const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<JobSearchFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
      Cookies.set(FILTER_COOKIE_KEY, JSON.stringify(state.filters));
    },
    updateFilter: (state, action: PayloadAction<{ field: keyof JobSearchFilter; value: any }>) => {
      const { field, value } = action.payload;
      state.filters = { ...state.filters, [field]: value };
      Cookies.set(FILTER_COOKIE_KEY, JSON.stringify(state.filters));
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_JOB_FILTER;
      Cookies.set(FILTER_COOKIE_KEY, JSON.stringify(state.filters));
    },
    clearFilters: (state) => {
      state.filters = {};
      Cookies.remove(FILTER_COOKIE_KEY)
    },
  },
});

export const { setFilter, updateFilter, resetFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;


