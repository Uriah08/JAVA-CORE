"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useCreateJobMutation } from "@/store/api";
import { useToast } from "@/hooks/use-toast";
import { useGetClientsQuery } from "@/store/api";
import Loading from "@/components/ui/loading";
import NestedList from "../list/create-route/NestedList";

const AnalysisAndReportForm = () => {
  const { toast } = useToast();

  const [createJob, { isLoading: createJobLoading }] = useCreateJobMutation();

  const form = useForm<z.infer<typeof analysisAndReportSchema>>({
    resolver: zodResolver(analysisAndReportSchema),
    defaultValues: {
      client: "",
      area: "",
      jobNo: "",
      inspectionRoute: "",
      yearWeekNo: "",
    },
  });

  const { data, isLoading: clientLoading } = useGetClientsQuery();
  const clients = data?.clients || [];

  async function onSubmit(values: z.infer<typeof analysisAndReportSchema>) {
    try {
      const formattedValues = {
        ...values,
      };

      const response = await createJob(formattedValues).unwrap();

      if (!response.success) {
        throw new Error(response.message);
      }
      toast({
        title: "Success",
        description: response.message,
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

  const jobnumber = [
    { id: "JN-001", name: "Job Number 001" },
    { id: "JN-002", name: "Job Number 002" },
    { id: "JN-003", name: "Job Number 003" },
    { id: "JN-004", name: "Job Number 004" },
    { id: "JN-005", name: "Job Number 005" },
  ];

  const route = [
    { id: "JN-001", name: "route 001" },
    { id: "JN-002", name: "route 002" },
    { id: "JN-003", name: "route 003" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 mt-0 flex flex-col"
      >
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem className='"w-full md:w-1/2'>
                <FormLabel>Job Number</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          clientLoading ? "Loading..." : "Select Job Number"
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
                        jobnumber.map((jobnumber) => (
                          <SelectItem key={jobnumber.id} value={jobnumber.id}>
                            {jobnumber.name}
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
            name="client"
            render={({ field }) => (
              <FormItem className='"w-full md:w-1/2'>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input
                    placeholder="select Job Number first"
                    {...field}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className='"w-full md:w-1/2'>
                <FormLabel>Year and Week No.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="select Job Number first"
                    {...field}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3 w-2/3">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className='"w-full md:w-1/2'>
                <FormLabel>Route name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          clientLoading ? "Loading..." : "Select a route"
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
                        route.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.name}
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
            name="client"
            render={({ field }) => (
              <FormItem className='"w-full md:w-1/2'>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input
                    placeholder="select Job Number first"
                    {...field}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3 w-full"></div>
        <hr className="my-0 border-t border-gray-300 w-full" />{" "}
        <div className="flex gap-5 w-full">
          <div className="w-1/4">
            <h2 className="text-lg font-semibold mb-3">Equipment List</h2>
            {areas.map((area) => (
              <NestedList key={area.id} data={area} />
            ))}
          </div>

          <hr className="h-auto border-l border-gray-300 mx-4 -mt-3" />
          <div className="w-3/4">
            <div className="flex md:flex-row flex-col gap-3 w-full"></div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AnalysisAndReportForm;
