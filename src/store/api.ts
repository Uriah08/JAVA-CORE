// Redux Api configuration // -- API will be called here

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Client } from '@prisma/client';

type ClientsResponse = {
    clients: Client[];
    message: string
    success: boolean
  };

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL
    }),
    tagTypes: ["Client"],
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (userData) => ({
                url: "/api/login",
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        createClient: build.mutation({
            query: (data) => ({
                url: "/api/client",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Client"]
        }),
        getClients: build.query<ClientsResponse, void>({
            query: () => ({
                url: "/api/client",
                method: "GET"
            }),
            providesTags: ["Client"]
        })
    })
})

export const { 
    useLoginUserMutation,
    useCreateClientMutation,
    useGetClientsQuery
} = api;