import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/data/dataSlice';
import filterReducer from './features/filter/filterSlice';
import textJobReducer from './features/textJob/textJobSlice';
import skillsReducer from './features/skill/skillsSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import cookieReducer from './features/cookie/cookieSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
    textJob: textJobReducer,
    skills: skillsReducer,
    dashboard: dashboardReducer,
    cookie: cookieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;