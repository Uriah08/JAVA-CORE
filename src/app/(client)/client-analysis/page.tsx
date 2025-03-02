"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, ImageIcon, Plus, Search, Trash, View } from "lucide-react";
import Image from "next/image";
import { symbols } from "@/schema";
import { Dialog } from "@/components/ui/dialog";
import ExportClient from "@/components/container/dialogs/ExportClient";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddDetails from "@/components/container/form/AddDetails";
import ViewDetails from "@/components/container/analysis/ViewDetails";
import { FigureView } from "@/components/container/analysis/FigureView";
import { FigureUpload } from "@/components/container/analysis/FigureUpload";
import { EquipmentUpload } from "@/components/container/analysis/EquipmentUpload";
import { EquipmentView } from "@/components/container/analysis/EquipmentView";

import { useSearchClientRouteEquipmentListQuery } from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { ClientEquipmentSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const symbol1 = [
  { symbol: "/severity/C.png" },
  { symbol: "/severity/M.png" },
  { symbol: "/severity/C.png" },
  { symbol: "/severity/N.png" },
  { symbol: "/severity/X.png" },
  { symbol: "/severity/S.png" },
  { symbol: "/severity/S.png" },
  { symbol: "/severity/C.png" },
  { symbol: "/severity/N.png" },
  { symbol: "/severity/X.png" },
];

const ClientAnalysis = () => {
  const [detailsActive, setDetailsActive] = useState("add");

  const [activeDrawing, setActiveDrawing] = useState("view");
  const [activeFigure, setActiveFigure] = useState("add");

  const [open, setOpen] = useState(false);

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
      name: string;
      routeComponent?: {
        id: string;
      }[];
    }[];
  } | null>(null);

  console.log("fetched data: ", selectedEquipment?.components);

  const [selectedComponent, setSelectedComponent] = React.useState<{
    id: string;
    name: string;
    routeComponent?: {
      id: string;
    }[];
  } | null>(null);

  console.log("captured data: ", selectedComponent);

  const form = useForm<z.infer<typeof ClientEquipmentSchema>>({
    resolver: zodResolver(ClientEquipmentSchema),
    defaultValues: {
      equiment: "",
    },
  });

  return (
    <div className="w-full h-full p-5 flex xl:flex-row flex-col gap-5">
      <div className="w-full xl:w-1/3 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">Equipment List</h1>
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
                          className="absolute top-3 left-3 text-zinc-500"
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

        {selectedEquipment && selectedEquipment.components && (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Components</h2>
            <ul className="pl-5 pt-5 space-y-2">
              {Array.isArray(selectedEquipment.components) &&
              selectedEquipment.components.length > 0 ? (
                selectedEquipment.components.map((component) => (
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
                ))
              ) : (
                <p className="text-gray-500">No components found.</p>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Severity History</h1>
          <Button
            onClick={() => setOpen(!open)}
            className="bg-main hover:bg-follow text-white"
          >
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <ExportClient onClose={() => setOpen(false)} />
          </Dialog>
        </div>
        <div className="flex gap-3 flex-wrap mt-3">
          {symbols.map((symbol) => (
            <div key={symbol.image} className="flex gap-1">
              <Image
                src={`/severity/${symbol.image}.png`}
                width={40}
                height={40}
                alt="Symbol"
                className="w-5 object-cover"
              />
              <h1 className="text-sm text-zinc-600">{symbol.label}</h1>
            </div>
          ))}
        </div>
        <div className="border rounded-lg mt-5 flex overflow-auto">
          {symbol1.map((symbol, i) => (
            <div
              key={i}
              className="p-3 min-w-[100px] w-full flex justify-center border-r"
            >
              <Image
                src={symbol.symbol}
                width={40}
                height={40}
                alt="symbol"
                className="w-8 object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full mt-5">
          <h1 className="text-sm font-medium">Recommendations</h1>
          <div className="border rounded-lg p-3">
            <h1 className="font-semibold">Previous Recommendations</h1>
            <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
              <p className="text-sm text-zinc-600 indent-10">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Asperiores est laboriosam temporibus aliquam tempore itaque
                nihil atque, ducimus quibusdam placeat illum, maiores eveniet
                pariatur quia, ex aut tenetur dignissimos! Sequi? Asperiores est
                laboriosam temporibus aliquam tempore itaque nihil atque,
                ducimus quibusdam placeat illum, maiores eveniet pariatur quia,
                ex aut tenetur dignissimos! Sequi? Asperiores est laboriosam
                temporibus aliquam tempore itaque nihil atque, ducimus quibusdam
                placeat illum, maiores eveniet pariatur quia, ex aut tenetur
                dignissimos! Sequi?
              </p>
              <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                Jan 1, 2025
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-5 xl:flex-row flex-col">
          <div className="flex flex-col gap-3 w-full mt-5">
            <h1 className="text-sm font-medium">Action</h1>
            <div className="border rounded-lg p-3">
              <h1 className="font-semibold">Previous Action</h1>
              <div className="border rounded-lg p-3 mt-2 max-h-[160px] overflow-auto">
                <p className="text-sm text-zinc-600 indent-10">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Asperiores est laboriosam temporibus aliquam tempore itaque
                  nihil atque, ducimus quibusdam placeat illum, maiores eveniet
                  pariatur quia, ex aut tenetur dignissimos! Sequi? Asperiores
                  est laboriosam temporibus aliquam tempore itaque nihil atque,
                  ducimus quibusdam placeat illum, maiores eveniet pariatur
                  quia, ex aut tenetur dignissimos! Sequi? Asperiores est
                  laboriosam temporibus aliquam tempore itaque nihil atque,
                  ducimus quibusdam placeat illum, maiores eveniet pariatur
                  quia, ex aut tenetur dignissimos! Sequi?
                </p>
                <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                  Jan 1, 2025
                </h1>
              </div>
              <div className="flex gap-3 mt-3 items-center">
                <Input placeholder="Comment here..." />
                <Button className="bg-main hover:bg-follow">Send</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full mt-5">
            <h1 className="text-sm font-medium">Notes</h1>
            <div className="border rounded-lg p-3">
              <h1 className="font-semibold">Analyst Note</h1>
              <div className="border rounded-lg p-3 mt-2 max-h-[112px] overflow-auto">
                <p className="text-sm text-zinc-600 indent-10">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Asperiores est laboriosam temporibus aliquam tempore itaque
                  nihil atque, ducimus quibusdam placeat illum, maiores eveniet
                  pariatur quia, ex aut tenetur dignissimos! Sequi? Asperiores
                  est laboriosam temporibus aliquam tempore itaque nihil atque,
                  ducimus quibusdam placeat illum, maiores eveniet pariatur
                  quia, ex aut tenetur dignissimos! Sequi? Asperiores est
                  laboriosam temporibus aliquam tempore itaque nihil atque,
                  ducimus quibusdam placeat illum, maiores eveniet pariatur
                  quia, ex aut tenetur dignissimos! Sequi?
                </p>
                <h1 className="w-full text-end text-xs text-zinc-500 mt-2">
                  Jan 1, 2025
                </h1>
              </div>
              <Select>
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder="Select Analyst" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst 1">Analyst 1</SelectItem>
                  <SelectItem value="analyst 2">Analyst 2</SelectItem>
                  <SelectItem value="analyst 3">Analyst 3</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-3 mt-3 items-center">
                <Input placeholder="Input analyst note here..." />
                <Button className="bg-main hover:bg-follow">Send</Button>
              </div>
            </div>
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
          <h1 className="text-sm font-medium">Details</h1>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAnalysis;
