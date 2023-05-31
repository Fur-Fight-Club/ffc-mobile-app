import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { endpoint, initialState, reducerPath } from "./constants";
import { baseQuery } from "@store/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Monster } from "./monsters.model";
import { setLoading } from "@store/application/slice";
import { getMonstersHandler } from "./errors/get";
import { GenericApiError } from "@store/store.model";
import { createMonsterErrorsHandler } from "./errors/create";
import { updateMonstersHandler } from "./errors/update";
import { deleteMonstersHandler } from "./errors/delete";

export const monstersApi = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    // Get monsters
    getMonsters: builder.query<Monster[], void>({
      query: () => ({
        url: endpoint.get,
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setMonsters(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Get monster by id
    getMonsterById: builder.query<Monster, number>({
      query: (id) => ({
        url: endpoint.getOne(id),
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Create monster
    createMonster: builder.mutation<
      Monster,
      Pick<
        Monster,
        "name" | "weight" | "fk_user" | "weight_category" | "monster_type"
      >
    >({
      query: (monster) => ({
        url: endpoint.create,
        method: "POST",
        body: monster,
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          createMonsterErrorsHandler(error);
        }
      },
    }),

    // Patch monster
    updateMonster: builder.mutation<
      Monster,
      Pick<
        Monster,
        "name" | "weight" | "id" | "weight_category" | "monster_type"
      > & { id: number }
    >({
      query: (monster) => ({
        url: endpoint.patch(monster.id),
        method: "PATCH",
        body: monster,
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          updateMonstersHandler(error);
        }
      },
    }),

    // Delete monster
    deleteMonster: builder.mutation<void, Monster>({
      query: (monster) => ({
        url: endpoint.delete(monster.id),
        method: "DELETE",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          deleteMonstersHandler(error);
        }
      },
    }),
  }),
});

export const monstersSlice = createSlice({
  name: "monsters",
  initialState,
  reducers: {
    setMonsters: (state, action: PayloadAction<Monster[]>) => {
      state = action.payload;
    },
  },
});

export const {
  useGetMonstersQuery,
  useGetMonsterByIdQuery,
  useCreateMonsterMutation,
  useUpdateMonsterMutation,
  useDeleteMonsterMutation,
} = monstersApi;

export const { setMonsters } = monstersSlice.actions;