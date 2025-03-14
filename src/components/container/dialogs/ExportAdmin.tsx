import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  useGetRouteEquipmentReportQuery,
  useGetRouteComponentReportQuery,
} from "@/store/api";
import React, { useMemo } from "react";

import PdfDownload from "../report/PDF";
import DOCXDownload from "../report/Word";
import { selectedJob } from "@/schema";
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
    if (!routeComponent?.routeComponent)
      return { graphData: [], yAxisValues: [] };

    const severityMap: Record<string, { previous: number; current: number }> =
      {};

    const severityLevels = {
      Normal: { prevColor: "#90EE90", currColor: "#006400" },
      Moderate: { prevColor: "#FFFF99", currColor: "#FFD700" },
      Severe: { prevColor: "#F4A460", currColor: "#FF8C00" },
      Critical: { prevColor: "#DC143C", currColor: "#8B0000" },
      "Missed Points": { prevColor: "#A9A9A9", currColor: "#000000" },
    } as const;

    routeComponent.routeComponent.forEach((component) => {
      const sortedComments = [...component.comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const currentSeverity = sortedComments[0]?.severity;
      const previousSeverity = sortedComments[1]?.severity;

      if (currentSeverity) {
        if (!severityMap[currentSeverity]) {
          severityMap[currentSeverity] = { previous: 0, current: 0 };
        }
        severityMap[currentSeverity].current++;
      }

      if (previousSeverity) {
        if (!severityMap[previousSeverity]) {
          severityMap[previousSeverity] = { previous: 0, current: 0 };
        }
        severityMap[previousSeverity].previous++;
      }
    });

    const finalGraphData = Object.keys(severityLevels).map((key) => {
      const severity = key as keyof typeof severityLevels;

      return {
        label: severity,
        previous: severityMap[severity]?.previous || 0,
        current: severityMap[severity]?.current || 0,
        prevColor: severityLevels[severity].prevColor,
        currColor: severityLevels[severity].currColor,
      };
    });

    const totalCurrent = finalGraphData.reduce(
      (sum, item) => sum + item.current,
      0
    );

    const totalCountData = {
      label: "Total Count",
      current: totalCurrent,
      currColor: "#808080",
    };

    // Merge both datasets into one array
    const graphData = [...finalGraphData, totalCountData];

    // Generate yAxisValues dynamically
    const yAxisValues = [0];
    let nextValue = 5;

    while (nextValue <= totalCurrent) {
      yAxisValues.push(nextValue);
      nextValue += 5;
    }

    yAxisValues.push(nextValue);

    return { graphData, yAxisValues };
  }, [routeComponent]);

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
          <DOCXDownload data={data}/>
        </div>
      </div>
    </DialogContent>
  );
};

export default ExportAdmin;
