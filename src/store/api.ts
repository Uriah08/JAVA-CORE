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
  RouteComponentNote,
  RouteEquipmentName,
} from "@prisma/client";

export type ExtendedJob = Job & {
  user: {
    id: string;
    name: string;
  };
  routeList: {
    routeName: string;
    machines: {
      id: string;
    }[];
  };
};

type SearchJobsResponse = {
  jobs?: ExtendedJob[];
};

type ClientsResponse = {
  clients: User[];
  message: string;
  success: boolean;
  errorType: string
  remainingTime: string
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
      group: {
        id: string;
        name: string;
      };
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

type AdminRouteComponentDetailsResponse = {
  componentDetails: RouteComponentDetails[];
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

export type ExtendedSelectedComponent = Component & {
  routeComponent: {
    id: string;
  }[];
};

type SelectedComponentResponse = {
  selectedComponentData: ExtendedSelectedComponent[];
  message: string;
  success: boolean;
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

type AnalystComponentNoteResponse = {
  routeComponentNote: RouteComponentNote[];
  analyst: string[];
  message: string;
  success: boolean;
};

type AdminComponentAnalystNoteResponse = {
  routeComponentNote: RouteComponentNote[];
  message: string;
  success: boolean;
};

type ClientComponentDetailsResponse = {
  routeComponentDetails: RouteComponentDetails[];
  message: string;
  success: boolean;
};

type MachinesCountResponse = {
  areas: number;
  equipmentGroup: number;
  equipmentName: number;
  components: number;
};

export type SeveritiesResponse = {
  data: {
    severity: string;
    count: number;
  }[];
};

type ReportMachineListResponse = {
  routeMachineList: RouteMachineList[];
  success: boolean;
};

export type ExtendedReportEquipmentName = RouteEquipmentName & {
  equipmentName: {
    name: string;
    groupId: string;
    group: {
      id: string;
      name: string;
    };
  };
};

type ReportEquipmentNameResponse = {
  routeEquipment: ExtendedReportEquipmentName[];
  success: boolean;
};

export type ExtendedReportComponentResponse = RouteComponent & {
  component: {
    name: string;
  };
  comments: {
    id: string;
    severity: string;
    comment: string;
    createdAt: Date;
  }[];
  recommendations?: {
    id: string;
    priority: string;
    recommendation: string;
    createdAt: Date;
  };
};

export type ReportComponentResponse = {
  routeComponent: ExtendedReportComponentResponse[];
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
    "RouteComponentNote",
  ],
  endpoints: (build) => ({
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

    searchClientRouteEquipmentList: build.query<
      SearchClientRouteEquipmentResponse,
      string
    >({
      query: (equipmentName) =>
        `/api/search/client-equipment?equipmentName=${equipmentName}`,
      providesTags: ["EquipmentName"],
    }),
    getSelectedComponent: build.query<SelectedComponentResponse, string[]>({
      query: (componentIds) => ({
        url: `/api/client/selectedComponent?${componentIds
          .map((id) => `componentIds=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: ["Component"],
    }),
    getClienttRouteComponentComment: build.query<
      ClientRouteComponentResponse,
      string[]
    >({
      query: (routeComponentIds) => ({
        url: `/api/client/selectedComponent/componentComment?${routeComponentIds
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
        url: `/api/client/selectedComponent/componentRecommendation?${routeComponentIds
          .map((id) => `routeComponentId=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentRecommendation"],
    }),
    getRouteComponentAction: build.query<ClientComponentActionResponse, string>(
      {
        query: (componentId) => ({
          url: `/api/client/selectedComponent/componentClientAction?componentId=${componentId}`,
          method: "GET",
        }),
        providesTags: ["RouteComponentAction"],
      }
    ),
    getAdminRouteComponentAction: build.query<
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
        url: `/api/client/selectedComponent/componentClientAction`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentAction"],
    }),
    getRouteComponentAnalystNote: build.query<
      AnalystComponentNoteResponse,
      string
    >({
      query: (componentId) => ({
        url: `/api/client/selectedComponent/componentAnalystNote?componentId=${componentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentNote"],
    }),
    createRouteComponentAnalystNote: build.mutation({
      query: (data) => ({
        url: `/api/client/selectedComponent/componentAnalystNote`,
        method: "POSt",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentNote"],
    }),
    getAdminRouteComponentAnalystNote: build.query<
      AdminComponentAnalystNoteResponse,
      { componentId: string; clientId: string }
    >({
      query: ({ componentId, clientId }) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/analystNote?componentId=${componentId}&clientId=${clientId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentNote"],
    }),
    getRouteComponentDetails: build.query<
      ClientComponentDetailsResponse,
      string
    >({
      query: (componentId) => ({
        url: `/api/client/selectedComponent/componentDetails?componentId=${componentId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentDetails"],
    }),
    getAdminRouteComponentDetails: build.query<
      AdminRouteComponentDetailsResponse,
      { componentId: string; clientId: string }
    >({
      query: ({ componentId, clientId }) => ({
        url: `/api/createRoute/routeMachineList/routeComponents/details?componentId=${componentId}&clientId=${clientId}`,
        method: "GET",
      }),
      providesTags: ["RouteComponentDetails"],
    }),
    createClientComponentDetails: build.mutation({
      query: (data) => ({
        url: `/api/client/selectedComponent/componentDetails`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["RouteComponentDetails"],
    }),
    getMachinesCount: build.query<MachinesCountResponse, void>({
      query: () => ({
        url: "/api/machineList/dashboard",
        method: "GET",
      }),
      providesTags: ["Area", "EquipmentGroup", "EquipmentName", "Component"],
    }),
    getRecentRoutes: build.query<RouteResponse, void>({
      query: () => ({
        url: "/api/createRoute/dashboard",
        method: "GET",
      }),
      providesTags: ["RouteList"],
    }),
    getSeverities: build.query<SeveritiesResponse, void>({
      query: () => ({
        url: "/api/createRoute/routeMachineList/routeComponents/comments/dashboard",
        method: "GET",
      }),
      providesTags: ["RouteComponentComment"],
    }),
    getClientSeverities: build.query<SeveritiesResponse, void>({
      query: () => ({
        url: "/api/client/selectedComponent/dashboard",
        method: "GET",
      }),
      providesTags: ["RouteComponentComment"],
    }),
    getPdfReport: build.query<ReportMachineListResponse, string>({
      query: (routeListId) => ({
        url: `/api/report?routeListId=${routeListId}`,
        method: "GET",
      }),
      providesTags: ["RouteMachineList"],
    }),
    getRouteEquipmentReport: build.query<ReportEquipmentNameResponse, string>({
      query: (routeMachineId) => ({
        url: `/api/report/routeEquipment?routeMachineId=${routeMachineId}`,
        method: "GET",
      }),
      providesTags: ["RouteMachineList"],
    }),
    getRouteComponentReport: build.query<ReportComponentResponse, string[]>({
      query: (routeEquipmentIds) => ({
        url: `/api/report/routeEquipment/routeComponent?${routeEquipmentIds
          .map((id) => `routeEquipmentId=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: [
        "RouteComponent",
        "RouteComponentComment",
        "RouteComponentRecommendation",
      ],
    }),
    getPdfClientReport: build.query<ReportMachineListResponse, string>({
      query: (routeListId) => ({
        url: `/api/client/report?routeListId=${routeListId}`,
        method: "GET",
      }),
      providesTags: ["RouteMachineList"],
    }),
    getRouteEquipmentClientReport: build.query<ReportEquipmentNameResponse, string>({
      query: (routeMachineId) => ({
        url: `/api/client/report/routeEquipment?routeMachineId=${routeMachineId}`,
        method: "GET",
      }),
      providesTags: ["RouteMachineList"],
    }),
    getRouteComponentClientReport: build.query<ReportComponentResponse, string[]>({
      query: (routeEquipmentIds) => ({
        url: `/api/client/report/routeEquipment/routeComponent?${routeEquipmentIds
          .map((id) => `routeEquipmentId=${id}`)
          .join("&")}`,
        method: "GET",
      }),
      providesTags: [
        "RouteComponent",
        "RouteComponentComment",
        "RouteComponentRecommendation",
      ],
    }),
  }),
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  tagTypes: ["Client"],
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
    getVerifiedClient: build.query<ClientsResponse, string>({
      query: (userAgent) => ({
        url: `/api/client/verified?userAgent=${userAgent}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    verifyClient: build.mutation({
      query: (data) => ({
        url: "/api/client/verified",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Client"],
    }),
    verifyDevice: build.mutation({
      query: (data) => ({
        url: "/api/client/verified/verifyDevice",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Client"],
    }),
    getCode: build.mutation({
      query: () => ({
        url: "/api/client/verified/send-code",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Client"],
    }),
  })
});

export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useGetVerifiedClientQuery,
  useVerifyClientMutation,
  useVerifyDeviceMutation,
  useGetCodeMutation,
} = authApi

export const {
  useRegisterClientMutation,
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
  useSearchClientRouteEquipmentListQuery,
  useGetSelectedComponentQuery,
  useGetClienttRouteComponentCommentQuery,
  useGetClienttRouteComponentRecommendationQuery,
  useGetRouteComponentActionQuery,
  useCreateRouteComponentActionMutation,
  useGetAdminRouteComponentActionQuery,
  useGetAdminRouteComponentAnalystNoteQuery,
  useGetRouteComponentAnalystNoteQuery,
  useCreateRouteComponentAnalystNoteMutation,
  useCreateClientComponentDetailsMutation,
  useGetRouteComponentDetailsQuery,
  useGetAdminRouteComponentDetailsQuery,
  useGetMachinesCountQuery,
  useGetRecentRoutesQuery,
  useGetSeveritiesQuery,
  useGetClientSeveritiesQuery,
  useGetPdfReportQuery,
  useGetRouteEquipmentReportQuery,
  useGetRouteComponentReportQuery,
  useGetPdfClientReportQuery,
  useGetRouteEquipmentClientReportQuery,
  useGetRouteComponentClientReportQuery,
} = api;
