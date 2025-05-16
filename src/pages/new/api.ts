import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number;
  name: string;
}

export interface Post {
  userId: number;
  title: string;
  body: string;
}

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
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
  }),
});

export const { useGetUsersQuery, useAddPostMutation } = jsonPlaceholderApi;
