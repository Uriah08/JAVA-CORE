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
import { useCreateCommentMutation } from "@/store/api";
import { toast } from "@/hooks/use-toast";
import { routeComponentCommentSchema } from "@/schema";
import { z } from "zod";

interface SelectedComponent {
  id: string;
}

interface AnalystNoteProps {
  selectedComponentId: SelectedComponent | null;
  onClose: () => void;
}

const AnalystNoteDialog: React.FC<AnalystNoteProps> = ({
  selectedComponentId,
  onClose,
}) => {
  const [note, setNote] = React.useState<string>("");
  const [analyst, setAnalyst] = React.useState<string>("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    if (!selectedComponentId) {
      toast({
        title: "Error",
        description: "No component selected.",
      });
      return;
    }

    const payload = {
      selectedComponentId,
      analyst,
      note,
    };

    console.log("Payload:", payload);

    try {
      routeComponentCommentSchema.parse(payload);

      await createComment(payload).unwrap();
      toast({ title: "Success", description: "Comment added successfully." });
      setNote("");
      setAnalyst("");
      onClose();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors.map((e) => e.message).join(", "),
        });
      } else {
        toast({
          title: "Error",
          description: err?.data?.message || "An unexpected error occurred.",
        });
      }
    }
  };
  return (
    <DialogContent>
      <DialogTitle>Add Note</DialogTitle>
      <Textarea
        placeholder="Enter your Note..."
        className="resize-none text-sm"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Select>
        <SelectTrigger className="mt-3">
          <SelectValue placeholder="Assign Analyst" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="analyst 1">Analyst 1</SelectItem>
          <SelectItem value="analyst 2">Analyst 2</SelectItem>
          <SelectItem value="analyst 3">Analyst 3</SelectItem>
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

export default AnalystNoteDialog;
