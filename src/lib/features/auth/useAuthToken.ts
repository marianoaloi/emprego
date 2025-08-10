import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { 
  getToken, 
  getUser, 
  isAuthenticated, 
  isTokenExpired, 
  getTimeUntilExpiration,
  clearToken,
  checkTokenExpiration 
} from './authSlice';

/**
 * Custom hook for managing authentication token with automatic expiration handling
 */
export const useAuthToken = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const user = useAppSelector(getUser);
  const authenticated = useAppSelector(isAuthenticated);
  const tokenExpired = useAppSelector(isTokenExpired);
  const timeUntilExpiration = useAppSelector(getTimeUntilExpiration);

  useEffect(() => {
    // Check token expiration on mount and when dependencies change
    if (tokenExpired && token) {
      dispatch(clearToken());
      return;
    }

    if (!timeUntilExpiration || timeUntilExpiration <= 0) return;

    // Set timeout to automatically clear token when it expires
    const timeoutId = setTimeout(() => {
      dispatch(checkTokenExpiration());
    }, timeUntilExpiration);

    return () => clearTimeout(timeoutId);
  }, [timeUntilExpiration, tokenExpired, token, dispatch]);

  // Check expiration every minute for active sessions
  useEffect(() => {
    if (!token) return;

    const intervalId = setInterval(() => {
      dispatch(checkTokenExpiration());
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [token, dispatch]);

  return {
    token,
    user,
    isAuthenticated: authenticated,
    isTokenExpired: tokenExpired,
    timeUntilExpiration,
    clearToken: () => dispatch(clearToken()),
  };
};

/**
 * Hook for components that need to ensure a valid token before making API calls
 */
export const useValidToken = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const tokenExpired = useAppSelector(isTokenExpired);

  useEffect(() => {
    if (tokenExpired && token) {
      dispatch(clearToken());
    }
  }, [tokenExpired, token, dispatch]);

  // Return null if token is expired, otherwise return the token
  return tokenExpired ? null : token;
};