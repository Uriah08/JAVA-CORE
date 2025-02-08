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
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { routeSchema } from "@/schema";
import { useGetClientsQuery } from "@/store/api";
import {
  useGetMachineListQuery,
  useLazyGetEquipmentGroupsQuery,
  useLazyGetEquipmentNamesQuery,
  useLazyGetComponentsQuery,
} from "@/store/api";
import Loading from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";
import NestedList from "../list/create-route/NestedList";

type Component = {
  name: string;
  id: string;
  isDelete: boolean;
  equipmentNameId: string | null;
};

type EquipmentName = {
  name: string;
  id: string;
  isDelete: boolean;
  groupId: string | null;
  components: Component[];
};

type EquipmentGroup = {
  name: string;
  id: string;
  isDelete: boolean;
  areaId: string | null;
  equipmentNames: EquipmentName[];
};

type AreaWithDetails = {
  name: string;
  id: string;
  isDelete: boolean;
  equipmentGroups: EquipmentGroup[];
};

type NestedData = {
  id: string;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: Component[];
};

const CreateRoute = () => {
  const { data, isLoading: clientLoading } = useGetClientsQuery();
  const clients = data?.clients || [];

  const { data: machineListData, isLoading: areaLoading } =
    useGetMachineListQuery();
  const areaList = machineListData?.areas || [];

  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      client: "",
      route: "",
    },
  });

  function onSubmit(values: z.infer<typeof routeSchema>) {
    console.log(values);
    form.reset();
  }

  const [areasWithDetails, setAreasWithDetails] = useState<AreaWithDetails[]>(
    []
  );
  const [fetchEquipmentGroups] = useLazyGetEquipmentGroupsQuery();
  const [fetchEquipmentNames] = useLazyGetEquipmentNamesQuery();
  const [fetchComponents] = useLazyGetComponentsQuery();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const areasWithEquipmentGroups = await Promise.all(
        areaList.map(async (area) => {
          const equipmentGroups = await fetchEquipmentGroups(area.id).unwrap();
          const groupsWithEquipmentNames = await Promise.all(
            equipmentGroups.equipmentGroups.map(async (group) => {
              const equipmentNames = await fetchEquipmentNames(
                group.id
              ).unwrap();
              const namesWithComponents = await Promise.all(
                equipmentNames.equipmentNames.map(async (name) => {
                  const components = await fetchComponents(name.id).unwrap();
                  return { ...name, components: components.components };
                })
              );
              return { ...group, equipmentNames: namesWithComponents };
            })
          );
          return { ...area, equipmentGroups: groupsWithEquipmentNames };
        })
      );
      setAreasWithDetails(areasWithEquipmentGroups);
      setLoading(false);
    };

    if (areaList.length > 0) {
      fetchAllData();
    }
  }, [areaList, fetchEquipmentGroups, fetchEquipmentNames, fetchComponents]);

  const transformedAreas: NestedData[] = areasWithDetails.map((area) => ({
    id: area.id,
    name: area.name,
    equipmentGroups: area.equipmentGroups.map((group) => ({
      id: group.id,
      name: group.name,
      equipmentNames: group.equipmentNames.map((name) => ({
        id: name.id,
        name: name.name,
        components: name.components,
      })),
    })),
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 mt-5 flex flex-col"
      >
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="client"
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
          <div className="w-1/3">
            <h2 className="text-lg font-semibold mb-3">Machine List</h2>
            {loading ? (
              <div className="w-full h-full overflow-hidden">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-[53px] border-t animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            ) : transformedAreas.length > 0 ? (
              transformedAreas.map((area) => (
                <NestedList key={area.id} data={area} />
              ))
            ) : (
              <div className="flex flex-col items-center my-20">
                <p className="text-gray-300 text-3xl font-bold">
                  No items available.
                </p>
              </div>
            )}
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4 -mt-3" />
          <div className="w-2/3">
            <div className="flex md:flex-row flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="route"
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
                name="client"
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
                            areaList.map((area) => (
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
