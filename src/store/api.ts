// Redux Api configuration // -- API will be called here

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL
    }),
    tagTypes: [],
    endpoints: (build) => ({})
})

export const { } = api;