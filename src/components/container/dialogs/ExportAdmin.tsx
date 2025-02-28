import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";

const ExportAdmin = ({ onClose }: { onClose: () => void }) => {
  return (
    <DialogContent>
      <DialogTitle>Export Report</DialogTitle>
      <div className="flex flex-col gap-3 justify-center my-10">
        <h1 className="text-center text-sm">
          Please select your preferred file format to download the report.
        </h1>
        <div className="flex gap-5 justify-center">
          <Button onClick={onClose} className="bg-main hover:bg-follow">
            PDF
          </Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Word
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ExportAdmin;
