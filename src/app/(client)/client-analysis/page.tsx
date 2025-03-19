"use client";

import React from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageIcon, Plus, Search, Trash, View } from "lucide-react";
// import Image from "next/image";
// import { symbols } from "@/schema";
// import { Dialog } from "@/components/ui/dialog";
// import ExportClient from "@/components/container/dialogs/ExportClient";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import AddDetails from "@/components/container/form/AddDetails";
// import ViewDetails from "@/components/container/analysis/ViewDetails";
import { FigureView } from "@/components/container/analysis/FigureView";
import { FigureUpload } from "@/components/container/analysis/FigureUpload";
import { EquipmentUpload } from "@/components/container/analysis/EquipmentUpload";
import { EquipmentView } from "@/components/container/analysis/EquipmentView";

import {
  useGetSelectedComponentQuery,
  useSearchClientRouteEquipmentListQuery,
} from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { ClientEquipmentSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SeverityHistory from "@/components/container/analysis/client/SeverityHistory";
import Recommendation from "@/components/container/analysis/client/Recommendation";
import ClientActionSection from "@/components/container/analysis/client/ClientAction";
import AnalystNoteSection from "@/components/container/analysis/client/AnalystNote";
import ComponentDetailsSection from "@/components/container/analysis/client/ComponentDetailsSection";

const ClientAnalysis = () => {
  const [openAnalystNote, setOpenAnalystNote] = React.useState(false);
  const [openClientAction, setOpenClientAction] = React.useState(false);
  const [openAddDetails, setOpenAddDetails] = useState(false);

  const [activeDrawing, setActiveDrawing] = useState("view");
  const [activeFigure, setActiveFigure] = useState("add");

  // const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: getEquipmentName, isFetching: equipmentsLoading } =
    useSearchClientRouteEquipmentListQuery(searchTerm, {
      skip: searchTerm.length < 3,
    });

  const equipmentList = getEquipmentName?.getEquipmentName || [];

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  React.useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  const [selectedEquipment, setSelectedEquipment] = React.useState<{
    name: string;
    components: {
      id: string;
    }[];
  } | null>(null);

  console.log("fetched data: ", selectedEquipment?.components);

  const selectedComponentIds =
    selectedEquipment?.components?.map((comp) => comp.id) || [];

  const { data: selectedComponentData, isFetching: isLoading } =
    useGetSelectedComponentQuery(selectedComponentIds, {
      skip: selectedComponentIds.length === 0,
    });

  const routeComponentIds =
    selectedComponentData?.selectedComponentData?.flatMap((component) =>
      component.routeComponent.map((rc) => rc.id)
    ) ?? [];

  const [selectedComponent, setSelectedComponent] = React.useState<{
    id: string;
    name: string;
    routeComponent?: {
      id: string;
    }[];
  } | null>(null);

  const lastSelectedEquipment = React.useRef<string | null>(null);

  console.log("captured data: ", selectedComponent);

  console.log("old data: ", routeComponentIds);

  const form = useForm<z.infer<typeof ClientEquipmentSchema>>({
    resolver: zodResolver(ClientEquipmentSchema),
    defaultValues: {
      equiment: "",
    },
  });

  return (
    <div className="w-full h-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
      <div className="w-full xl:w-1/3 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold">Equipment List</h1>
        <Form {...form}>
          <FormField
            name="equipment"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                {/* <FormLabel>Search Equipment</FormLabel> */}
                <Select
                  onValueChange={(value) => {
                    const equipment = equipmentList.find(
                      (eq) => eq.id === value
                    );
                    if (lastSelectedEquipment.current !== value) {
                      setSelectedEquipment(
                        equipment
                          ? {
                              ...equipment,
                              components: Array.isArray(equipment.components)
                                ? equipment.components
                                : [],
                            }
                          : null
                      );
                      lastSelectedEquipment.current = value;
                      setSelectedComponent(null);
                    }

                    field.onChange(value);
                    setSelectedComponent(null);
                  }}
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Equipment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="flex flex-col max-h-[200px] overflow-auto">
                      <div className="relative p-2">
                        <Search
                          className="absolute top-4 left-5 text-zinc-500"
                          size={20}
                        />
                        <Input
                          onChange={handleSearch}
                          placeholder="Search Equipment..."
                          className="focus-visible:ring-0 pl-10"
                        />
                      </div>
                      {equipmentsLoading ? (
                        <div className="w-full h-full flex flex-col gap-1 mt-1">
                          {[...Array(5)].map((_, index) => (
                            <Skeleton
                              key={index}
                              className="w-full h-[25px] animate-pulse"
                              style={{ animationDelay: `${index * 0.2}s` }}
                            />
                          ))}
                        </div>
                      ) : equipmentList.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                          <h1 className="text-xl font-bold text-zinc-300 my-10">
                            No Equipment Found
                          </h1>
                        </div>
                      ) : (
                        equipmentList.map((equipment) => (
                          <SelectItem key={equipment.id} value={equipment.id}>
                            {equipment.name}
                          </SelectItem>
                        ))
                      )}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {isLoading ? (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Components</h2>
            <ul className="pl-5 pt-5 space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[30px] w-[80%] rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </ul>
          </div>
        ) : (
          selectedComponentData &&
          selectedComponentData.selectedComponentData && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Components</h2>
              <ul className="pl-5 pt-5 space-y-2">
                {selectedComponentData.selectedComponentData.length > 0 ? (
                  selectedComponentData.selectedComponentData.map(
                    (component) => (
                      <li
                        key={component.id}
                        className={`p-2 border rounded cursor-pointer ${
                          selectedComponent?.id === component.id
                            ? "bg-red-400 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedComponent({
                            id: component.id,
                            name: component.name,
                            routeComponent: component.routeComponent || [],
                          })
                        }
                      >
                        {component.name}
                      </li>
                    )
                  )
                ) : (
                  <p className="text-gray-500">No components found.</p>
                )}
              </ul>
            </div>
          )
        )}
      </div>
      <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Severity History</h1>
          {/* <Button
            onClick={() => setOpen(!open)}
            className="bg-main hover:bg-follow text-white"
          >
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <ExportClient onClose={() => setOpen(false)} />
          </Dialog> */}
        </div>

        <div className="w-full mt-3">
          <SeverityHistory
            // isLoading={isLoading}
            selectedComponent={selectedComponent}
          />
        </div>

        <div className="flex flex-col gap-3 w-full mt-5">
          <Recommendation
            // isLoading={isLoading}
            selectedComponent={selectedComponent}
          />
        </div>
        <div className="flex w-full gap-5 xl:flex-row flex-col">
          <div className="flex flex-col gap-3 w-full mt-5">
            <ClientActionSection
              // isLoading={isLoading}
              selectedComponent={selectedComponent}
              openClientAction={openClientAction}
              setOpenClientAction={setOpenClientAction}
            />
          </div>
          <div className="flex flex-col gap-3 w-full mt-5">
            <AnalystNoteSection
              // isLoading={isLoading}
              selectedComponent={selectedComponent}
              openAnalystNote={openAnalystNote}
              setOpenAnalystNote={setOpenAnalystNote}
            />
          </div>
        </div>

        {/* ####################### EQUIPMENT DRAWING REQUIRED ######################### */}

        <div className="flex flex-col md:flex-row gap-5 mt-3">
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

        <div className="flex flex-col gap-3 w-full mt-5">
          {/* <h1 className="text-sm font-medium">Details</h1>
          <div className="border rounded-lg p-3">
            <div className="flex gap-5 items-center">
              <Button
                onClick={() => setDetailsActive("add")}
                variant={"outline"}
              >
                <Plus size={20} className="text-zinc-400" />
                <span className="text-zinc-500">Add Details</span>
              </Button>
              <Button
                onClick={() => setDetailsActive("view")}
                variant={"outline"}
              >
                <Eye size={20} className="text-zinc-400" />
                <span className="text-zinc-500">View Details</span>
              </Button>
            </div>
            <div className="bg-zinc-200 h-[1px] w-full my-3" />
            {detailsActive === "add" ? <AddDetails /> : <ViewDetails />}
          </div> */}
          <ComponentDetailsSection
            // isLoading={isLoading}
            selectedComponent={selectedComponent}
            openAddDetails={openAddDetails}
            setOpenAddDetails={setOpenAddDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAnalysis;
