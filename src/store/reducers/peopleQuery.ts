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
        params: { // параметры запроса(в URL)
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
    addToFavouritePerson: build.mutation<IPerson, IPerson>({
      query: (person) => ({
        url: `/people/${person.id}`,
        method: 'PUT',
        body: person
      }),
      invalidatesTags: ['People']
    }),
    removeFromFavouritePerson: build.mutation<IPerson, IPerson>({
      query: (person) => ({
        url: `/people/${person.id}`,
        method: 'PUT',
        body: person
      }),
      invalidatesTags: ['People']
    })
  })
})