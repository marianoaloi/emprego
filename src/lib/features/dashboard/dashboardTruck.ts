// Dashboard data structure interfaces

import { JobSearchFilter } from "@/types/job.filter.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { countries, countryLocal, langCountry, salaryRequest } from "./dashboardService";

// Salary dashboard data - likely contains salary statistics
export interface SalaryDashboardItem {
  _id: string;
  title: string;
  workplaceTypes: string;
  standardizedTitle: string;
  employmentStatus: string;
  country: string;
  companyId: string;
  lang: string;
  lastupdate: string;
  minSalary: string;
  maxSalary: string;
  payPeriod: string;
  currencyCode: string;
  compensationType: string;
  closed: boolean;
}

// Language and country dashboard data - likely contains language/country statistics
export interface LangCountryDashboardItem {
  lang: string; 
  country: string;
  count: number;
}

// Country local dashboard data - likely contains local/regional country statistics
export interface CountryLocalDashboardItem {
  _id: string;
  count: number;
  deleted: number;
  wait: number;
  appliedByMe: number;
}

// Countries dashboard data - likely contains general country statistics
export interface CountryDashboardItem {
  _id: string;
  count: number;
  deleted: number;
  wait: number;
  appliedByMe: number;
}

// Dashboard API response types
export type SalaryDashboardResponse = SalaryDashboardItem[];
export type LangCountryDashboardResponse = LangCountryDashboardItem[];
export type CountryLocalDashboardResponse = CountryLocalDashboardItem[];
export type CountryDashboardResponse = CountryDashboardItem[];

export const fetchSalary = createAsyncThunk(
  'data/fetchSalary',
  async (filter?: JobSearchFilter) => {
    return await salaryRequest(filter);
  }
);
export const fetchLangCountry = createAsyncThunk(
  'data/fetchLangCountry',
  async (filter?: JobSearchFilter) => {
    return await langCountry(filter);
  }
);
export const fetchCountryLocal = createAsyncThunk(
  'data/fetchCountryLocal',
  async (filter?: JobSearchFilter) => {
    return await countryLocal(filter);
  }
);
export const fetchCountries = createAsyncThunk(
  'data/fetchCountries',
  async (filter?: JobSearchFilter) => {
    return await countries(filter);
  }
);