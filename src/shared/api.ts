import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
    }),
    getPosts: builder.query<Post[], { start: number; limit: number }>({
      query: ({ start = 0, limit = 10 }) => `/posts?_start=${start}&_limit=${limit}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetUsersQuery, useAddPostMutation, useGetPostsQuery } = baseApi;
