import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateTemperatureMutation } from "@/store/api";
import { toast } from "@/hooks/use-toast";
import { routeComponentTemperatureSchema } from "@/schema";
import { z } from "zod";

interface TemperatureDialogProps {
  routeComponentId: string | undefined;
  onClose: () => void;
}

const Temperature: React.FC<TemperatureDialogProps> = ({
  routeComponentId,
  onClose,
}) => {
  const [temperature, setTemperature] = React.useState<string>("");
  const [createTemperature, { isLoading }] = useCreateTemperatureMutation();

  const handleSubmit = async () => {
    if (!routeComponentId) {
      toast({ title: "Error", description: "No component selected." });
      return;
    }

    const tempValue = parseFloat(temperature);

    const payload = {
      routeComponentId,
      temperature: Number(tempValue),
    };

    console.log("data being passed: ", payload);

    try {
      routeComponentTemperatureSchema.parse(payload);

      await createTemperature(payload).unwrap();
      toast({
        title: "Success",
        description: "Temperature added successfully.",
      });
      setTemperature("");
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
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Add Temperature</DialogTitle>
      <Input
        type="number"
        placeholder="Enter temperature..."
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
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

export default Temperature;
