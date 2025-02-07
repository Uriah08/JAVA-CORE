import AnalysisAndReportForm from "@/components/container/form/AnalysisAndReport";
import React from "react";

const AnalysisReport = () => {
  return (
    <div className="w-full p-5 flex">
      <div className="w-full h-full py-5 bg-white rounded-xl">
        <div className="w-full h-16 rounded-t-xl -mt-5 flex items-center px-5 shadow-md">
          <h1 className="text-2xl font-bold text-main">
            Analysis and Reporting
          </h1>
        </div>
        <div className="flex-col flex mt-5 px-5">
          <AnalysisAndReportForm />
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
