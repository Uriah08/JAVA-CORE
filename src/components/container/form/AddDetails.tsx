import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { componentDetailsSchema } from '@/schema'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const AddDetails = () => {

    const form = useForm<z.infer<typeof componentDetailsSchema>>({
        resolver: zodResolver(componentDetailsSchema),
        defaultValues: {
          equipmentName: "",
          manufacturer: "",
          dimensions: "",
          weight: "",
          material: "",
          loadCapacity: "",
          operatingPressure: "",
          temperatureRange: "",
          powerRequirements: "",
        },
      });

      function onSubmit(values: z.infer<typeof componentDetailsSchema>) {
        console.log(values)
      }

  return (
    <Form {...form}>
        <form>
            Add Component Details
        </form>
    </Form>
  )
}

export default AddDetails