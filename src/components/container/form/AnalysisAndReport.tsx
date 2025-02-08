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
import { Search } from "lucide-react";

import { useSearchJobNumberQuery } from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";

const AnalysisAndReportForm = () => {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = React.useState("")
  const { data, isFetching: jobsLoading } = useSearchJobNumberQuery(searchTerm, {
    skip: searchTerm.length < 3
  })

  const jobs = data?.jobs || []
  
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  )

  React.useEffect(() => {
    return handleSearch.cancel
  },[handleSearch.cancel])

  const [selectedJob, setSelectedJob] = React.useState<{
    jobNumber: string;
    area?: string;
    user?: {
      name?: string; 
    }
    yearWeekNumber?: string;
    reviewer?: string | null
  } | null>(null);

  const form = useForm<z.infer<typeof analysisAndReportSchema>>({
    resolver: zodResolver(analysisAndReportSchema),
    defaultValues: {
      client: "",
      area: "",
      jobNo: "",
      inspectionRoute: "",
      yearWeekNo: "",
      reviewer: ""
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
    <div className="w-full flex flex-col gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 mt-0 flex flex-col"
        >
          <div className="w-full h-full bg-white rounded-xl p-5 shadow-lg">
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold text-black">
                Analysis and Reporting
              </h1>
              <h2 className="text-lg font-semibold mb-3 mt-3 text-zinc-700">Information</h2>
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
                        const job = jobs.find((job) => job.jobNumber === value);
                        setSelectedJob(job || null);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              "Select Job Number"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <div className="flex flex-col max-h-[200px] overflow-auto">
                          <div className="relative">
                            <Search className="absolute top-2 left-3 text-zinc-500" size={20}/>
                          <Input onChange={handleSearch} placeholder="Search Job Number" className="focus-visible:ring-0 pl-10" />
                          </div>
                          {jobsLoading ? (
                            <div className="w-full h-full overflow-hidden flex flex-col gap-1 mt-1">
                            {[...Array(5)].map((_, index) => (
                            <Skeleton
                              key={index}
                              className="w-full h-[25px] animate-pulse"
                              style={{ animationDelay: `${index * 0.2}s` }}
                            />
                          ))}
                          </div>
                          ) : (
                            jobs.length <= 0 ? (
                              <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-xl font-bold text-zinc-300 my-10">No Job Found</h1>
                              </div>
                            ) : (
                              jobs.map((job) => (
                                <SelectItem key={job.jobNumber} value={job.jobNumber}>
                                  {job.jobNumber}
                                </SelectItem>
                              ))
                            )
                          )}
                        </div>
                      </SelectContent>
                    </Select>
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
              /></div>
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
                        value={!selectedJob ? "" : selectedJob?.reviewer || "None"}
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
                  <FormItem className='"w-full'>
                    <FormLabel>Route Name</FormLabel>
                    <FormControl>
                      <Input
                      className="text-sm"
                        placeholder="Enter route name..."
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-3 w-2/3 px-5">
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="w-full lg:w-1/2 rounded-xl bg-white flex flex-col p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-zinc-700">Equipment List</h2>
              {/* {areas.map((area) => (
                <NestedList key={area.id} data={area} />
              ))} */}
            </div>

            <div className="w-full lg:w-1/2 rounded-xl bg-white flex flex-col p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-zinc-700">Severity History</h2>
              <div className="flex flex-col md:flex-row gap-3">
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Comments</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Previous Comments</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnalysisAndReportForm;
