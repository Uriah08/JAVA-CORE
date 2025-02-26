import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreateOilAnalysisMutation } from "@/store/api";
import { toast } from "@/hooks/use-toast";
import { routeComponentOilAnalysisSchema } from "@/schema";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CircleAlert } from "lucide-react";

interface OilAnalysisProps {
    defaultOilAnalysis: string;
  routeComponentId: string | undefined;
  onClose: () => void;
}

const OilAnalysis: React.FC<OilAnalysisProps> = ({
    defaultOilAnalysis,
  routeComponentId,
  onClose,
}) => {
  const [createOilAnalysis, { isLoading }] = useCreateOilAnalysisMutation();
  const [analysis, setAnalysis] = React.useState(defaultOilAnalysis);

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast({ title: "Error", description: "No component selected." });
      return;
    }

    if (analysis === "") {
      toast({ title: "Error", description: "No oil state selected." });
      return;
    }

    const payload = { routeComponentId, analysis };
    console.log("Data being passed:", payload);

    try {
      routeComponentOilAnalysisSchema.parse(payload);
      await createOilAnalysis(payload).unwrap();
      toast({
        title: "Success",
        description: "Oil analysis added successfully.",
      });
      setAnalysis("Normal");
      onClose();
    } catch (error) {
      const description =
        error instanceof z.ZodError
          ? error.errors.map((e) => e.message).join(", ")
          : "An unexpected error occurred.";
      toast({ title: "Error", description });
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Oil Analysis</DialogTitle>
      <Select onValueChange={setAnalysis} defaultValue={defaultOilAnalysis}>
        <SelectTrigger>
          <SelectValue>
            {analysis || defaultOilAnalysis}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Normal">Normal</SelectItem>
          <SelectItem value="Contaminated">Contaminated</SelectItem>
          <SelectItem value="Critical">Critical</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-3 border p-3 rounded-lg">
        <div className="flex gap-3 items-center justify-center">
          <CircleAlert className="text-zinc-500" size={20} />
          <h1 className="text-sm font-semibold text-center">
            Oil State Color Description
          </h1>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold">Normal - </span>
            <span className="w-7 h-4 bg-green-700 rounded"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Contaminated - </span>
            <span className="w-7 h-4 bg-orange-500 rounded"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Critical - </span>
            <span className="w-7 h-4 bg-red-700 rounded"></span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full justify-end mt-4">
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

export default OilAnalysis;
