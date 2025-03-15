import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  useGetRouteEquipmentReportQuery,
  useGetRouteComponentReportQuery,
} from "@/store/api";
import React, { useMemo } from "react";

import PdfDownload from "../report/PDF";
import DOCXDownload from "../report/Word";
import { selectedJob } from "@/schema";
import GraphData from "../report/functions/Graphdata";
import RecommendationTableData from "../report/functions/RecommendationTableData";
import AnalysisTableData from "../report/functions/AnalysisTableData";

const ExportAdmin = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: selectedJob;
}) => {
  const routeMachineId = data?.routeList?.machines?.[0]?.id;

  const { data: routeEquipment, isLoading } = useGetRouteEquipmentReportQuery(
    routeMachineId ?? "",
    {
      skip: !routeMachineId,
    }
  );

  console.log("euqipmentReport: ", routeEquipment);

  const routeEquipmentId =
    routeEquipment?.routeEquipment.map((eqId) => eqId.id) || [];
  const { data: routeComponent, isFetching: isComponentLoading } =
    useGetRouteComponentReportQuery(routeEquipmentId ?? [], {
      skip: !routeEquipmentId,
    });

  console.log("RouteComponent: ", routeComponent);

  console.log(
    "Recommendation: ",
    routeComponent?.routeComponent.map((reco) => reco.recommendations)
  );

  const { graphData, yAxisValues } = useMemo(() => {
    return GraphData(routeComponent);
  }, [routeComponent]);

  console.log("Graph: ", graphData, yAxisValues);

  const transformedRecommendationData = useMemo(() => {
    return RecommendationTableData(
      routeEquipment?.routeEquipment ?? [],
      routeComponent?.routeComponent ?? []
    );
  }, [routeEquipment, routeComponent]);

  console.log("Transformed Data", transformedRecommendationData);

  const transformedAnalysisData = useMemo(() => {
    return AnalysisTableData(
      routeEquipment?.routeEquipment ?? [],
      routeComponent?.routeComponent ?? []
    );
  }, [routeEquipment, routeComponent]);

  console.log("Transformed Analysis Data", transformedAnalysisData);

  const isDataLoading = isLoading || isComponentLoading;

  return (
    <DialogContent className="min-h-[300px] md:min-h-[350px] flex flex-col justify-between py-6">
      <DialogTitle>Export Report</DialogTitle>

      <div className="flex flex-col flex-grow justify-center items-center text-center px-4">
        <h1 className="text-sm">
          Please select your preferred file format to download the report.
        </h1>
        {isDataLoading && (
          <p className="text-main mt-4">Preparing your file...</p>
        )}
      </div>

      <div className="flex gap-5 justify-center pb-4" onClick={onClose}>
        <PdfDownload
          data={data}
          graphData={graphData}
          yAxisValues={yAxisValues}
          transformedRecommendationData={transformedRecommendationData}
          transformedAnalysisData={transformedAnalysisData}
          loading={isDataLoading}
        />
        <DOCXDownload
          data={data}
          graphData={graphData}
          yAxisValues={yAxisValues}
          transformedRecommendationData={transformedRecommendationData}
          transformedAnalysisData={transformedAnalysisData}
          loading={isDataLoading}
        />
      </div>
    </DialogContent>
  );
};

export default ExportAdmin;
