import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from 'zod'

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
import { Plus, Trash } from 'lucide-react'

const formSchema = z.object({
  details: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
})

type FormData = z.infer<typeof formSchema>


const AddDetails = () => {

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: [{ key: "", value: "" }],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
  })

  const onSubmit = (data: FormData) => {
    form.reset()
    console.log("Submitted Data:", data.details)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Add Details</h2>

        <div className='overflow-auto max-h-[500px] space-y-4 p-[1px]'>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name={`details.${index}.key`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Header</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter header" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`details.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter its value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="mt-6 bg-main hover:bg-follow"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
        </div>
        <Button
          type="button"
          variant={'outline'}
          onClick={() => append({ key: "", value: "" })}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Variable
        </Button>
        <Button type="submit" className="w-full bg-main hover:bg-follow">Submit</Button>
      </form>
    </Form>
  )
}

export default AddDetails