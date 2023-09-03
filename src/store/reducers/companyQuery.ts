import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICompany } from "../../models/ICompany";


export const companyAPI = createApi({
  reducerPath: 'companyAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Companies'],
  endpoints: (build) => ({
    fetchCompanies: build.query<ICompany[], number>({
      query: (limit: number = 100) => ({
        url: '/companies',
        params: {
          _limit: limit,
        }
      }),
      providesTags: result => ['Companies']
    }),
    deleteCompany: build.mutation<ICompany, ICompany>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'DELETE',
        body: company
      }),
      invalidatesTags: ['Companies']
    }),
    addToFavouritesCompanies: build.mutation<ICompany, ICompany>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'PUT',
        body: company
      }),
      invalidatesTags: ['Companies']
    }),
    removeFromFavouritesCompanies: build.mutation<ICompany, ICompany>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: 'PUT',
        body: company
      }),
      invalidatesTags: ['Companies']
    }),
  })
})