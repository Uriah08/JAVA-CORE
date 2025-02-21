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
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRouteSchema } from "@/schema";
import { useGetClientsQuery } from "@/store/api";
import {
  useGetMachineListQuery,
  useLazyGetEquipmentGroupsQuery,
  useLazyGetEquipmentNamesQuery,
  useLazyGetComponentsQuery,
  useCreateRouteMutation,
} from "@/store/api";
import Loading from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import EquipmentSelector from "@/components/container/list/create-route/EquipmentSelector";

interface Component {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  components?: Component[];
  isEquipmentName?: boolean;
}

interface EquipmentGroup {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
}

const CreateRoute = () => {
  const form = useForm<z.infer<typeof CreateRouteSchema>>({
    resolver: zodResolver(CreateRouteSchema),
    defaultValues: {
      clientId: "",
      routeName: "",
      areaId: "",
      equipmentNames: [],
    },
  });

  const { toast } = useToast();

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

  const [fetchEquipmentNames, { error: nameError }] =
    useLazyGetEquipmentNamesQuery();

  const [fetchComponents, { error: componentError }] =
    useLazyGetComponentsQuery();

  const [loading, setLoading] = useState({
    areas: false,
    groups: false,
    names: false,
    components: false,
  });

  const [currentArea, setCurrentArea] = useState<Area | null>(null);

  const [currentEquipmentGroup, setCurrentEquipmentGroup] =
    useState<EquipmentGroup | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [equipmentList, setEquipmentList] = useState<Item[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Item[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [selectedItems] = useState<string[]>([]);
  const [createRoute, { isLoading: isCreating, error: createError }] =
    useCreateRouteMutation();

  if (areaError || groupError || nameError || componentError) {
    return <div className="text-red-600">Error loading data.</div>;
  }

  const setLoadingState = (key: keyof typeof loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleAreaClick = async (area: Area) => {
    setLoadingState("areas", true);
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
    await fetchEquipmentGroups(area.id);
    setLoadingState("areas", false);
  };

  const handleEquipmentGroupClick = async (equipmentGroup: EquipmentGroup) => {
    setLoadingState("groups", true);
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);

    const equipmentNamesResponse = await fetchEquipmentNames(equipmentGroup.id);
    const equipmentNames = equipmentNamesResponse?.data?.equipmentNames || [];

    const equipmentWithComponents = await Promise.all(
      equipmentNames.map(async (equipment: Item) => {
        const componentResponse = await fetchComponents(equipment.id);
        return {
          ...equipment,
          components: componentResponse?.data?.components || [],
          isEquipmentName: true,
        };
      })
    );

    setLoadingState("groups", false);
    setEquipmentList(equipmentWithComponents);
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
    }
  };
  const handleEquipmentSelect = (item: Item) => {
    setSelectedEquipment((prev) => {
      const isAlreadySelected = prev.some((e) => e.id === item.id);
      if (isAlreadySelected) {
        return prev;
      }
      return [...prev, item];
    });
  };

  async function onSubmit(values: z.infer<typeof CreateRouteSchema>) {
    const equipmentNames = selectedEquipment.map(({ id, components }) => ({
      id,
      components: components?.map((comp) => comp.id) || [],
    }));

    const finalValues = {
      ...values,
      equipmentNames,
    };

    try {
      const response = await createRoute(finalValues).unwrap();
      console.log("Route created successfully:", response);
      setSelectedEquipment([]);
      setTimeout(() => {
        form.reset();
      }, 0);
      setSelectedEquipment([]);
      toast({
        title: "Successfully Created",
        description: response.message,
      });
      setCurrentArea(null);
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([]);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      console.error("Failed to create route:", err);
      console.error(createError);
      toast({
        title: "Error",
        description: err.data?.message || "An unexpected error occurred.",
      });
    }
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
            name="clientId"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel className="text-lg font-semibold">Client</FormLabel>
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
          <div className="flex-grow flex justify-end">
            <Button
              type="submit"
              className="w-20 bg-red-700 hover:bg-red-300 text-white mt-8 py-2 rounded-md"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
        <hr className="my-0 border-t border-gray-300 w-full" />{" "}
        <div className="flex gap-5 w-full">
          <div className="w-2/6">
            <h2 className="text-lg font-semibold mb-3">Machine List</h2>
            <div className="font-base flex flex-col">
              <Breadcrumb
                breadcrumb={breadcrumb}
                handleBreadcrumbClick={handleBreadcrumbClick}
              />
              <ItemList
                items={
                  currentEquipmentGroup
                    ? equipmentList
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
                    : currentArea
                    ? handleEquipmentGroupClick
                    : handleAreaClick
                }
                selectedItems={selectedItems}
                onEquipmentSelect={handleEquipmentSelect}
              />
            </div>
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4 -mt-3" />
          <div className="w-4/6">
            <div className="flex gap-5 w-full">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="areaId"
                  render={({ field }) => (
                    <FormItem className="w-full">
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

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="routeName"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
            </div>
            <FormField
              control={form.control}
              name="equipmentNames"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <EquipmentSelector
                      field={field}
                      selectedEquipment={selectedEquipment}
                      setSelectedEquipment={setSelectedEquipment}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateRoute;
