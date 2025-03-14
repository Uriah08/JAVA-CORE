import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetPdfReportQuery } from "@/store/api";
import React from "react";

import PdfDownload from "../report/PDF";
import DOCXDownload from "../report/Word";
import { selectedJob } from "@/schema";

const ExportAdmin = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: selectedJob;
}) => {
  const inspectionRoute = data?.inspectionRoute ?? null;

  const { data: reportResponse, isFetching: isLoading } = useGetPdfReportQuery(
    inspectionRoute ?? "",
    {
      skip: !inspectionRoute,
    }
  );

  // console.log("Report Sample PDF",reportResponse);

  const report = reportResponse?.routeMachineList || [];

  console.log("Report Sample PDF", report);

  return (
    <DialogContent>
      <DialogTitle>Export Report</DialogTitle>
      <div className="flex flex-col gap-3 justify-center my-10">
        <h1 className="text-center text-sm">
          Please select your preferred file format to download the report.
        </h1>
        <div className="flex gap-5 justify-center" onClick={onClose}>
          <PdfDownload data={data} reportLoading={isLoading} report={report} />
          <DOCXDownload data={data} reportLoading={isLoading} report={report}/>
        </div>
      </div>
    </DialogContent>
  );
};

export default ExportAdmin;
