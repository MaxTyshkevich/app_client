import { serverApi } from './api';

serverApi.injectEndpoints({
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employees',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id: id }) => ({ type: 'Employee', id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),

    addEmployee: builder.mutation({
      query: (body) => ({
        method: 'POST',
        url: '/employees',
        body,
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),

    updateEmployee: builder.mutation({
      query: (dto) => ({
        method: 'PUT',
        url: '/employees',
        body: dto,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),

      invalidatesTags: (result, error, dto) => [
        { type: 'Employee', id: dto._id },
      ],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: '/employees',
        body: { id },
      }),

      invalidatesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = serverApi;
