import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPerson } from "../../models/IPerson";



export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['People'],
  endpoints: (build) => ({
    fetchPeople: build.query<IPerson[], number>({
      query: (limit: number = 30) => ({
        url: '/people',
        params: {
          _limit: limit,
        }
      }),
      providesTags: result => ['People'],
    }),
    deletePerson: build.mutation<IPerson, IPerson>({
      query: (person) => ({
        url: `/people/${person.id}`,
        method: 'DELETE',
        body: person
      }),
      invalidatesTags: ['People']
    }),
    toggleFavouritePerson: build.mutation<IPerson, IPerson>({
      query: (person) => ({
        url: `/people/${person.id}`,
        method: 'PUT',
        body: person
      }),
      invalidatesTags: ['People']
    }),
    getPersonById: build.query<IPerson, string | undefined>({
      query: (id) => ({
        url: `/people/${id}`,
      }),
      providesTags: result => ['People'],
    }),
  })
})