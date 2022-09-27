import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Journal, PatchArg, PostArg } from "./types";

export const api = createApi({
  reducerPath: "journalApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["journals"],
  endpoints: (builder) => ({
    getAllJournals: builder.query<Journal[], void>({
      query: () => `/journals`,
      providesTags: ["journals"],
    }),
    postJournal: builder.mutation<Journal, PostArg>({
      query: (arg) => ({
        url: "/journals",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["journals"],
    }),
    patchJournal: builder.mutation<Journal, PatchArg>({
      query: (arg) => ({
        url: "/journals",
        method: "PATCH",
        body: arg,
      }),
      invalidatesTags: ["journals"],
      // async onQueryStarted(
      //   { todos, optimistic },
      //   { dispatch, queryFulfilled }
      // ) {
      //   if (optimistic) {
      //     dispatch(
      //       api.util.updateQueryData("getAllTodos", undefined, (draft) => {
      //         return todos.map((arg) => {
      //           const name = draft.find((elem) => elem.id === arg.id)?.name!;
      //           return { ...arg, name, order: arg.order! };
      //         });
      //       })
      //     );
      //     try {
      //       await queryFulfilled;
      //     } catch {
      //       dispatch(api.util.invalidateTags(["journals"]));
      //     }
      //   }
      // },
    }),
    deleteJournal: builder.mutation<string, { id: number }>({
      query: (id) => ({
        url: "/journals",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["journals"],
    }),
  }),
});

export const {
  useGetAllJournalsQuery,
  usePostJournalMutation,
  usePatchJournalMutation,
  useDeleteJournalMutation,
} = api;

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
