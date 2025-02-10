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
import { EllipsisVertical, Search } from "lucide-react";

import { useSearchJobNumberQuery } from "@/store/api";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Comments from "../dialogs/Comments";

import { symbols } from "@/schema";
import Recommendations from "../dialogs/Recommendations";

const AnalysisAndReportForm = () => {
  const { toast } = useToast();

  const [active, setActive] = React.useState('')
  const [openComment, setOpenComment] = React.useState(false)
  const [openRecommendation, setOpenRecommendation] = React.useState(false)

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
            <div className="w-full lg:w-1/3 rounded-xl bg-white flex flex-col p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-3 text-zinc-700">Equipment List</h2>
              {/* {areas.map((area) => (
                <NestedList key={area.id} data={area} />
              ))} */}
            </div>

            <div className="w-full lg:w-2/3 rounded-xl bg-white flex flex-col p-5 shadow-lg">
            <div className="flex flex-col mb-3">
            <h2 className="text-lg font-semibold mb-3 text-zinc-700">Severity History</h2>
            <div className="flex gap-3 flex-wrap">
              {symbols.map((symbol) => (
                <div key={symbol.image} className="flex gap-1">
                <Image src={`/severity/${symbol.image}.png`} width={40} height={40} alt='Symbol' className="w-5 object-cover"/>
                <h1 className="text-sm text-zinc-600">{symbol.label}</h1>
                </div>
              ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Comments</h1>
                <Button onClick={() => setActive(active === 'comments' ? '' : 'comments')} type="button" variant={'outline'} className={`font-normal justify-start ${active === 'comments' && 'bg-slate-100'}`}>View Comments</Button>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Previous Comments</h1>
                <Button onClick={() => setActive(active === 'pcomments' ? '' : 'pcomments')} type="button" variant={'outline'} className={`font-normal justify-start ${active === 'pcomments' && 'bg-slate-100'}`}>View Previous Comments</Button>
              </div>
              </div>
                {(active === 'comments' || active === 'pcomments') && (
                  <div className="w-full border p-3 rounded-lg flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                    <h1 className="font-semibold">{active === 'comments' ? 'Comments' : 'Previous Comments'}</h1>
                    <h1 className="text-sm text-zinc-500">2</h1>
                    </div>

                    <div className="flex flex-col gap-3 max-h-[250px] overflow-auto">
                    <div className="flex flex-col gap-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                        <h1 className="text-sm bg-main text-white rounded-full px-3 py-1 w-fit">admin</h1>
                        <Image src={`/severity/N.png`} width={40} height={40} alt='Symbol' className="w-5 object-cover"/>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-xs text-zinc-500">Jan 1, 2025</h1>
                          <EllipsisVertical className="text-zinc-500 cursor-pointer" size={20}/>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla iure totam recusandae cupiditate magni, dolore in dicta eos ea! Reprehenderit inventore enim at recusandae et dolorem libero sequi, id corporis.</p>
                    </div>
                    <div className="flex flex-col gap-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                        <h1 className="text-sm bg-main text-white rounded-full px-3 py-1 w-fit">admin</h1>
                        <Image src={`/severity/N.png`} width={40} height={40} alt='Symbol' className="w-5 object-cover"/>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-xs text-zinc-500">Jan 1, 2025</h1>
                          <EllipsisVertical className="text-zinc-500 cursor-pointer" size={20}/>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla iure totam recusandae cupiditate magni, dolore in dicta eos ea! Reprehenderit inventore enim at recusandae et dolorem libero sequi, id corporis.</p>
                    </div>
                    </div>

                    {active === 'comments' && (
                      <Dialog open={openComment} onOpenChange={setOpenComment}>
                        <Button onClick={() => setOpenComment(!openComment)} type="button" className="w-full font-normal text-sm justify-start cursor-text" variant={'outline'}>Write a comment...</Button>
                        <Comments/>
                      </Dialog>
                    )}
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-3 mt-3">
                <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Recommendations</h1>
                <Button onClick={() => setActive(active === 'recommendations' ? '' : 'recommendations')} type="button" variant={'outline'} className={`font-normal justify-start ${active === 'recommendations' && 'bg-slate-100'}`}>View Recommendations</Button>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-sm font-medium">Previous Recommendations</h1>
                <Button onClick={() => setActive(active === 'precommendations' ? '' : 'precommendations')} type="button" variant={'outline'} className={`font-normal justify-start ${active === 'precommendations' && 'bg-slate-100'}`}>View Previous Recommendations</Button>
              </div>
                </div>
                {(active === 'recommendations' || active === 'precommendations') && (
                  <div className="w-full border p-3 rounded-lg flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                    <h1 className="font-semibold">{active === 'recommendations' ? 'Recommendations' : 'Previous Recommendations'}</h1>
                    <h1 className="text-sm text-zinc-500">2</h1>
                    </div>
                    
                    <div className="flex flex-col gap-3 max-h-[250px] overflow-auto">
                    <div className="flex flex-col gap-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                        <h1 className="text-sm bg-main text-white rounded-full px-3 py-1 w-fit">admin</h1>
                        <h1 className="font-bold">P1</h1>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-xs text-zinc-500">Jan 1, 2025</h1>
                          <EllipsisVertical className="text-zinc-500 cursor-pointer" size={20}/>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla iure totam recusandae cupiditate magni, dolore in dicta eos ea! Reprehenderit inventore enim at recusandae et dolorem libero sequi, id corporis.</p>
                    </div>
                    <div className="flex flex-col gap-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                        <h1 className="text-sm bg-main text-white rounded-full px-3 py-1 w-fit">admin</h1>
                        <h1 className="font-bold">P2</h1>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-xs text-zinc-500">Jan 1, 2025</h1>
                          <EllipsisVertical className="text-zinc-500 cursor-pointer" size={20}/>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla iure totam recusandae cupiditate magni, dolore in dicta eos ea! Reprehenderit inventore enim at recusandae et dolorem libero sequi, id corporis.</p>
                    </div>
                    </div>

                    {active === 'recommendations' && (
                      <Dialog open={openRecommendation} onOpenChange={setOpenRecommendation}>
                        <Button onClick={() => setOpenRecommendation(!openRecommendation)} type="button" className="w-full font-normal text-sm justify-start cursor-text" variant={'outline'}>Write a recommendation...</Button>
                        <Recommendations/>
                      </Dialog>
                    )}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-sm font-medium">Client&apos;s Action and WO Number</h1>
                    <div className="border rounded-lg p-3">
                      <h1 className="font-semibold">Client Action</h1>
                      <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
                        <p className="text-sm text-zinc-600 indent-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi? Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi? Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi?</p>
                        <h1 className="w-full text-end text-xs text-zinc-500 mt-2">Jan 1, 2025</h1>
                      </div>
                      <h1 className="font-semibold mt-3">WO Number</h1>
                      <Input readOnly placeholder="Client WO Number" className="mt-2 text-sm"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-sm font-medium">Analyst Note</h1>
                    <div className="border rounded-lg p-3 flex flex-col h-full">
                      <h1 className="font-semibold">Analyst Name</h1>
                      <Input readOnly placeholder="Analyst Name" className="mt-2 text-sm"/>
                      <div className="border rounded-lg p-3 mt-2 max-h-[165px] overflow-auto">
                        <p className="text-sm text-zinc-600 indent-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores est laboriosam temporibus aliquam tempore itaque nihil atque, ducimus quibusdam placeat illum, maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi</p>
                        <h1 className="w-full text-end text-xs text-zinc-500 mt-2">Jan 1, 2025</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-sm font-medium">Equipment Drawing Photo</h1>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnalysisAndReportForm;
