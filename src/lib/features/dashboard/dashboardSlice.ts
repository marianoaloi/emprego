import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSalary,
  fetchLangCountry,
  fetchCountryLocal,
  fetchCountries,
  SalaryDashboardItem,
  LangCountryDashboardItem,
  CountryLocalDashboardItem,
  CountryDashboardItem
} from './dashboardTruck';

interface DashboardState {
  salary: {
    data: SalaryDashboardItem[];
    loading: boolean;
    error: string | null;
  };
  langCountry: {
    data: LangCountryDashboardItem[];
    loading: boolean;
    error: string | null;
  };
  countryLocal: {
    data: CountryLocalDashboardItem[];
    loading: boolean;
    error: string | null;
  };
  countries: {
    data: CountryDashboardItem[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: DashboardState = {
  salary: {
    data: [],
    loading: false,
    error: null,
  },
  langCountry: {
    data: [],
    loading: false,
    error: null,
  },
  countryLocal: {
    data: [],
    loading: false,
    error: null,
  },
  countries: {
    data: [],
    loading: false,
    error: null,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.salary.data = [];
      state.langCountry.data = [];
      state.countryLocal.data = [];
      state.countries.data = [];
    },
    clearSalaryData: (state) => {
      state.salary.data = [];
    },
    clearLangCountryData: (state) => {
      state.langCountry.data = [];
    },
    clearCountryLocalData: (state) => {
      state.countryLocal.data = [];
    },
    clearCountriesData: (state) => {
      state.countries.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Salary actions
      .addCase(fetchSalary.pending, (state) => {
        state.salary.loading = true;
        state.salary.error = null;
      })
      .addCase(fetchSalary.fulfilled, (state, action: PayloadAction<SalaryDashboardItem[]>) => {
        state.salary.loading = false;
        state.salary.data = action.payload;
      })
      .addCase(fetchSalary.rejected, (state, action) => {
        state.salary.loading = false;
        state.salary.error = action.error.message || 'Failed to fetch salary data';
      })
      // Language Country actions
      .addCase(fetchLangCountry.pending, (state) => {
        state.langCountry.loading = true;
        state.langCountry.error = null;
      })
      .addCase(fetchLangCountry.fulfilled, (state, action: PayloadAction<LangCountryDashboardItem[]>) => {
        state.langCountry.loading = false;
        state.langCountry.data = action.payload;
      })
      .addCase(fetchLangCountry.rejected, (state, action) => {
        state.langCountry.loading = false;
        state.langCountry.error = action.error.message || 'Failed to fetch language country data';
      })
      // Country Local actions
      .addCase(fetchCountryLocal.pending, (state) => {
        state.countryLocal.loading = true;
        state.countryLocal.error = null;
      })
      .addCase(fetchCountryLocal.fulfilled, (state, action: PayloadAction<CountryLocalDashboardItem[]>) => {
        state.countryLocal.loading = false;
        state.countryLocal.data = action.payload;
      })
      .addCase(fetchCountryLocal.rejected, (state, action) => {
        state.countryLocal.loading = false;
        state.countryLocal.error = action.error.message || 'Failed to fetch country local data';
      })
      // Countries actions
      .addCase(fetchCountries.pending, (state) => {
        state.countries.loading = true;
        state.countries.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<CountryDashboardItem[]>) => {
        state.countries.loading = false;
        state.countries.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries.loading = false;
        state.countries.error = action.error.message || 'Failed to fetch countries data';
      });
  },
});

export const {
  clearDashboardData,
  clearSalaryData,
  clearLangCountryData,
  clearCountryLocalData,
  clearCountriesData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;