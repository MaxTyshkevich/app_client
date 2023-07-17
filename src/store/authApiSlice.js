import { serverApi } from './api';

serverApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        path: 'auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});
