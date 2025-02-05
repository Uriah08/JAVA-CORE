"use client";

import React, { useState } from "react";
import { useGetMachineListQuery } from "@/store/api";
import Loading from "@/components/ui/loading";
import MachineList from "../../form/MachineList";

const List = () => {
  const { data, error, isLoading } = useGetMachineListQuery();
  const [currentArea, setCurrentArea] = useState<any>(null);
  const [currentEquipmentGroup, setCurrentEquipmentGroup] = useState<any>(null);
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error loading machine list</div>;
  if (!data) return <div>No data available</div>;

  const handleAreaClick = (area: any) => {
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
  };

  const handleEquipmentGroupClick = (equipmentGroup: any) => {
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);
  };

  const handleEquipmentNameClick = (equipmentName: any) => {
    setCurrentEquipmentName(equipmentName);
    setBreadcrumb([breadcrumb[0], breadcrumb[1], equipmentName.name]);
  };

  const handleBreadcrumbClick = (level: number) => {
    if (level === 0) {
      setCurrentArea(null);
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([]);
    } else if (level === 1) {
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0]]);
    } else if (level === 2) {
      setCurrentEquipmentName(null);
      setBreadcrumb([breadcrumb[0], breadcrumb[1]]);
    }
  };

  return (
    <div className="p-5">
      <div className="mb-4 text-sm font-semibold">
        {breadcrumb.length > 0 && (
          <nav className="flex space-x-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span
                  className="cursor-pointer text-gray-600 hover:underline"
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {item}
                </span>
                {index < breadcrumb.length - 1 && (
                  <span className="text-sm text-gray-600"> &gt; </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      <div className="space-y-2">
        {!currentArea && (
          <ul className="space-y-2">
            <h1 className="mt-9 mb-5 text-lg text-gray-800">Select an area</h1>
            {data?.areas?.map((area) => (
              <li
                key={area.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleAreaClick(area)}
              >
                {area.name}
              </li>
            ))}
          </ul>
        )}

        {currentArea && !currentEquipmentGroup && (
          <ul className="space-y-2">
            <h1 className="mb-5 text-lg text-gray-800">Select an group</h1>
            {currentArea.equipmentGroups.map((equipmentGroup: any) => (
              <li
                key={equipmentGroup.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleEquipmentGroupClick(equipmentGroup)}
              >
                {equipmentGroup.name}
              </li>
            ))}
          </ul>
        )}

        {currentEquipmentGroup && !currentEquipmentName && (
          <ul className="space-y-2">
            <h1 className="mb-5 text-lg text-gray-800">Select an name</h1>
            {currentEquipmentGroup.equipmentNames.map((equipmentName: any) => (
              <li
                key={equipmentName.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleEquipmentNameClick(equipmentName)}
              >
                {equipmentName.name}
              </li>
            ))}
          </ul>
        )}

        {currentEquipmentName && (
          <ul className="space-y-2">
            {currentEquipmentName.components.map(
              (component: any, index: any) => (
                <li key={index} className="p-2 bg-gray-100 rounded-lg">
                  {component.name}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;
