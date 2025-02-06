"use client";

import React, { useState, useEffect } from "react";
import {
  useLazyGetMachineListQuery,
  useLazyGetEquipmentGroupsQuery,
  useLazyGetEquipmentNamesQuery,
  useLazyGetComponentsQuery,
} from "@/store/api";
import MachineList from "../../form/MachineList";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

const List = () => {
  const [
    fetchAreas,
    { data: areaData, isLoading: loadingAreas, error: areaError },
  ] = useLazyGetMachineListQuery();
  const [
    fetchEquipmentGroups,
    { data: equipmentGroupData, isLoading: loadingGroups, error: groupError },
  ] = useLazyGetEquipmentGroupsQuery();
  const [
    fetchEquipmentNames,
    { data: equipmentNameData, isLoading: loadingNames, error: nameError },
  ] = useLazyGetEquipmentNamesQuery();
  const [
    fetchComponents,
    {
      data: componentData,
      isLoading: loadingComponents,
      error: componentError,
    },
  ] = useLazyGetComponentsQuery();

  const [currentArea, setCurrentArea] = useState<any>(null);
  const [currentEquipmentGroup, setCurrentEquipmentGroup] = useState<any>(null);
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  if (loadingAreas || loadingGroups || loadingNames || loadingComponents) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (areaError || groupError || nameError || componentError) {
    return <div className="text-red-600">Error loading data.</div>;
  }

  const handleAreaClick = async (area: any) => {
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
    await fetchEquipmentGroups(area.id);
  };

  const handleEquipmentGroupClick = async (equipmentGroup: any) => {
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);
    await fetchEquipmentNames(equipmentGroup.id);
  };

  const handleEquipmentNameClick = async (equipmentName: any) => {
    setCurrentEquipmentName(equipmentName);
    setBreadcrumb([breadcrumb[0], breadcrumb[1], equipmentName.name]);
    await fetchComponents(equipmentName.id);
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

  const handleOpenDialog = (title: string) => {
    setDialogTitle(title);
    setIsDialogOpen(true);
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
            <div className="flex justify-between items-center mt-9">
              <h1 className="text-lg items-center text-center text-gray-800">
                Select an area
              </h1>
              <Button
                onClick={() => handleOpenDialog("Add New Area")}
                className="bg-main"
              >
                +
              </Button>
            </div>
            {areaData?.areas?.map((area) => (
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
            <div className="flex justify-between items-center">
              <h1 className="text-lg items-center text-center text-gray-800">
                Select a group
              </h1>
              <Button
                onClick={() => handleOpenDialog("Add New Group")}
                className="bg-main"
              >
                +
              </Button>
            </div>
            {equipmentGroupData?.equipmentGroups?.map((equipmentGroup: any) => (
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
            <div className="flex justify-between items-center">
              <h1 className="text-lg items-center text-center text-gray-800">
                Select a name
              </h1>
              <Button
                onClick={() => handleOpenDialog("Add New Name")}
                className="bg-main"
              >
                +
              </Button>
            </div>
            {equipmentNameData?.equipmentNames?.map((equipmentName: any) => (
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
            <div className="flex justify-between items-center">
              <h1 className="text-lg items-center text-center text-gray-800">
                Components
              </h1>
              <Button
                onClick={() => handleOpenDialog("Add New Component")}
                className="bg-main"
              >
                +
              </Button>
            </div>
            {componentData?.components?.map((component: any, index: any) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg">
                {component.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MachineList
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(name) => console.log("New Item:", name)}
        title={dialogTitle}
      />
    </div>
  );
};

export default List;
