import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "@store/api";
import {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  UpdateRequest,
  UpdateResponse,
  User,
} from "./application.model";
import { GenericApiError } from "@store/store.model";
import { loginErrorsHandler } from "./errors/login.error";
import Toast from "react-native-toast-message";
import { registerErrorsHandler } from "./errors/register.error";
import { askResetPasswordErrorsHandler } from "./errors/ask-reset.error";

export const applicationApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user) => ({
        url: `${endpoint.login}`,
        method: "POST",
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setToken(data.access_token));
          Toast.show({
            type: "success",
            text1: "👋 Bienvenue !",
            text2: "Ravi de vous revoir",
          });
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          loginErrorsHandler(error);
        }
      },
    }),

    // Register
    register: builder.mutation<User, RegisterRequest>({
      query: (user) => ({
        url: `${endpoint.register}`,
        method: "POST",
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setUser(data));
          Toast.show({
            type: "success",
            text1: "👋 Bienvenue !",
            text2: "Bienvenue sur Fury Fight Club !",
          });
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          registerErrorsHandler(error);
        }
      },
    }),

    // Ask reset password
    askResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: `${endpoint.askResetPassword}`,
        method: "POST",
        body: { email },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          Toast.show({
            type: "success",
            text1: "📨 Mail envoyé !",
            text2: "Vérifiez votre boîte mail !",
          });
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          askResetPasswordErrorsHandler(error);
        }
      },
    }),

    // User's informations route
    getUser: builder.query<MeResponse, void>({
      query: () => ({
        url: `${endpoint.me}`,
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setUserInformation(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          Toast.show({
            type: "error",
            text1: "🚨 Erreur !",
            text2: "Une erreur est survenue, veuillez réessayer",
          });
        }
      },
    }),

    // update user
    UpdateUser: builder.mutation<UpdateResponse, UpdateRequest>({
      query: (user) => ({
        url: `${endpoint.update}`,
        method: "PATCH",
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          // update state user with new data
          dispatch(setUpdateUser(data));
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          Toast.show({
            type: "error",
            text1: "🚨 Erreur !",
            text2: "Une erreur est survenue, veuillez réessayer",
          });
        }
      },
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
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserInformation: (state, action: PayloadAction<MeResponse>) => {
      state.user = {
        ...action.payload.user,
        Invoice: action.payload.invoices,
        MatchMessage: [],
        Monster: [],
        StripeAccount: action.payload.stripeAccount,
        Wallet: action.payload.wallet[0],
        transaction: action.payload.transaction,
      };
    },
    setUpdateUser: (
      state,
      action: PayloadAction<{ firstname: string; lastname: string }>
    ) => {
      const { firstname, lastname } = action.payload;
      firstname && (state.user.firstname = firstname);
      lastname && (state.user.lastname = lastname);
    },
  },
});

export const {
  setUser,
  setLoading,
  setNotificationToken,
  setToken,
  setUserInformation,
  setUpdateUser,
} = applicationSlice.actions;

export const {
  useLoginMutation,
  useRegisterMutation,
  useAskResetPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = applicationApi;
