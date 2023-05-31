import { Matches } from "./matches.model";

export const initialState: Matches = {
  matches: [],
};

export const reducerPath = "matchesApi";

export const CACHE_KEY = "Matches";

export const endpoint = {
  getAll: "/match",
  getOne: (id: number) => `/match/${id}`,
  sendMessage: (id: number) => `/match/${id}/message`,
};
