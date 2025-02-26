import React, { useState } from "react";
import Image from "next/image";
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
import { symbols, routeComponentCommentSchema } from "@/schema";
import { z } from "zod";

interface CommentsProps {
  routeComponentId: string | undefined;
  onClose: () => void;
}

const Comments: React.FC<CommentsProps> = ({
  routeComponentId,
  onClose,
}) => {
  const [comment, setComment] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast({
        title: "Error",
        description: "No component selected.",
      });
      return;
    }

    const payload = {
      routeComponentId,
      severity,
      comment,
    };

    console.log("Payload:", payload);

    try {
      routeComponentCommentSchema.parse(payload);

      await createComment(payload).unwrap();
      toast({ title: "Success", description: "Comment added successfully." });
      setComment("");
      setSeverity("");
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
      <DialogTitle>Add Comment</DialogTitle>
      <Textarea
        placeholder="Enter your comment..."
        className="resize-none text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Select onValueChange={setSeverity}>
        <SelectTrigger>
          <SelectValue placeholder="Select severity" />
        </SelectTrigger>
        <SelectContent>
          {symbols.map(({ image, label }) => (
            <SelectItem key={image} value={label}>
              <div className="flex gap-3 items-center">
                <Image
                  src={`/severity/${image}.png`}
                  width={20}
                  height={20}
                  alt={label}
                  className="w-5 object-cover"
                />
                {label}
              </div>
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

export default Comments;
