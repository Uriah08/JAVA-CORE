// Redux Api configuration // -- API will be called here

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  Job,
  Area,
  EquipmentGroup,
  EquipmentName,
  Component,
  RouteList,
  RouteMachineList,
  RouteComponent,
  RouteComponentComment,
  RouteComponentRecommendation,
  RouteComponentTemperature,
  RouteComponentOilAnalysis,
  RouteComponentDetails,
  RouteComponentAction,
} from "@prisma/client";

export type ExtendedJob = Job & {
  user: {
    id: string;
    name: string;
  };
  routeList: {
    routeName: string;
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

type RouteResponse = {
  routes: RouteList[];
  message: string;
  success: boolean;
};

export type ExtendedRouteMachineList = RouteMachineList & {
  routeEquipmentNames: {
    id: string;
    equipmentName: {
      name: string;
    };
  }[];
};

type RouteMachineListResponse = {
  routeMachineList: ExtendedRouteMachineList[];
};

export type ExtendedRouteComponent = RouteComponent & {
  component: {
    id: string;
    name: string;
  };
};

type RouteComponentResponse = {
  routeComponents: ExtendedRouteComponent[];
  message: string;
  success: boolean;
};

type RouteComponentCommentResponse = {
  data: RouteComponentComment[];
  message: string;
  success: boolean;
};

type RouteComponentRecommendationResponse = {
  data: RouteComponentRecommendation[];
  message: string;
  success: boolean;
};

type RouteComponentTemperatureResponse = {
  data: RouteComponentTemperature[];
  message: string;
  success: boolean;
};

type RouteComponentOilAnalysisResponse = {
  data: RouteComponentOilAnalysis[];
  message: string;
  success: boolean;
};

type RouteComponentDetailsResponse = {
  data: RouteComponentDetails[];
  message: string;
  success: boolean;
};

export type ExtendedClientRouteEquipment = EquipmentName & {
  components: {
    id: string;
    name: string;
    routeComponent: {
      id: string;
    };
  };
};

type SearchClientRouteEquipmentResponse = {
  getEquipmentName?: ExtendedClientRouteEquipment[];
};

export type ExtendedClientRouteComponent = RouteComponent & {
  comments: {
    id: string;
    severity: string;
    comment: string;
    createdAt: Date;
  };
};

type ClientRouteComponentResponse = {
  routeComponentComments: ExtendedClientRouteComponent[];
  message: string;
  success: boolean;
};

export type ExtendedClientRouteConponentRecommendation = RouteComponent & {
  recommendations: {
    id: string;
    priority: string;
    recommendation: string;
    createdAt: Date;
  }[];
};

type ClientRouteComponentRecommendationResponse = {
  routeComponentRecommendation: ExtendedClientRouteConponentRecommendation[];
  message: string;
  success: boolean;
};

type ClientComponentActionResponse = {
  routeComponentAction: RouteComponentAction[];
  woNumbers: string[];
  message: string;
  success: boolean;
};

type AdminComponentActionResponse = {
  routeComponentAction: RouteComponentAction[];
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
    "RouteList",
    "RouteMachineList",
    "RouteComponent",
    "RouteComponentComment",
    "RouteComponentRecommendation",
    "RouteComponentTemperature",
    "RouteComponentOilAnalysis",
    "RouteComponentDetails",
    "RouteComponentAction",
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
    getClientJobs: build.query<JobsResponse, string>({
      query: (clientId) => `/api/job/id?clientId=${clientId}`,
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
    updateMachineList: build.mutation({
      query: (data) => ({
        url: "/api/machineList/update",
        method: "POST",
        body: data,
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
    updateEquipmentGroup: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList/update",
        method: "POST",
        body: data,
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
    updateEquipmentName: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList/update",
        method: "POST",
        body: data,
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
    updateComponent: build.mutation({
      query: (data) => ({
        url: "/api/machineList/equipmentGroupList/equipmentNameList/component/update",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EquipmentName"],
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
    getRoute: build.query<RouteResponse, string>({
      query: (clientId) => `/api/createRoute?clientId=${clientId}`,
      providesTags: ["RouteList"],
    }),
    getRouteEquipmentList: build.query<RouteMachineListResponse, string>({
      query: (routeListId) =>
        `/api/createRoute/routeMachineList?routeListId=${routeListId}`,
      providesTags: ["RouteMachineList"],
    }),
    getRouteComponents: build.query<RouteComponentResponse, string>({
      query: (routeEquipmentId) => ({
        url: `/api/createRoute/routeMachineList/routeComponents?routeEquipmentId=${routeEquipmentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponent"],
    }),
    createComment: build.mutation({
      query: (data) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/comments`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentComment"],
    }),
    getRouteComponentComment: build.query<
      RouteComponentCommentResponse,
      string
    >({
      query: (routeComponentId) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/comments?routeComponentId=${routeComponentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentComment"],
    }),
    createRecommendation: build.mutation({
      query: (data) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/recommendations`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentRecommendation"],
    }),
    getRouteComponentRecommendation: build.query<
      RouteComponentRecommendationResponse,
      string
    >({
      query: (routeComponentId) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/recommendations?routeComponentId=${routeComponentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentRecommendation"],
    }),
    createTemperature: build.mutation({
      query: (data) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/temperatures`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentTemperature"],
    }),
    getRouteComponentTemperature: build.query<
      RouteComponentTemperatureResponse,
      string
    >({
      query: (routeComponentId) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/temperatures?routeComponentId=${routeComponentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentTemperature"],
    }),
    createOilAnalysis: build.mutation({
      query: (data) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/oilAnalysis`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentOilAnalysis"],
    }),
    getRouteComponenetOilAnalysis: build.query<
      RouteComponentOilAnalysisResponse,
      string
    >({
      query: (routeComponentId) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/oilAnalysis?routeComponentId=${routeComponentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentOilAnalysis"],
    }),
    getRouteComponentDetails: build.query<
      RouteComponentDetailsResponse,
      { componentId: string; clientId: string }
    >({
      query: ({ componentId, clientId }) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/details?componentId=${componentId}&clientId=${clientId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentDetails"],
    }),
    searchClientRouteEquipmentList: build.query<
      SearchClientRouteEquipmentResponse,
      string
    >({
      query: (equipmentName) =>
        `/api/search/client-equipment?equipmentName=${equipmentName}`,
      providesTags: ["EquipmentName"],
    }),
    getClienttRouteComponentComment: build.query<
      ClientRouteComponentResponse,
      string[]
    >({
      query: (routeComponentIds) => ({
        url: `/api/client/componentComment?${routeComponentIds
          .map((id) => `routeComponentId=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentComment"],
    }),
    getClienttRouteComponentRecommendation: build.query<
      ClientRouteComponentRecommendationResponse,
      string[]
    >({
      query: (routeComponentIds) => ({
        url: `/api/client/componentRecommendation?${routeComponentIds
          .map((id) => `routeComponentId=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentRecommendation"],
    }),
    getRouteComponentAction: build.query<ClientComponentActionResponse, string>(
      {
        query: (componentId) => ({
          url: `/api/client/componentClientAction?componentId=${componentId}`,
          method: "GET",
        }),
        providesTags: ["RouteComponentAction"],
      }
    ),
    getRouteComponentActionAdmin: build.query<
      AdminComponentActionResponse,
      { componentId: string; clientId: string }
    >({
      query: ({ componentId, clientId }) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/clientAction?componentId=${componentId}&clientId=${clientId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentAction"],
    }),
    createRouteComponentAction: build.mutation({
      query: (data) => ({
        url: `/api/client/componentClientAction`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentAction"],
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
  useGetClientJobsQuery,
  useDeleteJobsMutation,
  useUpdateJobMutation,
  useGetMachineListQuery,
  useCreateMachineListMutation,
  useSoftDeleteMachineListMutation,
  useLazyGetEquipmentGroupsQuery,
  useUpdateMachineListMutation,
  useCreateEquipmentGroupMutation,
  useSoftDeleteEquipmentGroupsMutation,
  useUpdateEquipmentGroupMutation,
  useLazyGetEquipmentNamesQuery,
  useCreateEquipmentNameMutation,
  useSoftDeleteEquipmentNamesMutation,
  useUpdateEquipmentNameMutation,
  useLazyGetComponentsQuery,
  useCreateComponentMutation,
  useSoftDeleteComponentsMutation,
  useUpdateComponentMutation,
  useSearchJobNumberQuery,
  useCreateRouteMutation,
  useGetRouteQuery,
  useGetRouteEquipmentListQuery,
  useGetRouteComponentsQuery,
  useCreateCommentMutation,
  useGetRouteComponentCommentQuery,
  useCreateRecommendationMutation,
  useGetRouteComponentRecommendationQuery,
  useCreateTemperatureMutation,
  useGetRouteComponentTemperatureQuery,
  useCreateOilAnalysisMutation,
  useGetRouteComponenetOilAnalysisQuery,
  useGetRouteComponentDetailsQuery,
  useSearchClientRouteEquipmentListQuery,
  useGetClienttRouteComponentCommentQuery,
  useGetClienttRouteComponentRecommendationQuery,
  useGetRouteComponentActionQuery,
  useCreateRouteComponentActionMutation,
  useGetRouteComponentActionAdminQuery,
} = api;
