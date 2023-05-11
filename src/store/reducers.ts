import { applicationApi, applicationSlice } from "./application/slice";
import { matchesApi, matchesSlice } from "./matches/slice";

export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [matchesApi.reducerPath]: matchesApi.reducer,
  [matchesSlice.name]: matchesSlice.reducer,
} as const;
