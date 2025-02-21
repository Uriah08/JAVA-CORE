"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Component {
  id: string;
  name: string;
}

interface Equipment {
  id: string;
  name: string;
  components: Component[];
}

interface RouteComponent {
  id: string;
  component: Component;
  action?: string;
  note?: string;
  comments?: { severity: string; comment: string; createdAt: Date }[];
  recommendations?: {
    priority: string;
    recommendation: string;
    createdAt: Date;
  }[];
}

interface SelectedRouteListProps {
  selectedEquipment: Equipment | null;
  selectedComponent: RouteComponent | null;
  routeComponents: RouteComponent[];
  routeComponentsLoading: boolean;
  setSelectedEquipment: (equipment: Equipment | null) => void;
  setSelectedComponent: (component: RouteComponent) => void;
  hideList: boolean;
}

const EquipmentList: React.FC<SelectedRouteListProps> = ({
  selectedEquipment,
  selectedComponent,
  routeComponents,
  routeComponentsLoading,
  setSelectedComponent,
  hideList,
}) => {
  return (
    <div
      className={`w-full lg:w-1/3 rounded-xl bg-white flex flex-col p-5 shadow-lg ${
        hideList && "hidden"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3 text-black">
        {selectedEquipment ? selectedEquipment.name : "Equipment List"}
      </h2>

      {/* Show Loading State */}
      {routeComponentsLoading ? (
        <Skeleton className="h-6 w-full my-2" />
      ) : selectedEquipment ? (
        <ul className="space-y-2">
          {selectedEquipment.components.map((comp) => {
            const componentData = routeComponents.find(
              (rc) => rc.component.id === comp.id
            );
            return (
              <li
                key={comp.id}
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedComponent?.id === comp.id ? "bg-gray-200" : ""
                }`}
                onClick={() =>
                  componentData && setSelectedComponent(componentData)
                }
              >
                {comp.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No equipment selected.</p>
      )}

     
    </div>
  );
};

export default EquipmentList;
