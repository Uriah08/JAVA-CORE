"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
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
import { Plus, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCreateClientComponentDetailsMutation } from "@/store/api";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  details: z.array(
    z.object({
      header: z.string().min(1, "Header is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

interface SelectedComponent {
  id: string;
}

interface AddDetailsDialogProps {
  selectedComponentId: SelectedComponent | null;
  onClose: () => void; // Close the dialog on success
}

const AddDetailsDialog: React.FC<AddDetailsDialogProps> = ({
  selectedComponentId,
  onClose,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: [{ header: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
  });

  const [createDetails, { isLoading }] =
    useCreateClientComponentDetailsMutation();

  const onSubmit = async (data: FormData) => {
    if (!selectedComponentId) {
          toast({
            title: "Error",
            description: "No component selected.",
          });
          return;
        }

    try {
      const responses = await Promise.all(
        data.details.map(async (detail) => {
          return createDetails({
            componentId: selectedComponentId.id,
            header: detail.header,
            value: detail.value,
          }).unwrap();
        })
      );

      toast({
        title: "Success",
        description: `${responses.length} details added successfully`,
      });

      form.reset();
      onClose(); // Close dialog after success
    } catch (error) {
      console.error("Error submitting details:", error);
      toast({
        title: "Error",
        description: "Failed to add details. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Component Details</DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="overflow-auto max-h-[500px] space-y-4 p-[1px]">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FormField
                  control={form.control}
                  name={`details.${index}.header`}
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
                        <Input placeholder="Enter value" {...field} />
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
            variant="outline"
            onClick={() => append({ header: "", value: "" })}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Variable
          </Button>
          <Button
            type="submit"
            className="w-full bg-main hover:bg-follow"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddDetailsDialog;
