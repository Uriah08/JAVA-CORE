"use client";

import {
  ExtendedReportEquipmentName,
  ExtendedReportComponentResponse,
} from "@/store/api";
import { TransformedRecommendation } from "@/schema";

const RecommendationTableData = (
  routeEquipment: ExtendedReportEquipmentName[],
  routeComponent: ExtendedReportComponentResponse[]
): TransformedRecommendation[] => {
  if (!routeEquipment || !routeComponent) return [];

  return routeComponent
    .map((component) => {
      if (
        !Array.isArray(component.recommendations) ||
        component.recommendations.length === 0
      ) {
        return null;
      }

      const equipment = routeEquipment.find(
        (eq) => eq.id === component.routeEquipmentId
      );

      if (!equipment) return null;

      const firstRecommendation = component.recommendations[0];

      return {
        equipmentGroup: equipment.equipmentName.group.name,
        equipmentAndComponent: `${equipment.equipmentName.name} - ${component.component.name}`,
        priority: firstRecommendation.priority,
        action: firstRecommendation.recommendation,
        date: new Date(firstRecommendation.createdAt).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };
    })
    .filter(Boolean) as TransformedRecommendation[];
};

export default RecommendationTableData;
