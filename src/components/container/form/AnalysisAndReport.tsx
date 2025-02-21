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
  useGetRouteComponentsQuery,
} from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { symbols } from "@/schema";

import { EquipmentUpload } from "../analysis/EquipmentUpload";
import { EquipmentView } from "../analysis/EquipmentView";
import { FigureUpload } from "../analysis/FigureUpload";
import { FigureView } from "../analysis/FigureView";

import CommentsSection from "../analysis/CommentsSection";
import RecommendationSection from "../analysis/RecommendationSection";
import ClientActionSection from "../analysis/ClientActionSection";
import AnalystNoteSection from "../analysis/AnalystNoteSection";
import SeverityHistorySection from "../analysis/SeverityHistorySection";
import TemperatureSection from "../analysis/Temperature";
import OilAnalysis from "../analysis/OilAnalysis";
// import EquipmentList from "../list/analysis-equipment-list/EquipmentList";

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
    inspectionRoute: string;
  } | null>(null);

  // const [searchTermRouteList, setSearchTermRouteList] = React.useState("");
  // const { data: routeListData, isFetching: routeListLoading } =
  //   useSearchRouteListQuery(searchTermRouteList, {
  //     skip: searchTermRouteList.length < 3,
  //   });

  // const routeLists = routeListData?.routeList || [];

  // const handleSearchRouteList = debounce(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchTermRouteList(event.target.value);
  //   },
  //   500
  // );

  // React.useEffect(() => {
  //   return handleSearchRouteList.cancel;
  // }, [handleSearchRouteList.cancel]);

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

  const routeComponents = React.useMemo(
    () => routeComponentsData?.routeList || [],
    [routeComponentsData]
  );

  const [selectedComponent, setSelectedComponent] = React.useState<{
    id: string;
    routeComponentID: string;
    name: string;
    action: string;
    note: string;
    comments: { severity: string; comment: string; createdAt: Date }[];
    recommendations: {
      priority: string;
      recommendation: string;
      createdAt: Date;
    }[];
    temperatures: {
      temperature: number;
    }[];
    oilAnalyses: {
      analysis: string;
    }[];
  } | null>(null);

  React.useEffect(() => {
    if (routeComponents.length > 0 && selectedComponent) {
      const updatedComponent = routeComponents.find(
        (comp) => comp.component.id === selectedComponent.id
      );

      if (
        updatedComponent &&
        (selectedComponent.routeComponentID !== updatedComponent.id ||
          selectedComponent.name !== updatedComponent.component.name ||
          JSON.stringify(selectedComponent.comments) !==
            JSON.stringify(updatedComponent.comments) ||
          JSON.stringify(selectedComponent.recommendations) !==
            JSON.stringify(updatedComponent.recommendations))
      ) {
        setSelectedComponent({
          id: updatedComponent.component.id,
          routeComponentID: updatedComponent.id,
          name: updatedComponent.component.name,
          action: updatedComponent.action ?? "",
          note: updatedComponent.note ?? "",
          comments: updatedComponent.comments || [],
          recommendations: updatedComponent.recommendations || [],
          temperatures: updatedComponent.temperatures || [],
          oilAnalyses: updatedComponent.oilAnalyses || [],
        });
      }
    }
  }, [routeComponents, selectedComponent]);

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
                      <FormControl>
                        <Input
                          className="text-sm"
                          placeholder="Select job number first"
                          {...field}
                          readOnly
                          value={selectedJob?.inspectionRoute || ""}
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
                        action: component.action ?? "",
                        note: component.note ?? "",
                        comments: component.comments || [],
                        recommendations: component.recommendations || [],
                        temperatures: component.temperatures || [],
                        oilAnalyses: component.oilAnalyses || [],
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
              <SeverityHistorySection
                routeComponentsLoading={routeComponentsLoading}
                selectedComponent={selectedComponent}
                severityMap={severityMap}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* ####################### COMMENTS ######################### */}
            <div className="flex flex-col gap-3 mt-3">
              <CommentsSection
                routeComponentsLoading={routeComponentsLoading}
                selectedComponent={selectedComponent}
                severityMap={severityMap}
                openComment={openComment}
                setOpenComment={setOpenComment}
                refetch={refetch}
              />
            </div>

            {/* ####################### RECOMMENDATIONS ######################### */}
            <div className="flex flex-col gap-3 mt-3">
              <RecommendationSection
                routeComponentsLoading={routeComponentsLoading}
                selectedComponent={selectedComponent}
                openRecommendation={openRecommendation}
                setOpenRecommendation={setOpenRecommendation}
                refetch={refetch}
              />
            </div>

            {/* ####################### CLIENT ACTIONS AND ANALYST NOTE ######################### */}

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full">
                <ClientActionSection
                  routeComponentsLoading={routeComponentsLoading}
                  selectedComponent={selectedComponent}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <AnalystNoteSection
                  routeComponentsLoading={routeComponentsLoading}
                  selectedComponent={selectedComponent}
                />
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
                  <TemperatureSection
                    routeComponentsLoading={routeComponentsLoading}
                    selectedComponent={selectedComponent}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-sm font-medium">Oil Analysis</h1>
                  <OilAnalysis
                    routeComponentsLoading={routeComponentsLoading}
                    selectedComponent={selectedComponent}
                  />
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
