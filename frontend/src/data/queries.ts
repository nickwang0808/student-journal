import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Journal, PatchArg, PostArg } from "./types";

const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://fullstackjournalbackend-dev.us-east-1.elasticbeanstalk.com/"
    : "http://localhost:8000";

// const serverURL = "http://localhost:8000";

export const api = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL,
  }),
  tagTypes: ["journals"],
  endpoints: (builder) => ({
    getQuote: builder.query<any, void>({
      query: () => ({
        url: "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random",
      }),
    }),
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
    }),
    deleteJournal: builder.mutation<string, { id: number }>({
      query: (arg) => ({
        url: "/journals",
        method: "DELETE",
        body: arg,
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
  useGetQuoteQuery,
} = api;

export const getQuote = async () => {
  // const url = "https://zenquotes.io/api/random";

  const url =
    "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random";

  const res = await fetch(url);

  const data = await res.json();
  return data;
};

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
