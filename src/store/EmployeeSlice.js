import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PrivateApi } from '../api/axios';
const initialState = {
  employees: [],
  isLoading: false,
  messageError: '',
};

export const fetchEmployee = createAsyncThunk(
  'Employee/fetchEmployee',
  async (_, thunkAPI) => {
    try {
      const response = await PrivateApi.get('/employees', {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'Employee/addEmployee',
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      const response = await PrivateApi.post('/employees', userData, {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const dellEmployee = createAsyncThunk(
  'Employee/dellEmployee',
  async (employeeId, thunkAPI) => {
    try {
      console.log(`dellEmployee`);
      const response = await PrivateApi.delete(
        '/employees',

        {
          data: { id: employeeId },
          signal: thunkAPI.signal,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'Employee/updateEmployee',
  async ({ formData }, thunkAPI) => {
    console.log(formData.get('file'));

    try {
      const response = await PrivateApi.put('/employees', formData, {
        signal: thunkAPI.signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchEmployee.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.employees = [];
        state.messageError = action.payload;
      })

      /* add Emploee */

      .addCase(addEmployee.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.messageError = action.payload;
      })

      /* delete Emploee */

      .addCase(dellEmployee.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(dellEmployee.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.employees = state.employees.filter((emp) => {
          console.log(emp._id !== action.payload._id);
          console.log(emp._id, action.payload._id);
          return emp._id !== action.payload._id;
        });
        console.log(state.employees);
      })
      .addCase(dellEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.messageError = action.payload;
      })

      /* upadate Emploee */

      .addCase(updateEmployee.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const { _id, firstname, lastname } = action.payload;

        state.employees = state.employees.map((emp) =>
          emp._id === _id ? { _id, firstname, lastname } : emp
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.messageError = action.payload;
      }),
});

export const { clearErrorMessage, logout } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
