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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { routeSchema } from "@/schema";
import NestedList from "./NestedList";
import DroppedList from "./DroppedList";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Area = {
  id: number;
  name: string;
  equipmentGroups: {
    id: number;
    name: string;
    equipmentNames: {
      id: number;
      name: string;
      components: string[];
    }[];
  }[];
};

type NestedData = {
  id: number;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: string[];
};

const CreateRoute = () => {
  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      client: "",
      route: "",
      droppedItems: [],
    },
  });

  const [droppedItems, setDroppedItems] = useState<NestedData[]>([]);

  function onSubmit(values: z.infer<typeof routeSchema>) {
    console.log(values);
    form.reset();
  }

  const areas: Area[] = [
    {
      id: 1,
      name: "Area 1",
      equipmentGroups: [
        {
          id: 2,
          name: "Equipment Group 1",
          equipmentNames: [
            {
              id: 3,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 4,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 5,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
      ],
    },
    {
      id: 14,
      name: "Area 2",
      equipmentGroups: [
        {
          id: 15,
          name: "Equipment Group 1",
          equipmentNames: [
            {
              id: 16,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 17,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 18,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
      ],
    },
  ];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    data: NestedData
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    parentId?: number,
    type?: "equipmentGroup" | "equipmentName" | "component"
  ) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    const itemExists = (items: NestedData[], item: NestedData) => {
      return items.some((existingItem) => existingItem.id === item.id);
    };

    if (parentId) {
      setDroppedItems((prev) =>
        prev.map((item) => {
          if (item.id === parentId) {
            if (type === "equipmentGroup") {
              if (!itemExists(item.equipmentGroups || [], data)) {
                return {
                  ...item,
                  equipmentGroups: [
                    ...(item.equipmentGroups || []),
                    { id: Date.now(), name: data.name },
                  ],
                };
              }
            } else if (type === "equipmentName") {
              if (!itemExists(item.equipmentNames || [], data)) {
                return {
                  ...item,
                  equipmentNames: [
                    ...(item.equipmentNames || []),
                    { id: Date.now(), name: data.name },
                  ],
                };
              }
            } else if (type === "component") {
              if (!item.components?.includes(data.name)) {
                return {
                  ...item,
                  components: [...(item.components || []), data.name],
                };
              }
            }
          } else if (item.equipmentGroups || item.equipmentNames) {
            return {
              ...item,
              equipmentGroups: item.equipmentGroups
                ? item.equipmentGroups.map((group) =>
                    group.id === parentId
                      ? {
                          ...group,
                          equipmentNames:
                            type === "equipmentName" &&
                            !itemExists(group.equipmentNames || [], data)
                              ? [
                                  ...(group.equipmentNames || []),
                                  { id: Date.now(), name: data.name },
                                ]
                              : group.equipmentNames,
                          components:
                            type === "component" &&
                            !group.components?.includes(data.name)
                              ? [...(group.components || []), data.name]
                              : group.components,
                        }
                      : group
                  )
                : undefined,
              equipmentNames: item.equipmentNames
                ? item.equipmentNames.map((name) =>
                    name.id === parentId
                      ? {
                          ...name,
                          components:
                            type === "component" &&
                            !name.components?.includes(data.name)
                              ? [...(name.components || []), data.name]
                              : name.components,
                        }
                      : name
                  )
                : undefined,
            };
          }
          return item;
        })
      );
    } else {
      if (!itemExists(droppedItems, data)) {
        setDroppedItems((prev) => [...prev, data]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveItem = (
    itemId: number,
    parentId?: number,
    type?: "component" | "equipmentGroup" | "equipmentName"
  ) => {
    setDroppedItems((prev) => {
      const removeItem = (items: NestedData[]): NestedData[] => {
        return items
          .map((item) => {
            if (type === "component" && item.id === parentId) {
              return {
                ...item,
                components: item.components?.filter((_, idx) => idx !== itemId),
              };
            } else if (type === "equipmentGroup" && item.id === parentId) {
              return {
                ...item,
                equipmentGroups: item.equipmentGroups?.filter(
                  (group) => group.id !== itemId
                ),
              };
            } else if (type === "equipmentName" && item.id === parentId) {
              return {
                ...item,
                equipmentNames: item.equipmentNames?.filter(
                  (name) => name.id !== itemId
                ),
              };
            } else if (item.id === itemId && !type) {
              return null;
            } else {
              return {
                ...item,
                equipmentGroups: item.equipmentGroups
                  ? removeItem(item.equipmentGroups)
                  : undefined,
                equipmentNames: item.equipmentNames
                  ? removeItem(item.equipmentNames)
                  : undefined,
              };
            }
          })
          .filter(Boolean) as NestedData[];
      };

      return removeItem(prev);
    });
  };

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
              <FormItem className="flex items-center gap-3 w-full md:w-1/2">
                <FormLabel className="flex items-center h-full">
                  Client
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pt-0">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="client1">Client 1</SelectItem>
                    <SelectItem value="client2">Client 2</SelectItem>
                    <SelectItem value="client3">Client 3</SelectItem>
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
            {areas.map((area) => (
              <NestedList
                key={area.id}
                data={area}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4" />
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
            <DroppedList
              droppedItems={droppedItems}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-20 absolute top-48 right-16 bg-red-700 hover:bg-red-800 text-white py-2 rounded-md"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoute;
