"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/ui/breadcrumbs";
import ItemList from "../list/create-route/ItemList";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRouteSchema } from "@/schema";
import { useGetClientsQuery } from "@/store/api";
import {
  useGetMachineListQuery,
  useLazyGetEquipmentGroupsQuery,
  useLazyGetEquipmentNamesQuery,
  useLazyGetComponentsQuery,
} from "@/store/api";
import Loading from "@/components/ui/loading";
import React from "react";

const CreateRoute = () => {
  const { data, isLoading: clientLoading } = useGetClientsQuery();
  const clients = data?.clients || [];
  const {
    data: areaData,
    isLoading: areaLoading,
    error: areaError,
  } = useGetMachineListQuery();
  const [
    fetchEquipmentGroups,
    { data: equipmentGroupData, error: groupError },
  ] = useLazyGetEquipmentGroupsQuery();

  const [fetchEquipmentNames, { data: equipmentNameData, error: nameError }] =
    useLazyGetEquipmentNamesQuery();

  const [fetchComponents, { data: componentData, error: componentError }] =
    useLazyGetComponentsQuery();

  const [loading, setLoading] = useState({
    areas: false,
    groups: false,
    names: false,
    components: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentArea, setCurrentArea] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEquipmentGroup, setCurrentEquipmentGroup] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (areaError || groupError || nameError || componentError) {
    return <div className="text-red-600">Error loading data.</div>;
  }

  const setLoadingState = (key: keyof typeof loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAreaClick = async (area: any) => {
    setLoadingState("areas", true);
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
    await fetchEquipmentGroups(area.id);
    setLoadingState("areas", false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEquipmentGroupClick = async (equipmentGroup: any) => {
    setLoadingState("groups", true);
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);
    await fetchEquipmentNames(equipmentGroup.id);
    setLoadingState("groups", false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEquipmentNameClick = async (equipmentName: any) => {
    setLoadingState("names", true);
    setCurrentEquipmentName(equipmentName);
    setBreadcrumb([breadcrumb[0], breadcrumb[1], equipmentName.name]);
    await fetchComponents(equipmentName.id);
    setLoadingState("names", false);
  };

  const handleBreadcrumbClick = (level: number) => {
    if (level === 0) {
      setCurrentArea(null);
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([]);
    } else if (level === 1) {
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0]]);
    } else if (level === 2) {
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0], breadcrumb[1]]);
    }
  };

  const form = useForm<z.infer<typeof CreateRouteSchema>>({
    resolver: zodResolver(CreateRouteSchema),
    defaultValues: {
      clientName: "",
      routeName: "",
      areaId: "",
      equipmentNames: [
        {
          id: "",
          components: [""],
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof CreateRouteSchema>) {
    console.log(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 mt-5 flex flex-col"
      >
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full md:w-1/3">
                <FormLabel className="flex items-center h-full">
                  Client
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          clientLoading ? "Loading..." : "Select a client"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <div className="flex flex-col max-h-[200px] overflow-auto">
                      {clientLoading ? (
                        <div>
                          <Loading />
                        </div>
                      ) : (
                        clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
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
        <hr className="my-0 border-t border-gray-300 w-full" />{" "}
        <div className="flex gap-5 w-full">
          <div className="w-2/5">
            <h2 className="text-lg font-semibold mb-3">Machine List</h2>
            <div className="font-base flex flex-col">
              <Breadcrumb
                breadcrumb={breadcrumb}
                handleBreadcrumbClick={handleBreadcrumbClick}
              />
              <ItemList
                items={
                  currentEquipmentName
                    ? componentData?.components || []
                    : currentEquipmentGroup
                    ? equipmentNameData?.equipmentNames || []
                    : currentArea
                    ? equipmentGroupData?.equipmentGroups || []
                    : areaData?.areas || []
                }
                loading={
                  loading.areas ||
                  loading.groups ||
                  loading.names ||
                  loading.components
                }
                onItemClick={
                  currentEquipmentName
                    ? () => {}
                    : currentEquipmentGroup
                    ? handleEquipmentNameClick
                    : currentArea
                    ? handleEquipmentGroupClick
                    : handleAreaClick
                }
                selectedItems={selectedItems}
                isDraggable={!!currentEquipmentGroup && !currentEquipmentName}
              />
            </div>
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4 -mt-3" />
          <div className="w-3/5">
            <div className="flex md:flex-row flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="routeName"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-lg font-semibold">
                      Create Route
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter route name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-3">
              <FormField
                control={form.control}
                name="areaId"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-lg font-semibold">
                      Area
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              areaLoading ? "Loading..." : "Select an Area"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <div className="flex flex-col max-h-[200px] overflow-auto">
                          {areaLoading ? (
                            <div>
                              <Loading />
                            </div>
                          ) : (
                            areaData?.areas.map((area) => (
                              <SelectItem key={area.id} value={area.id}>
                                {area.name}
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
          </div>
        </div>
        <Button
          type="submit"
          className="w-20 absolute top-48 right-16 bg-red-700 hover:bg-red-300 text-white py-2 rounded-md"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoute;
