import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  useGetRouteEquipmentClientReportQuery,
  useGetRouteComponentClientReportQuery,
} from "@/store/api";
import React, { useMemo } from "react";

import PdfDownload from "../../report/PDF";
import { selectedJob } from "@/schema";
import GraphData from "../../report/functions/Graphdata";
import RecommendationTableData from "../../report/functions/RecommendationTableData";
import AnalysisTableData from "../../report/functions/AnalysisTableData";

const ExportClient = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: selectedJob;
}) => {
  const routeMachineId = data?.routeList?.machines?.[0]?.id;

  const { data: routeEquipment, isLoading } =
    useGetRouteEquipmentClientReportQuery(routeMachineId ?? "", {
      skip: !routeMachineId,
    });

  console.log("euqipmentReport: ", routeEquipment);

  const routeEquipmentId =
    routeEquipment?.routeEquipment.map((eqId) => eqId.id) || [];
  const { data: routeComponent, isFetching: isComponentLoading } =
    useGetRouteComponentClientReportQuery(routeEquipmentId ?? [], {
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

  console.log(isLoading, isComponentLoading);

  return (
    <DialogContent>
      <DialogTitle>Export Report</DialogTitle>
      <div className="flex flex-col gap-3 justify-center my-10">
        <h1 className="text-center text-sm">
          Please select your preferred file format to download the report.
        </h1>
        <div className="flex gap-5 justify-center" onClick={onClose}>
          <PdfDownload
            data={data}
            graphData={graphData}
            yAxisValues={yAxisValues}
            transformedRecommendationData={transformedRecommendationData}
            transformedAnalysisData={transformedAnalysisData}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default ExportClient;
