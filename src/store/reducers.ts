import { applicationApi, applicationSlice } from "./application/slice";


export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
} as const;