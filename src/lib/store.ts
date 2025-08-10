import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/data/dataSlice';
import filterReducer from './features/filter/filterSlice';
import textJobReducer from './features/textJob/textJobSlice';
import { authReduce } from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
    textJob: textJobReducer,
    auth:authReduce
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;