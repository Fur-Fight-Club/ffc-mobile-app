import { App } from "./application.model";

export const initialState: App = {
  user: {
    id: -1,
    token: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  loading: false,
  notification_token: "",
};

export const reducerPath = "applicationApi";

export const CACHE_KEY = "App";

export const endpoint = {};