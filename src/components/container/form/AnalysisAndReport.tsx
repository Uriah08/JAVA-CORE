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
import { ImageIcon, Plus, Search, Trash, View, PanelRight } from "lucide-react";

import {
  useGetRouteComponentsQuery,
  useGetRouteEquipmentListQuery,
  useSearchJobNumberQuery,
} from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { EquipmentUpload } from "../analysis/EquipmentUpload";
import { EquipmentView } from "../analysis/EquipmentView";
import { FigureUpload } from "../analysis/FigureUpload";
import { FigureView } from "../analysis/FigureView";

import CommentsSection from "../analysis/CommentsSection";
import RecommendationSection from "../analysis/RecommendationSection";
import ClientActionSection from "../analysis/ClientActionSection";
import AnalystNoteSection from "../analysis/AnalystNoteSection";
import SeverityHistorySection from "../analysis/SeverityHistorySection";
import TemperatureSection from "../analysis/TemperatureSection";
import OilAnalysisSection from "../analysis/OilAnalysisSection";
import EquipmentDetailsSection from "../analysis/EquipmentDetailsSection";
import { Dialog } from "@/components/ui/dialog";
import ExportAdmin from "../dialogs/ExportAdmin";
// import EquipmentList from "../list/analysis-equipment-list/EquipmentList";

const AnalysisAndReportForm = () => {
  const { toast } = useToast();

  const [openComment, setOpenComment] = React.useState(false);
  const [openRecommendation, setOpenRecommendation] = React.useState(false);
  const [openOilAnalysis, setOpenOilAnalysis] = React.useState(false);
  const [activeDrawing, setActiveDrawing] = React.useState("view");
  const [activeFigure, setActiveFigure] = React.useState("add");
  const [hideList, setHideList] = React.useState(false);
  const [openExport, setOpenExport] = React.useState(false);

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
      id?: string;
      name?: string;
    };
    yearWeekNumber?: string;
    reviewer?: string | null;
    poNumber: string | null;
    woNumber: string | null;
    reportNumber: string | null;
    inspectionRoute?: string;
    routeList?: {
      routeName?: string;
      machines?: {
        id?: string;
      }[];
    };
  } | null>(null);

  console.log("job: ", selectedJob);

  const { data: routeData, isFetching: routeLoading } =
    useGetRouteEquipmentListQuery(selectedJob?.inspectionRoute ?? "", {
      skip: !selectedJob?.inspectionRoute,
    });

  const equipmentList =
    routeData?.routeMachineList.flatMap((machine) =>
      machine.routeEquipmentNames.map((eq) => ({
        id: eq.id,
        routeMachineId: machine?.id,
        name: eq.equipmentName.name,
        group: eq.equipmentName.group,
        // routeMachineId: eq.routeMachineId,
        // components: eq.equipmentName.components,
      }))
    ) || [];

  const [selectedEquipment, setSelectedEquipment] = React.useState<{
    id: string;
    name: string;
    routeMachineId: string;
    group: {
      id: string;
      name: string;
    };
    // components: { id: string; name: string }[];
  } | null>(null);

  console.log("captured data: ", selectedEquipment);

  // const componentIds = selectedEquipment?.components.map((c) => c.id) || [];
  // const routeMachineId = selectedEquipment?.routeMachineId ?? "";

  const { data: routeComponentsData, isFetching: routeComponentsLoading } =
    useGetRouteComponentsQuery(selectedEquipment?.id ?? "", {
      skip: !selectedEquipment,
    });

  console.log("Component: ", routeComponentsData);
  console.log("Component2: ", routeComponentsData?.routeComponents);

  const [routeComponents, setRouteComponents] = React.useState(
    routeComponentsData?.routeComponents || []
  );

  const [selectedComponent, setSelectedComponent] = React.useState<{
    id: string;
    name: string;
    routeComponentID: string;
    // action?: string | null;
    // note?: string | null;
    component?: {
      id: string;
      name: string;
    };
  } | null>(null);

  React.useEffect(() => {
    if (routeComponentsData?.routeComponents) {
      setRouteComponents(routeComponentsData.routeComponents);
    }
  }, [routeComponentsData]);

  const isLoading = jobsLoading || routeLoading || routeComponentsLoading;

  console.log("Captured data: ", selectedComponent);

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

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 mt-0 flex flex-col"
        >
          <div className="w-full h-full bg-white rounded-xl p-5 shadow-lg">
            <div className="flex flex-col ">
              <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-black">
                  Analysis and Reporting
                </h1>
                <Button
                  onClick={() => setOpenExport(!openExport)}
                  type="button"
                  className="bg-main hover:bg-follow text-white"
                  disabled={!selectedJob}
                >
                  Export
                </Button>
                <Dialog
                  aria-describedby={undefined}
                  open={openExport}
                  onOpenChange={setOpenExport}
                >
                  <ExportAdmin
                    onClose={() => setOpenExport(false)}
                    data={selectedJob}
                  />
                </Dialog>
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-3 mt-3 text-zinc-700">
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
                          setSelectedComponent(null);
                          setSelectedEquipment(null);

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
                            {isLoading ? (
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
                          value={selectedJob?.routeList?.routeName || ""}
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
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 w-full">
        <div
          className={`w-full lg:w-1/3 rounded-xl bg-white flex flex-col p-5 shadow-lg ${
            hideList && "hidden"
          }`}
        >
          <h2 className="font-bold text-lg">
            {selectedEquipment ? selectedEquipment.name : "Equipment List"}
          </h2>

          {selectedEquipment && (
            <Button
              onClick={() => {
                setSelectedEquipment(null);
                setSelectedComponent(null);
              }}
              className="mt-3 text-sm font-medium bg-transparent shadow-none text-main hover:text-follow hover:underline hover:bg-transparent justify-start"
            >
              &larr; Back to Equipment List
            </Button>
          )}

          {isLoading ? (
            <div className="mt-8 space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[35px] border-t animate-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          ) : !selectedEquipment ? (
            <ul className="mt-8 space-y-2">
              {equipmentList.map((equipment) => (
                <li
                  key={equipment.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 border rounded"
                  onClick={() => setSelectedEquipment(equipment)}
                >
                  {equipment.name}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-2 space-y-2">
              {routeComponents.map((routeComponent) => (
                <li
                  key={routeComponent.id}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedComponent?.id === routeComponent.id
                      ? "bg-red-400 text-white"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedComponent({
                      id: routeComponent.id,
                      name: routeComponent.component.name,
                      routeComponentID: routeComponent?.id,
                      component: routeComponent?.component,
                      // recommendations: routeComponent.recommendations || [],
                      // action: routeComponent.action ?? null,
                      // temperatures: routeComponent.temperatures || [],
                      // oilAnalyses: routeComponent.oilAnalyses || [],
                    })
                  }
                >
                  {routeComponent.component.name}
                </li>
              ))}
            </ul>
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
                isLoading={isLoading}
                selectedComponent={selectedComponent}
                // severityMap={severityMap}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* ####################### COMMENTS ######################### */}
            <div className="flex flex-col gap-3 mt-3">
              <CommentsSection
                isLoading={isLoading}
                selectedComponent={selectedComponent}
                // severityMap={severityMap}
                openComment={openComment}
                setOpenComment={setOpenComment}
              />
            </div>

            {/* ####################### RECOMMENDATIONS ######################### */}
            <div className="flex flex-col gap-3 mt-3">
              <RecommendationSection
                isLoading={isLoading}
                selectedComponent={selectedComponent}
                openRecommendation={openRecommendation}
                setOpenRecommendation={setOpenRecommendation}
              />
            </div>

            {/* ####################### CLIENT ACTIONS AND ANALYST NOTE ######################### */}
            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <div className="flex flex-col gap-3 w-full">
                <ClientActionSection
                  isLoading={isLoading}
                  clientId={selectedJob?.user?.id}
                  componentId={selectedComponent?.component?.id}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <AnalystNoteSection
                  isLoading={isLoading}
                  clientId={selectedJob?.user?.id}
                  componentId={selectedComponent?.component?.id}
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
              {/* <div className="flex flex-col gap-3 w-full md:w-1/2">
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
              </div> */}

              <EquipmentDetailsSection
                isLoading={isLoading}
                selectedComponent={selectedComponent}
                selectedJob={selectedJob}
              />

              {/* ####################### TEMPARATURE AND OIL ANALYSIS ######################### */}

              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <div className="flex flex-col gap-3 w-full">
                  <TemperatureSection
                    isLoading={isLoading}
                    selectedComponent={selectedComponent}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <OilAnalysisSection
                    isLoading={isLoading}
                    selectedComponent={selectedComponent}
                    openOilAnalysis={openOilAnalysis}
                    setOpenOilAnalysis={setOpenOilAnalysis}
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
