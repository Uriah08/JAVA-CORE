"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Temperature from "../dialogs/Temperatures";
import { useGetRouteComponentTemperatureQuery } from "@/store/api";

interface SelectedComponent {
  id: string;
  routeComponentID: string;
}

interface TemperatureSectionProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
}

const TemperatureSection: React.FC<TemperatureSectionProps> = ({
  routeComponentsLoading,
  selectedComponent,
}) => {
  const [openTemperature, setOpenTemperature] = React.useState(false);

  const routeComponentID = selectedComponent?.routeComponentID as string;

  const {
    data: routeComponentTemperature,
    isLoading: loadingRouteComponentTemperature,
    error: routeComponentTemperatureError,
  } = useGetRouteComponentTemperatureQuery(routeComponentID, {
    skip: !routeComponentID,
  });

  if (routeComponentTemperatureError) {
    return <div className="text-main">Error loading data.</div>;
  }

  const temperatures = selectedComponent
    ? routeComponentTemperature?.data || []
    : [];

  const formatTemperature = (temp: number, unit: "C" | "F" = "C") => {
    return unit === "C" ? `${temp}°C` : `${(temp * 9) / 5 + 32}°F`;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-medium">Temperature Record</h1>
        <Dialog open={openTemperature} onOpenChange={setOpenTemperature}>
          <Button
            onClick={() => setOpenTemperature(!openTemperature)}
            type="button"
            className="w-auto font-normal text-sm cursor-text"
            variant={"outline"}
          >
            Add new Temp
          </Button>
          {openTemperature && (
            <Temperature
              routeComponentId={selectedComponent?.routeComponentID}
              onClose={() => setOpenTemperature(false)}
            />
          )}
        </Dialog>
      </div>
      <div className="border rounded-lg flex overflow-auto">
        {Array.from({ length: 5 }).map((_, index) => {
          const temp = temperatures[index] || null;

          return (
            <div key={index} className="flex flex-col border-r w-full">
              <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
                {index === 0 ? "Current" : "Previous"}
              </h1>
              <div className="flex justify-center items-center py-1">
                {routeComponentsLoading || loadingRouteComponentTemperature ? (
                  <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
                ) : temp ? (
                  <div className="flex justify-center items-center w-full">
                    <p className="text-center">
                      {formatTemperature(temp.temperature, "C")}
                    </p>
                  </div>
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemperatureSection;
