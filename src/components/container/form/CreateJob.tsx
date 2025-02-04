"use client"

import React from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'

import { jobSchema } from '@/schema'
import { useGetClientsQuery } from '@/store/api'
import Loading from '@/components/ui/loading'

import { useCreateJobMutation } from '@/store/api'
import { useToast } from '@/hooks/use-toast'

const CreateJobForm = () => {
  const { toast } = useToast()

  const [createJob, { isLoading: createJobLoading }] = useCreateJobMutation()

  const { data, isLoading: clientLoading} = useGetClientsQuery();
  const clients = data?.clients || []

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
          client: "",
          area: "",
          dateSurveyed: new Date(),
          jobNo: "",
          poNo: "",
          woNo: "",
          reportNo: "",
          jobDescription: "",
          method: "",
          inspector: "",
          inspectionRoute: "",
          equipmentUse: "",
          dateRegistered: new Date(),
          yearWeekNo: ""
        },
      })

      console.log(form.getValues("dateSurveyed"));
      
    
    async function onSubmit(values: z.infer<typeof jobSchema>) {
     try {

      const formattedValues = {
        ...values,
        dateSurveyed: new Date(values.dateSurveyed),
        dateRegistered: new Date(values.dateRegistered),
      };

      const response = await createJob(formattedValues).unwrap()
      
      if(!response.success) {
        throw new Error(response.message)
      }
      toast({
        title: "Success",
        description: response.message,
      });
      form.reset()
     } catch (error) {
      const err = error as { data?: { message?: string } };
      toast({
        title: "Error",
        description: err.data?.message || "An unexpected error occurred.",
      });
     }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 mt-10 flex flex-col">
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
                <FormItem className='"w-full md:w-1/2'>
                    <FormLabel>Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={clientLoading ? 'Loading...' : 'Select a client'} />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <div className='flex flex-col max-h-[200px] overflow-auto'>
                          {clientLoading ? <div><Loading/></div> : clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
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
                <FormItem className='"w-full md:w-1/2'>
                    <FormLabel>Area</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a area" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                            <SelectItem value="area1">Area 1</SelectItem>
                            <SelectItem value="area2">Area 2</SelectItem>
                            <SelectItem value="area3">Area 3</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
        </div>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
          control={form.control}
          name="dateSurveyed"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Date Surveyed</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-1/2 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <FormMessage />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
          />
          <div className='md:flex hidden'></div>
        </div>
        <h1 className='my-5 text-sm text-zinc-700'>Enter the following information</h1>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
          control={form.control}
          name="jobNo"
          render={({ field }) => (
            <FormItem className='w-full md:w-1/2'>
              <FormLabel>Job Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your job number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poNo"
          render={({ field }) => (
            <FormItem className='w-full md:w-1/2'>
              <FormLabel>PO Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your PO number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
          control={form.control}
          name="woNo"
          render={({ field }) => (
            <FormItem className='w-full md:w-1/2'>
              <FormLabel>WO Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your WO number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportNo"
          render={({ field }) => (
            <FormItem className='w-full md:w-1/2'>
              <FormLabel>Report Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your report number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your job description" {...field} className='resize-none'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <h1 className='text-sm text-zinc-700 my-5'>Important Information</h1>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
                <FormItem className='"w-full md:w-1/2'>
                    <FormLabel>Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                            <SelectItem value="client1">Method 1</SelectItem>
                            <SelectItem value="client2">Method 2</SelectItem>
                            <SelectItem value="client3">Method 3</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="inspector"
            render={({ field }) => (
                <FormItem className='"w-full md:w-1/2'>
                    <FormLabel>Inspector</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an inspector" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                            <SelectItem value="client1">Inspector 1</SelectItem>
                            <SelectItem value="client2">Inspector 2</SelectItem>
                            <SelectItem value="client3">Inspector 3</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
        </div>
        <div className='flex md:flex-row flex-col gap-3 w-full '>
        <FormField
          control={form.control}
          name="inspectionRoute"
          render={({ field }) => (
            <FormItem className='w-full md:w-1/2'>
              <FormLabel>Inspection Route</FormLabel>
              <FormControl>
                <Input placeholder="Enter inspection route..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="equipmentUse"
            render={({ field }) => (
                <FormItem className='"w-full md:w-1/2'>
                    <FormLabel>Equipment Use</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an equipment" />
                            </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                            <SelectItem value="client1">Equipment 1</SelectItem>
                            <SelectItem value="client2">Equipment 2</SelectItem>
                            <SelectItem value="client3">Equipment 3</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
        </div>
        <div className='flex md:flex-row flex-col gap-3 w-full'>
        <FormField
          control={form.control}
          name="dateRegistered"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className='mt-[10px]'>Date Registered</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                  
                </PopoverTrigger>
                <FormMessage />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="yearWeekNo"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Year and Week Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter year/week number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button disabled={createJobLoading} className='w-fit bg-main mt-5 hover:bg-follow'>{createJobLoading ? 'Creating...' : 'Submit'}</Button>
        </form>
    </Form>
  )
}

export default CreateJobForm