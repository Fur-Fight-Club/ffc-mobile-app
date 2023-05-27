import { applicationApi, applicationSlice } from "./application/slice";
import { matchesApi, matchesSlice } from "./matches/slice";
import { walletApi, walletSlice } from "./wallet/slice";

export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [matchesApi.reducerPath]: matchesApi.reducer,
  [matchesSlice.name]: matchesSlice.reducer,
  [walletSlice.name]: walletSlice.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
} as const;
