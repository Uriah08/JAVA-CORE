import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";

import PdfDownload from "../report/PDF";
// import DOCXDownload from "../report/Word";

const ExportAdmin = ({ onClose }: { onClose: () => void }) => {

  return (
    <DialogContent>
      <DialogTitle>Export Report</DialogTitle>
      <div className="flex flex-col gap-3 justify-center my-10">
        <h1 className="text-center text-sm">
          Please select your preferred file format to download the report.
        </h1>
        <div className="flex gap-5 justify-center" onClick={onClose}>
          <PdfDownload/>
          {/* <DOCXDownload/> */}
        </div>
      </div>
    </DialogContent>
  );
};

export default ExportAdmin;
