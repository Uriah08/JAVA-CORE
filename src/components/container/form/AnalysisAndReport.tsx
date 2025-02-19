"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { analysisAndReportSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Edit,
  ImageIcon,
  Plus,
  Search,
  Trash,
  View,
  PanelRight,
} from "lucide-react";

import {
  useSearchJobNumberQuery,
  useSearchRouteListQuery,
  useGetRouteComponentsQuery,
} from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Comments from "../dialogs/Comments";

import { symbols } from "@/schema";
import Recommendations from "../dialogs/Recommendations";
import { EquipmentUpload } from "../analysis/EquipmentUpload";
import { EquipmentView } from "../analysis/EquipmentView";
import { FigureUpload } from "../analysis/FigureUpload";
import { FigureView } from "../analysis/FigureView";

const AnalysisAndReportForm = () => {
  const { toast } = useToast();

  const [openComment, setOpenComment] = React.useState(false);
  const [openRecommendation, setOpenRecommendation] = React.useState(false);
  const [activeDrawing, setActiveDrawing] = React.useState("view");
  const [activeFigure, setActiveFigure] = React.useState("add");
  const [activeDetail, setActiveDetail] = React.useState("add");
  const [hideList, setHideList] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState("");
  const { data, isFetching: jobsLoading } = useSearchJobNumberQuery(
    searchTerm,
    {
      skip: searchTerm.length < 3,
    }
  );

  const jobs = data?.jobs || [];

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  React.useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  const [selectedJob, setSelectedJob] = React.useState<{
    jobNumber: string;
    area?: string;
    user?: {
      name?: string;
    };
    yearWeekNumber?: string;
    reviewer?: string | null;
  } | null>(null);

  const [searchTermRouteList, setSearchTermRouteList] = React.useState("");
  const { data: routeListData, isFetching: routeListLoading } =
    useSearchRouteListQuery(searchTermRouteList, {
      skip: searchTermRouteList.length < 3,
    });

  const routeLists = routeListData?.routeList || [];

  const handleSearchRouteList = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTermRouteList(event.target.value);
    },
    500
  );

  React.useEffect(() => {
    return handleSearchRouteList.cancel;
  }, [handleSearchRouteList.cancel]);

  const [selectedRouteList, setSelectedRouteList] = React.useState<{
    id?: string;
    routeName?: string;
    machines: {
      id: string;
      area: { id: string; name: string };
      equipmentGroup: { id: string; name: string };
      routeEquipmentNames: {
        id: string;
        equipmentName: {
          id: string;
          name: string;
          components: { id: string }[];
        };
      }[];
    }[];
  } | null>(null);

  const [selectedEquipment, setSelectedEquipment] = React.useState<{
    id: string;
    name: string;
    components: { id: string; name: string }[];
  } | null>(null);

  const componentIds = selectedEquipment?.components.map((c) => c.id) || [];
  const routeMachineId = selectedRouteList?.machines[0]?.id || "";

  const {
    data: routeComponentsData,
    isFetching: routeComponentsLoading,
    refetch,
  } = useGetRouteComponentsQuery(
    { componentIds, routeMachineId },
    { skip: componentIds.length === 0 || !routeMachineId }
  );

  const routeComponents = routeComponentsData?.routeList || [];

  const [selectedComponent, setSelectedComponent] = React.useState<{
    id: string;
    routeComponentID: string;
    name: string;
    comments: { severity: string; comment: string; createdAt: Date }[];
    recommendations: {
      priority: string;
      recommendation: string;
      createdAt: Date;
    }[];
  } | null>(null);

  React.useEffect(() => {
    if (routeComponents.length > 0 && selectedComponent) {
      const updatedComponent = routeComponents.find(
        (comp) => comp.component.id === selectedComponent.id
      );

      if (updatedComponent) {
        setSelectedComponent({
          id: updatedComponent.component.id,
          routeComponentID: updatedComponent.id,
          name: updatedComponent.component.name,
          comments: updatedComponent.comments || [],
          recommendations: updatedComponent.recommendations || [],
        });
      }
    }
  }, [routeComponents]);

  const form = useForm<z.infer<typeof analysisAndReportSchema>>({
    resolver: zodResolver(analysisAndReportSchema),
    defaultValues: {
      client: "",
      area: "",
      jobNo: "",
      inspectionRoute: "",
      yearWeekNo: "",
      reviewer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof analysisAndReportSchema>) {
    try {
      console.log(values);

      toast({
        title: "Success",
        description: "Success",
      });
      form.reset();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast({
        title: "Error",
        description: err.data?.message || "An unexpected error occurred.",
      });
    }
  }

  const severityMap: Record<string, string> = Object.fromEntries(
    symbols.map((s) => [s.label, `${s.image}.png`])
  );
  return (
    <div className="w-full flex flex-col gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 mt-0 flex flex-col"
        >
          <div className="w-full h-full bg-white rounded-xl p-5 shadow-lg">
            <div className="flex flex-col ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">
                  Analysis and Reporting
                </h1>
                <Button className="bg-main hover:bg-follow text-white ">
                  Submit
                </Button>
              </div>
              <h2 className="text-lg font-semibold mb-3 mt-3 text-zinc-700">
                Information
              </h2>
            </div>
            <div className="flex md:flex-row flex-col gap-3 w-full">
              <div className="flex-col gap-3 flex md:w-1/3 w-full">
                <FormField
                  control={form.control}
                  name="jobNo"
                  render={({ field }) => (
                    <FormItem className='"w-full'>
                      <FormLabel>Job Number</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const job = jobs.find(
                            (job) => job.jobNumber === value
                          );
                          setSelectedJob(job || null);
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Select Job Number"} />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <div className="flex flex-col max-h-[200px] overflow-auto">
                            <div className="relative">
                              <Search
                                className="absolute top-2 left-3 text-zinc-500"
                                size={20}
                              />
                              <Input
                                onChange={handleSearch}
                                placeholder="Search Job Number"
                                className="focus-visible:ring-0 pl-10"
                              />
                            </div>
                            {jobsLoading ? (
                              <div className="w-full h-full overflow-hidden flex flex-col gap-1 mt-1">
                                {[...Array(5)].map((_, index) => (
                                  <Skeleton
                                    key={index}
                                    className="w-full h-[25px] animate-pulse"
                                    style={{
                                      animationDelay: `${index * 0.2}s`,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : jobs.length <= 0 ? (
                              <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-xl font-bold text-zinc-300 my-10">
                                  No Job Found
                                </h1>
                              </div>
                            ) : (
                              jobs.map((job) => (
                                <SelectItem
                                  key={job.jobNumber}
                                  value={job.jobNumber}
                                >
                                  {job.jobNumber}
                                </SelectItem>
                              ))
                            )}
                          </div>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inspectionRoute"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Route Name</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedRoute = routeLists.find(
                            (route) => route.routeName === value
                          );
                          setSelectedRouteList(selectedRoute || null);
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Route Name" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <div className="flex flex-col max-h-[200px] overflow-auto">
                            <div className="relative">
                              <Search
                                className="absolute top-2 left-3 text-zinc-500"
                                size={20}
                              />
                              <Input
                                onChange={handleSearchRouteList}
                                placeholder="Search Route Name"
                                className="focus-visible:ring-0 pl-10"
                              />
                            </div>
                            {routeListLoading ? (
                              <div className="w-full h-full overflow-hidden flex flex-col gap-1 mt-1">
                                {[...Array(5)].map((_, index) => (
                                  <Skeleton
                                    key={index}
                                    className="w-full h-[25px] animate-pulse"
                                    style={{
                                      animationDelay: `${index * 0.2}s`,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : routeLists.length <= 0 ? (
                              <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-xl font-bold text-zinc-300 my-10">
                                  No Route Found
                                </h1>
                              </div>
                            ) : (
                              routeLists.map((route) => (
                                <SelectItem
                                  key={route.routeName}
                                  value={route.routeName}
                                >
                                  {route.routeName}
                                </SelectItem>
                              ))
                            )}
                          </div>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-col gap-3 flex md:w-1/3 w-full">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem className='"w-full'>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Select job number first"
                          {...field}
                          readOnly
                          value={selectedJob?.user?.name || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem className='"w-full'>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Select job number first"
                          {...field}
                          readOnly
                          value={selectedJob?.area || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-col gap-3 flex md:w-1/3 w-full">
                <FormField
                  control={form.control}
                  name="reviewer"
                  render={({ field }) => (
                    <FormItem className='"w-full'>
                      <FormLabel>Reviewed</FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Select job number first"
                          {...field}
                          readOnly
                          value={
                            !selectedJob ? "" : selectedJob?.reviewer || "None"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearWeekNo"
                  render={({ field }) => (
                    <FormItem className='"w-full'>
                      <FormLabel>Year & Week no.</FormLabel>
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Select job number first"
                          {...field}
                          readOnly
                          value={selectedJob?.yearWeekNumber || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-3 w-2/3 px-5"></div>
          </div>
        </form>
      </Form>
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div
          className={`w-full lg:w-1/3 rounded-xl bg-white flex flex-col p-5 shadow-lg ${
            hideList && "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold mb-3 text-black">
            {selectedEquipment ? selectedEquipment.name : "Equipment List"}
          </h2>

          {selectedEquipment ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedEquipment(null)}
                className="text-sm font-medium text-main hover:text-follow"
              >
                &larr; Back to Equipment List
              </button>

              {routeComponentsLoading ? (
                <div className="w-full h-full overflow-hidden flex flex-col gap-2 mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              ) : routeComponents.length > 0 ? (
                routeComponents.map((component, index) => (
                  <div
                    key={index}
                    className={`border p-2 rounded-md cursor-pointer ${
                      selectedComponent?.id === component.component.id
                        ? "bg-red-300"
                        : "hover:bg-zinc-200"
                    }`}
                    onClick={() => {
                      console.log(
                        "Component selected:",
                        component.component.name
                      );
                      console.log(
                        "Comments for this component:",
                        component.comments || []
                      );
                      console.log(
                        "Recommendations for this component:",
                        component.recommendations || []
                      );

                      setSelectedComponent({
                        id: component.component.id,
                        routeComponentID: component.id,
                        name: component.component.name,
                        comments: component.comments || [],
                        recommendations: component.recommendations || [],
                      });
                    }}
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      {component.component.name}
                    </h4>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400">No components found.</p>
              )}
            </div>
          ) : selectedRouteList ? (
            <div className="space-y-4">
              {selectedRouteList.machines?.map((machine) => (
                <div key={machine.id} className="rounded-lg">
                  <h3 className="font-bold text-zinc-700">
                    {machine.equipmentGroup?.name}
                  </h3>
                  <div className="ml-4 mt-2 space-y-2">
                    {machine.routeEquipmentNames?.map((equipment) => (
                      <div
                        key={equipment.id}
                        className="border font-bold p-2 rounded-md cursor-pointer hover:bg-zinc-200"
                        onClick={() => {
                          setSelectedEquipment({
                            id: equipment.id,
                            name: equipment.equipmentName?.name,
                            components: Array.from(
                              new Map(
                                (equipment.equipmentName?.components || []).map(
                                  (component) => [
                                    component.id,
                                    {
                                      id: component.id,
                                      name:
                                        routeComponents?.find(
                                          (comp) =>
                                            comp.componentId === component.id
                                        )?.component.name || "Unknown",
                                    },
                                  ]
                                )
                              ).values()
                            ),
                          });
                        }}
                      >
                        <h4 className="text-sm font-medium text-zinc-600">
                          {equipment.equipmentName?.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No route selected.</p>
          )}
        </div>

        <div
          className={`w-full rounded-xl bg-white flex flex-col p-5 shadow-lg ${
            !hideList && "lg:w-2/3"
          }`}
        >
          <div className="flex flex-col mb-3">
            <div className="flex gap-3 items-center mb-3">
              <PanelRight
                onClick={() => setHideList(!hideList)}
                className={`transform cursor-pointer lg:rotate-0 rotate-90 ${
                  hideList ? "text-zinc-700" : "text-zinc-500"
                }`}
                size={20}
              />
              <h2 className="text-lg font-semibold text-zinc-700">
                Severity History
              </h2>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="border rounded-lg flex overflow-auto">
                {routeComponentsLoading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col border-r w-full"
                      >
                        <Skeleton className="w-full h-[30px] animate-pulse bg-zinc-200" />
                        <Skeleton className="w-full h-[50px] animate-pulse bg-zinc-200 mt-2" />
                      </div>
                    ))
                  : Array.from({ length: 10 }).map((_, index) => {
                      const comment =
                        selectedComponent?.comments[index] || null;
                      return (
                        <div
                          key={index}
                          className="flex flex-col border-r w-full"
                        >
                          <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                            {index === 0 ? "Current" : "Previous"}
                          </h1>
                          <div className="flex justify-center items-center py-1">
                            {comment ? (
                              <Image
                                src={`/severity/${
                                  severityMap[String(comment.severity)]
                                }`}
                                width={30}
                                height={30}
                                alt="Severity Symbol"
                                className="w-5 object-cover"
                              />
                            ) : (
                              <div className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* ####################### COMMENTS ######################### */}

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Comments</h1>
              </div>
            </div>
            <div className="w-full border p-3 rounded-lg flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Previous Comment</h1>
                <h1 className="text-sm text-zinc-500">
                  {selectedComponent ? selectedComponent.comments.length : 0}
                </h1>
              </div>
              <div className="flex flex-col gap-3 max-h-[250px] overflow-auto">
                {routeComponentsLoading ? (
                  <Skeleton
                    className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
                    style={{ animationDelay: `0s` }}
                  />
                ) : selectedComponent &&
                  selectedComponent.comments.length > 0 ? (
                  (() => {
                    const latestComment = [...selectedComponent.comments].sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )[0];

                    return latestComment ? (
                      <div className="flex flex-col gap-2 p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/severity/${
                                severityMap[String(latestComment.severity)] ||
                                "N.png"
                              }`}
                              width={40}
                              height={40}
                              alt="Symbol"
                              className="w-5 object-cover"
                            />
                            <h1 className="text-sm text-zinc-600">
                              {latestComment.severity}
                            </h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <h1 className="text-xs text-zinc-500">
                              {latestComment.createdAt
                                ? new Date(
                                    latestComment.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </h1>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-700">
                          {latestComment.comment}
                        </p>
                      </div>
                    ) : null;
                  })()
                ) : (
                  <p className="text-sm text-zinc-400">
                    No comments available.
                  </p>
                )}
              </div>
              <Dialog open={openComment} onOpenChange={setOpenComment}>
                <Button
                  onClick={() => setOpenComment(!openComment)}
                  type="button"
                  className="w-full font-normal text-sm justify-start cursor-text"
                  variant={"outline"}
                >
                  Write a comment...
                </Button>
                {openComment && (
                  <Comments
                    routeComponentId={selectedComponent?.routeComponentID}
                    onClose={() => setOpenComment(false)}
                    refetch={refetch}
                  />
                )}
              </Dialog>
            </div>

            {/* ####################### RECOMMENDATION ######################### */}

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Recommendations</h1>
              </div>
            </div>

            <div className="w-full border p-3 rounded-lg flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Previous Recommendation</h1>
                <h1 className="text-sm text-zinc-500">
                  {selectedComponent
                    ? selectedComponent?.recommendations.length
                    : 0}
                </h1>
              </div>

              <div className="flex flex-col gap-3 max-h-[250px] overflow-auto">
                {routeComponentsLoading ? (
                  <Skeleton
                    className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
                    style={{ animationDelay: `0.2s` }}
                  />
                ) : selectedComponent &&
                  selectedComponent.recommendations.length > 0 ? (
                  (() => {
                    const latestRecommendation = [
                      ...selectedComponent.recommendations,
                    ].sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )[0];

                    return latestRecommendation ? (
                      <div className="flex flex-col gap-2 p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <h1 className="font-bold">
                              {latestRecommendation.priority}
                            </h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <h1 className="text-xs text-zinc-500">
                              {latestRecommendation.createdAt
                                ? new Date(
                                    latestRecommendation.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </h1>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-700">
                          {latestRecommendation.recommendation}
                        </p>
                      </div>
                    ) : null;
                  })()
                ) : (
                  <p className="text-sm text-zinc-400">
                    No recommendation available.
                  </p>
                )}
              </div>
              <Dialog
                open={openRecommendation}
                onOpenChange={setOpenRecommendation}
              >
                <Button
                  onClick={() => setOpenRecommendation(!openRecommendation)}
                  type="button"
                  className="w-full font-normal text-sm justify-start cursor-text"
                  variant={"outline"}
                >
                  Write a recommendation...
                </Button>
                <Recommendations
                  routeComponentId={selectedComponent?.routeComponentID}
                  onClose={() => setOpenRecommendation(false)}
                  refetch={refetch}
                />
              </Dialog>
            </div>

            {/* ####################### CLIENT ACTIONS AND WO NUMBER REQUIRED ######################### */}

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">
                  Client&apos;s Action and WO Number
                </h1>
                <div className="border rounded-lg p-3">
                  <h1 className="font-semibold">Client Action</h1>
                  <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
                    <p className="text-sm text-zinc-600 indent-10">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Asperiores est laboriosam temporibus aliquam tempore
                      itaque nihil atque, ducimus quibusdam placeat illum,
                      maiores eveniet pariatur quia, ex aut tenetur dignissimos!
                      Sequi? Asperiores est laboriosam temporibus aliquam
                      tempore itaque nihil atque, ducimus quibusdam placeat
                      illum, maiores eveniet pariatur quia, ex aut tenetur
                      dignissimos! Sequi? Asperiores est laboriosam temporibus
                      aliquam tempore itaque nihil atque, ducimus quibusdam
                      placeat illum, maiores eveniet pariatur quia, ex aut
                      tenetur dignissimos! Sequi?
                    </p>
                    <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                      Jan 1, 2025
                    </h1>
                  </div>
                  <h1 className="font-semibold mt-3">WO Number</h1>
                  <Input
                    readOnly
                    placeholder="Client WO Number"
                    className="mt-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Analyst Note</h1>
                <div className="border rounded-lg p-3 flex flex-col h-full">
                  <h1 className="font-semibold">Analyst Name</h1>
                  <Input
                    readOnly
                    placeholder="Analyst Name"
                    className="mt-2 text-sm"
                  />
                  <div className="border rounded-lg p-3 mt-2 max-h-[165px] overflow-auto">
                    <p className="text-sm text-zinc-600 indent-10">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Asperiores est laboriosam temporibus aliquam tempore
                      itaque nihil atque, ducimus quibusdam placeat illum,
                      maiores eveniet pariatur quia, ex aut tenetur dignissimos!
                      Sequi? Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Asperiores est laboriosam temporibus aliquam tempore
                      itaque nihil atque, ducimus quibusdam placeat illum,
                      maiores eveniet pariatur quia, ex aut tenetur dignissimos!
                      Sequi Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Asperiores est laboriosam temporibus aliquam tempore
                      itaque nihil atque, ducimus quibusdam placeat illum,
                      maiores eveniet pariatur quia, ex aut tenetur dignissimos!
                      Sequi
                    </p>
                    <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                      Jan 1, 2025
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* ####################### EQUIPMENT DRAWING REQUIRED ######################### */}

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Equipment Drawing Photo</h1>
                <div className="border rounded-lg p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveDrawing("upload")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDrawing === "upload" && "bg-zinc-200"
                      }`}
                    >
                      <ImageIcon className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Upload</h1>
                    </button>
                    <button
                      onClick={() => setActiveDrawing("delete")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDrawing === "delete" && "bg-zinc-200"
                      }`}
                    >
                      <Trash className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Delete</h1>
                    </button>
                    <button
                      onClick={() => setActiveDrawing("view")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDrawing === "view" && "bg-zinc-200"
                      }`}
                    >
                      <View className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">View</h1>
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-200 mt-3" />
                  {activeDrawing === "upload" && <EquipmentUpload />}
                  {(activeDrawing === "view" || activeDrawing === "delete") && (
                    <EquipmentView isDelete={activeDrawing === "delete"} />
                  )}
                </div>
              </div>

              {/* ####################### REPORT FIGURES ######################### */}

              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Report Figures</h1>
                <div className="border rounded-lg p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveFigure("add")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeFigure === "add" && "bg-zinc-200"
                      }`}
                    >
                      <Plus className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Add</h1>
                    </button>
                    <button
                      onClick={() => setActiveFigure("delete")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeFigure === "delete" && "bg-zinc-200"
                      }`}
                    >
                      <Trash className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Delete</h1>
                    </button>
                    <button
                      onClick={() => setActiveFigure("view")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeFigure === "view" && "bg-zinc-200"
                      }`}
                    >
                      <View className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">View</h1>
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-200 mt-3" />
                  {activeFigure === "add" && <FigureUpload />}
                  {(activeFigure === "view" || activeFigure === "delete") && (
                    <FigureView isDelete={activeFigure === "delete"} />
                  )}
                </div>
              </div>
            </div>

            {/* ####################### EQUIPMENT MECHANICAL DETAILS ######################### */}

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <h1 className="text-sm font-medium">
                  Equipment Mechanical Details
                </h1>
                <div className="border rounded-lg p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveDetail("add")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDetail === "add" && "bg-zinc-200"
                      }`}
                    >
                      <Plus className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Add</h1>
                    </button>
                    <button
                      onClick={() => setActiveDetail("edit")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDetail === "edit" && "bg-zinc-200"
                      }`}
                    >
                      <Edit className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Edit</h1>
                    </button>
                    <button
                      onClick={() => setActiveDetail("delete")}
                      type="button"
                      className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                        activeDetail === "delete" && "bg-zinc-200"
                      }`}
                    >
                      <Trash className="text-zinc-600" size={15} />
                      <h1 className="text-sm text-zinc-600">Delete</h1>
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-200 mt-3" />
                </div>
              </div>

              {/* ####################### TEMPARATURE AND OIL ANALYSIS ######################### */}

              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-sm font-medium">Temperature Record</h1>
                  <div className="border rounded-lg flex overflow-auto">
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Current
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40°C
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-sm font-medium">Oil Analysis</h1>
                  <div className="border rounded-lg flex overflow-auto">
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Current
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                    <div className="flex flex-col border-r w-full">
                      <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                        Previous
                      </h1>
                      <h1 className="text-center text-sm text-zinc-500 px-3 py-1">
                        40
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisAndReportForm;
