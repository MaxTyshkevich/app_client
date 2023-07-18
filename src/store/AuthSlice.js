import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios, { PrivateApi } from '../api/axios';
const initialState = {
  name: null,
  roles: [],
  isLoading: false,
  accessToken: null,
  messageError: '',
};

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const userInfo = jwt_decode(response.data.accessToken).userInfo;
      userInfo.accessToken = response.data.accessToken;

      return userInfo;
    } catch (error) {
      if (!error?.response) {
        return thunkAPI.rejectWithValue(`No Server Response`);
      }
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(`Missing Username or Password`);
      }

      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(`Unauthrozed`);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
      });

      const userInfo = jwt_decode(response.data.accessToken).userInfo;
      userInfo.accessToken = response.data.accessToken;

      return userInfo;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await PrivateApi.get('/logout');

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.name = action.payload.username;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken;
    },

    logOut: (state) => {
      state = initialState;
    },
  },
});

export const { clearErrorMessage, setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.name;
export const selectCurrentToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
