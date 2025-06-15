import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./axiosInstance";
import { CreateUserSchema } from "@/lib/validators/user-schema";
import axios from "axios";

interface AxiosBaseQueryArgs {
  url: string;
  method: string;
  data?: Partial<CreateUserSchema>;
}
const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs> = async ({
  url,
  method,
  data,
}) => {
  try {
    const result = await axiosInstance({ url, method, data });
    return { data: result };
  } catch (axiosError) {
    if (axios.isAxiosError(axiosError)) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
    return {
      error: {
        status: "UNKNOWN_ERROR",
        data: String(axiosError),
      },
    };
  }
};
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<CreateUserSchema[], void>({
      query: () => ({ url: "/users", method: "get" }),
      providesTags: ["Users"],
    }),
    addUser: build.mutation<CreateUserSchema, Partial<CreateUserSchema>>({
      query: (user) => ({ url: "/users", method: "post", data: user }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation<CreateUserSchema, Partial<CreateUserSchema>>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "put",
        data: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<void, number>({
      query: (id) => ({ url: `/users/${id}`, method: "delete" }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
