import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, cleanCredentials } from './AuthSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(cleanCredentials());
    }
  }
  return result;
};

export const serverApi = createApi({
  reducerPath: 'Api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
