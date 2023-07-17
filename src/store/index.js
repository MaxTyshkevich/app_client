import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import employeeReducer from './EmployeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});
