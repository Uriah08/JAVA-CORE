"use client";

import React, { useState } from "react";
import {
  useGetMachineListQuery,
  useLazyGetEquipmentGroupsQuery,
  useLazyGetEquipmentNamesQuery,
  useLazyGetComponentsQuery,
  useSoftDeleteMachineListMutation,
  useSoftDeleteEquipmentGroupsMutation,
  useSoftDeleteEquipmentNamesMutation,
  useSoftDeleteComponentsMutation,
} from "@/store/api";
import MachineList from "../../form/MachineList";
import ConfirmationDialog from "@/components/container/dialog/deletingList/ConfirmationDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Trash, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const List = () => {
  const {
    data: areaData,
    isLoading: loadingAreas,
    error: areaError,
  } = useGetMachineListQuery();
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

  const [deleteMachine] = useSoftDeleteMachineListMutation();
  const [deleteEquipmentGroup] = useSoftDeleteEquipmentGroupsMutation();
  const [deleteEquipmentName] = useSoftDeleteEquipmentNamesMutation();
  const [deleteComponent] = useSoftDeleteComponentsMutation();

  const [currentArea, setCurrentArea] = useState<any>(null);
  const [currentEquipmentGroup, setCurrentEquipmentGroup] = useState<any>(null);
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const loading =
    loadingAreas || loadingGroups || loadingNames || loadingComponents;

  if (loading) {
    return (
      <div className="p-5 flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="h-[500px] w-full rounded-lg mb-4" />
        <p className="text-gray-500">Loading data, please wait...</p>
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

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    try {
      if (currentEquipmentName) {
        await Promise.all(selectedItems.map((id) => deleteComponent(id)));
      } else if (currentEquipmentGroup) {
        await Promise.all(selectedItems.map((id) => deleteEquipmentName(id)));
      } else if (currentArea) {
        await Promise.all(selectedItems.map((id) => deleteEquipmentGroup(id)));
      } else {
        await Promise.all(selectedItems.map((id) => deleteMachine(id)));
      }

      setSelectedItems([]); // Clear selection
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  const handleOpenDialog = (title: string) => {
    setDialogTitle(title);
    setIsDialogOpen(true);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderList = (items: { id: string; name: string }[], level: number) => {
    return (
      <ul className="space-y-2">
        <div className="flex justify-between items-center my-9">
          <h1 className="text-lg items-center text-center text-gray-800">
            {level === 0
              ? "Select an area"
              : level === 1
              ? "Select a group"
              : level === 2
              ? "Select a name"
              : "Components"}
          </h1>
          <div className="flex space-x-2">
            <Button
              onClick={() =>
                handleOpenDialog(
                  `Add New ${
                    level === 0
                      ? "Area"
                      : level === 1
                      ? "Group"
                      : level === 2
                      ? "Name"
                      : "Component"
                  }`
                )
              }
              className="bg-main"
            >
              Add <Plus />
            </Button>
            <Button
              onClick={() => setIsDeleting((prev) => !prev)}
              className="bg-red-600"
            >
              {isDeleting ? (
                <>
                  Cancel <X className="ml-2" />
                </>
              ) : (
                <>
                  Delete <Trash className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">No items available.</p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <li
                key={item.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-between"
                onClick={() =>
                  !isDeleting &&
                  (level === 0
                    ? handleAreaClick(item)
                    : level === 1
                    ? handleEquipmentGroupClick(item)
                    : level === 2
                    ? handleEquipmentNameClick(item)
                    : null)
                }
              >
                <span>{item.name}</span>
                {isDeleting && (
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                )}
              </li>
            ))}
          </>
        )}
        {isDeleting && selectedItems.length > 0 && (
          <Button
            onClick={() => setIsConfirmDialogOpen(true)}
            className="mt-4 bg-red-600"
          >
            Delete Selected
          </Button>
        )}
      </ul>
    );
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
        {!currentArea && renderList(areaData?.areas || [], 0)}
        {currentArea &&
          !currentEquipmentGroup &&
          renderList(equipmentGroupData?.equipmentGroups || [], 1)}
        {currentEquipmentGroup &&
          !currentEquipmentName &&
          renderList(equipmentNameData?.equipmentNames || [], 2)}
        {currentEquipmentName && renderList(componentData?.components || [], 3)}
      </div>
      <MachineList
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
        areaId={currentArea?.id}
        groupId={currentEquipmentGroup?.id}
        equipmentNameId={currentEquipmentName?.id}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleDeleteSelected}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedItems.length} item(s)?`}
      />
    </div>
  );
};

export default List;
