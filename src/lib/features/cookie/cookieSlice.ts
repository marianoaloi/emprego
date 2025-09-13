import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCookies, updateOpportunity } from './cookieTruck';
import { Cookie } from '@/types/cookies.types';

interface CookieState {
  cookies: Cookie[];
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
}

const initialState: CookieState = {
  cookies: [],
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    setCookies: (state, action: PayloadAction<Cookie[]>) => {
      state.cookies = action.payload;
    },
    clearCookies: (state) => {
      state.cookies = [];
    },
    addCookie: (state, action: PayloadAction<Cookie>) => {
      state.cookies.push(action.payload);
    },
    removeCookie: (state, action: PayloadAction<string>) => {
      state.cookies = state.cookies.filter(cookie => cookie.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cookies actions
      .addCase(fetchCookies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCookies.fulfilled, (state, action: PayloadAction<Cookie[] | null>) => {
        state.loading = false;
        state.cookies = action.payload || [];
      })
      .addCase(fetchCookies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cookies';
      })
      // Update Opportunity actions
      .addCase(updateOpportunity.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateOpportunity.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateOpportunity.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error.message || 'Failed to update opportunity';
      });
  },
});

export const { setCookies, clearCookies, addCookie, removeCookie } = cookieSlice.actions;

export default cookieSlice.reducer;