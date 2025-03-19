"use client";

import {
  ExtendedReportEquipmentName,
  ExtendedReportComponentResponse,
} from "@/store/api";
import { TransformedAnalysis } from "@/schema";

const severityMap: Record<string, string> = {
  Normal: "N",
  Moderate: "M",
  Severe: "S",
  Critical: "C",
  "Missed Points": "X",
};

const AnalysisTableData = (
  routeEquipment: ExtendedReportEquipmentName[],
  routeComponent: ExtendedReportComponentResponse[]
): TransformedAnalysis[] => {
  if (!routeEquipment || !routeComponent) return [];

  return routeComponent
    .map((component) => {
      const { comments, component: comp, recommendations } = component;
      const equipment = routeEquipment.find(
        (eq) => eq.id === component.routeEquipmentId
      );

      if (!equipment) return null;
      const sortedComments =
        comments.length > 1
          ? comments
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
          : comments;

      let previousCondition = "No Data";
      let currentCondition = "No Data";
      let analysis = "No Data";

      if (sortedComments.length > 0) {
        currentCondition = severityMap[sortedComments[0].severity] || "No Data";
        analysis = sortedComments[0].comment;

        if (sortedComments.length > 1) {
          previousCondition =
            severityMap[sortedComments[1].severity] || "No Data";
        }
      }

      return {
        equipmentGroup: equipment.equipmentName.group.name,
        equipmentAndComponent: `${equipment.equipmentName.name} - ${comp.name}`,
        previousCondition,
        currentCondition,
        analysis,
        recommendations:
          Array.isArray(recommendations) && recommendations.length
            ? recommendations
            : undefined,
      };
    })
    .filter(Boolean) as TransformedAnalysis[];
};

export default AnalysisTableData;
