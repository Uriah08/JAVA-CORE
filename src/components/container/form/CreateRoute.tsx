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
import { jobSchema } from "@/schema";
import NestedList from "./NestedList";
import { Input } from "@/components/ui/input";

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

const CreateRoute = () => {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      client: "",
    },
  });

  function onSubmit(values: z.infer<typeof jobSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
  }
  const areas: Area[] = [
    {
      id: 1,
      name: "Area 1",
      equipmentGroups: [
        {
          id: 1,
          name: "Equipment Group 1",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
        {
          id: 2,
          name: "Equipment Group 2",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
        {
          id: 3,
          name: "Equipment Group 3",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Area 2",
      equipmentGroups: [
        {
          id: 1,
          name: "Equipment Group 1",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
        {
          id: 2,
          name: "Equipment Group 2",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
        {
          id: 3,
          name: "Equipment Group 3",
          equipmentNames: [
            {
              id: 1,
              name: "Equipment Name 1",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 2,
              name: "Equipment Name 2",
              components: ["Component 1", "Component 2", "Component 3"],
            },
            {
              id: 3,
              name: "Equipment Name 3",
              components: ["Component 1", "Component 2", "Component 3"],
            },
          ],
        },
      ],
    },
  ];

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
              <NestedList key={area.id} data={area} />
            ))}
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4" />
          <div className="w-2/3">
            <div className="flex md:flex-row flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="woNo"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Create Route</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter route name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateRoute;
