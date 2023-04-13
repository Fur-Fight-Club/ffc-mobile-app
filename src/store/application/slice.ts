import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "@store/api";
import { User } from "./application.model";

export const applicationApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    test: builder.mutation<string, string>({
      query: (user) => ({
        url: `${"test"}`,
        method: "POST",
        body: user,
      }),
    }),

    // Edit the user
    editUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `user`,
        method: "PUT",
        body: user,
      }),
    }),
  }),
});

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotificationToken: (state, action: PayloadAction<string>) => {
      state.notification_token = action.payload;
    },
  },
});

export const { setUser, setLoading, setNotificationToken } =
  applicationSlice.actions;

export const { useEditUserMutation } = applicationApi;