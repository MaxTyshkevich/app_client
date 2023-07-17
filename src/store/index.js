import { configureStore } from '@reduxjs/toolkit';
import { serverApi } from './api';
import authReducer from './AuthSlice';
import employeeReducer from './EmployeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (gDM) => gDM().concat(serverApi.middleware),
  devTools: true,
});

/* 
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import employeeReducer from './EmployeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});

*/
