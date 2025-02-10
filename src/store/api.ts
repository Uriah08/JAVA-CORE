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

type SearchJobsResponse = {
  jobs?: ExtendedJob[];
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

type EquipmentGroupResponse = { equipmentGroups: EquipmentGroup[] };
type EquipmentNameResponse = { equipmentNames: EquipmentName[] };
type ComponentResponse = { components: Component[] };

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
      invalidatesTags: ["Client"],
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
    createMachineList: build.mutation({
      query: (data) => ({
        url: "/api/machineList",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Area"],
    }),
    softDeleteMachineList: build.mutation({
      query: (ids) => ({
        url: "/api/machineList/delete",
        method: "POST",
        body: ids,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Area"],
    }),
    getEquipmentGroups: build.query<EquipmentGroupResponse, string>({
      query: (areaId) => `/api/machineList/equipmentGroupList?areaId=${areaId}`,
      providesTags: ["EquipmentGroup"],
    }),
    createEquipmentGroup: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EquipmentGroup"],
    }),
    softDeleteEquipmentGroups: build.mutation({
      query: (ids) => ({
        url: "/api/machineList/equipmentGroupList/delete",
        method: "POST",
        body: ids,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EquipmentGroup"],
    }),
    getEquipmentNames: build.query<EquipmentNameResponse, string>({
      query: (groupId) =>
        `/api/machineList/equipmentGroupList/equipmentNameList?groupId=${groupId}`,
      providesTags: ["EquipmentName"],
    }),
    createEquipmentName: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EquipmentName"],
    }),
    softDeleteEquipmentNames: build.mutation({
      query: (ids) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList/delete",
        method: "POST",
        body: ids,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EquipmentName"],
    }),
    getComponents: build.query<ComponentResponse, string>({
      query: (equipmentNameId) =>
        `/api/machineList/equipmentGroupList/equipmentNameList/component?equipmentNameId=${equipmentNameId}`,
      providesTags: ["Component"],
    }),
    createComponent: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList/component",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Component"],
    }),
    softDeleteComponents: build.mutation({
      query: (ids) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList/component/delete",
        method: "POST",
        body: ids,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Component"],
    }),
    searchJobNumber: build.query<SearchJobsResponse, string>({
      query: (jobNumber) => `/api/search/job-number?job=${jobNumber}`,
      providesTags: ["Job"],
    }),
    createRoute: build.mutation({
      query: (data) => ({
        url: "/api/createRoute",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Area", "EquipmentGroup", "EquipmentName", "Component"],
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
  useCreateMachineListMutation,
  useSoftDeleteMachineListMutation,
  useLazyGetEquipmentGroupsQuery,
  useCreateEquipmentGroupMutation,
  useSoftDeleteEquipmentGroupsMutation,
  useLazyGetEquipmentNamesQuery,
  useCreateEquipmentNameMutation,
  useSoftDeleteEquipmentNamesMutation,
  useLazyGetComponentsQuery,
  useCreateComponentMutation,
  useSoftDeleteComponentsMutation,
  useSearchJobNumberQuery,
  useCreateRouteMutation,
} = api;
