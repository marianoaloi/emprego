import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

export interface User {
  email: string;
  name: string;
  photoURL: string;
}

export interface AuthState {
  token: string | undefined;
  user: User | undefined;
  expiresAt: number | undefined; // Unix timestamp in milliseconds
  isAuthenticated: boolean;
}

const COOKIE_KEY = "affito_token"

function getInitialTokenByCookie(): AuthState  {
  const cookie = Cookies.get(COOKIE_KEY);
  if (cookie) {
    try {
      const parsed = JSON.parse(cookie);
      // Check if token has expired
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        // Token expired, clear cookie and return empty state
        Cookies.remove(COOKIE_KEY);
        return {
          token: undefined,
          user: undefined,
          expiresAt: undefined,
          isAuthenticated: false,
        };
      }
      // Ensure all properties exist
      return {
        token: parsed.token,
        user: parsed.user,
        expiresAt: parsed.expiresAt,
        isAuthenticated: !!parsed.token && (!parsed.expiresAt || Date.now() < parsed.expiresAt),
      };
    } catch {
      return {
        token: undefined,
        user: undefined,
        expiresAt: undefined,
        isAuthenticated: false,
      };
    }
  }
  return {
    token: undefined,
    user: undefined,
    expiresAt: undefined,
    isAuthenticated: false,
  };
}

const initialState: AuthState = getInitialTokenByCookie();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; user?: User; expiresIn?: number }>) => {
      const { token, user, expiresIn = 3600 } = action.payload; // Default 1 hour
      
      state.token = token;
      state.user = user || state.user;
      state.expiresAt = Date.now() + (expiresIn * 1000); // Convert seconds to milliseconds
      state.isAuthenticated = true;
      
      // Save to cookie with same expiration
      Cookies.set(COOKIE_KEY, JSON.stringify({
        token: state.token,
        user: state.user,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated
      }), { 
        expires: new Date(state.expiresAt)
      });
    },
    setTokenWithAuthState: (state, action: PayloadAction<AuthState>) => {
      // For backward compatibility with existing usage
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt || (Date.now() + 3600000); // Default 1 hour
      state.isAuthenticated = !!state.token && (!state.expiresAt || Date.now() < state.expiresAt);
      
      Cookies.set(COOKIE_KEY, JSON.stringify(state), { 
        expires: new Date(state.expiresAt)
      });
    },
    clearToken: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.expiresAt = undefined;
      state.isAuthenticated = false;
      Cookies.remove(COOKIE_KEY);
    },
    checkTokenExpiration: (state) => {
      if (state.expiresAt && Date.now() > state.expiresAt) {
        state.token = undefined;
        state.user = undefined;
        state.expiresAt = undefined;
        state.isAuthenticated = false;
        Cookies.remove(COOKIE_KEY);
      }
    },
  },
  selectors: {
    getToken: (state: AuthState) => {
      // Auto-check expiration when accessing token
      if (state.expiresAt && Date.now() > state.expiresAt) {
        return undefined; // Token expired
      }
      return state.token;
    },
    getUser: (state: AuthState) => {
      // Only return user if token is still valid
      if (state.expiresAt && Date.now() > state.expiresAt) {
        return undefined;
      }
      return state.user;
    },
    isAuthenticated: (state: AuthState) => {
      return state.isAuthenticated && !!state.token && 
             (!state.expiresAt || Date.now() < state.expiresAt);
    },
    isTokenExpired: (state: AuthState) => {
      return state.expiresAt ? Date.now() > state.expiresAt : true;
    },
    getTokenExpirationTime: (state: AuthState) => {
      return state.expiresAt;
    },
    getTimeUntilExpiration: (state: AuthState) => {
      if (!state.expiresAt) return 0;
      const timeLeft = state.expiresAt - Date.now();
      return Math.max(0, timeLeft);
    },
  },
});

export const { setToken, setTokenWithAuthState, clearToken, checkTokenExpiration } = authSlice.actions;
export const authReduce = authSlice.reducer;

// Export all selectors
export const getToken = authSlice.selectors.getToken;
export const getUser = authSlice.selectors.getUser;
export const isAuthenticated = authSlice.selectors.isAuthenticated;
export const isTokenExpired = authSlice.selectors.isTokenExpired;
export const getTokenExpirationTime = authSlice.selectors.getTokenExpirationTime;
export const getTimeUntilExpiration = authSlice.selectors.getTimeUntilExpiration;


