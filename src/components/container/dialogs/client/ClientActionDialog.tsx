"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRouteComponentActionMutation } from "@/store/api";
import { toast } from "@/hooks/use-toast";
import { RouteComponentActionSchema } from "@/schema";
import { z } from "zod";

interface SelectedComponent {
  id: string;
}

interface ClientActionProps {
  selectedComponentId: SelectedComponent | null;
  jobs: string[];
  onClose: () => void;
}

const ClientActionDialog: React.FC<ClientActionProps> = ({
  selectedComponentId,
  jobs,
  onClose,
}) => {
  const [action, setAction] = React.useState<string>("");
  const [woNumber, setWoNumber] = React.useState<string>("");
  const [createAction, { isLoading }] = useCreateRouteComponentActionMutation();

  const handleSubmit = async () => {
    if (!selectedComponentId) {
      toast({
        title: "Error",
        description: "No component selected.",
      });
      return;
    }

    const payload = {
      componentId: selectedComponentId.id,
      woNumber,
      action,
    };

    console.log("Payload:", payload);

    try {
      RouteComponentActionSchema.parse(payload);

      await createAction(payload).unwrap();
      toast({ title: "Success", description: "Action added successfully." });
      setAction("");
      setWoNumber("");
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors.map((e) => e.message).join(", "),
        });
      } else {
        toast({
          title: "Error",
          description:
            (error as { data?: { message?: string } })?.data?.message ||
            "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Action</DialogTitle>
      <Textarea
        placeholder="Enter your action..."
        className="resize-none text-sm"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      />
      <Select onValueChange={(value) => setWoNumber(value)}>
        <SelectTrigger className="mt-3">
          <SelectValue placeholder="Select WO Number" />
        </SelectTrigger>
        <SelectContent>
          {jobs.map((job, index) => (
            <SelectItem key={index} value={job}>
              {job}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-3 w-full justify-end">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          className="bg-main text-white hover:bg-follow"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default ClientActionDialog;
