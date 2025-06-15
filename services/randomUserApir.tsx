import { UserSchema } from "@/lib/validators/user-schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const randomUserApi = createApi({
  reducerPath: "randomUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://randomuser.me/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserSchema, number>({
      query: (page = 1) => `api/?page=${page}&results=12`,
    }),
  }),
});
export const { useGetUsersQuery } = randomUserApi;
