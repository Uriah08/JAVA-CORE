// Redux Api configuration // -- API will be called here

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  Job,
  Area,
  EquipmentGroup,
  EquipmentName,
  Component,
} from "@prisma/client";

export type ExtendedJob = Job & {
  user: {
    name: string;
  };
};

type ClientsResponse = {
  clients: User[];
  message: string;
  success: boolean;
};

type JobsResponse = {
  jobs: ExtendedJob[];
  message: string;
  success: boolean;
};

type AreaResponse = {
  areas: Area[];
  message: string;
  success: boolean;
};

type EquipmentGroupResponse = {
  equipmentGroups: EquipmentGroup[];
  message: string;
  success: boolean;
};

type EquipmentNameResponse = {
  equipmentNames: EquipmentName[];
  message: string;
  success: boolean;
};

type ComponentResponse = {
  components: Component[];
  message: string;
  success: boolean;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  tagTypes: [
    "Client",
    "Job",
    "Area",
    "EquipmentGroup",
    "EquipmentName",
    "Component",
  ],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (userData) => ({
        url: "/api/login",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    registerClient: build.mutation({
      query: (data) => ({
        url: "/api/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Client"]
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/api/changePassword",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getClients: build.query<ClientsResponse, void>({
      query: () => ({
        url: "/api/client",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    createJob: build.mutation({
      query: (data) => ({
        url: "/api/job",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Job"],
    }),
    getJobs: build.query<JobsResponse, void>({
      query: () => ({
        url: "/api/job",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    deleteJobs: build.mutation({
      query: (data) => ({
        url: "/api/job",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: build.mutation({
      query: (data) => ({
        url: "/api/job/update",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Job"],
    }),
    getMachineList: build.query<AreaResponse, void>({
      query: () => ({
        url: "/api/machineList",
        method: "GET",
      }),
      providesTags: ["Area"],
    }),

    getEquipmentGroups: build.query<EquipmentGroupResponse, string>({
      query: (areaId) => ({
        url: `/api/machineList/equipmentGroup/${areaId}`,
        method: "GET",
      }),
      providesTags: ["EquipmentGroup"],
    }),

    getEquipmentNames: build.query<EquipmentNameResponse, string>({
      query: (equipmentGroupId) => ({
        url: `/api/machineList/equipmentName/${equipmentGroupId}`,
        method: "GET",
      }),
      providesTags: ["EquipmentName"],
    }),

    getComponents: build.query<ComponentResponse, string>({
      query: (equipmentNameId) => ({
        url: `/api/machineList/component/${equipmentNameId}`,
        method: "GET",
      }),
      providesTags: ["Component"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterClientMutation,
  useChangePasswordMutation,
  useGetClientsQuery,
  useCreateJobMutation,
  useGetJobsQuery,
  useDeleteJobsMutation,
  useUpdateJobMutation,
  useGetMachineListQuery,
  useGetEquipmentGroupsQuery,
  useGetEquipmentNamesQuery,
  useGetComponentsQuery,
} = api;
