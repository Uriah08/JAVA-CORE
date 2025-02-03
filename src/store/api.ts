// Redux Api configuration // -- API will be called here

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, Job } from '@prisma/client';

type ClientsResponse = {
    clients: User[];
    message: string
    success: boolean
  };

type JobsResponse = {
    jobs: Job[];
    message: string
    success: boolean
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL
    }),
    tagTypes: ["Client", "Job"],
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
        getClients: build.query<ClientsResponse, void>({
            query: () => ({
                url: "/api/client",
                method: "GET"
            }),
            providesTags: ["Client"]
        }),
        createJob: build.mutation({
            query: (data) => ({
                url: "/api/job",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Job"]
        }),
        getJobs: build.query<JobsResponse, void>({
            query: () => ({
                url: "/api/job",
                method: "GET"
            }),
            providesTags: ["Job"]
        }),
        deleteJobs: build.mutation({
            query: (data) => ({
                url: "/api/job",
                method: "DELETE",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Job"]
        })
    })
})

export const { 
    useLoginUserMutation,
    useGetClientsQuery,
    useCreateJobMutation,
    useGetJobsQuery,
    useDeleteJobsMutation
} = api;