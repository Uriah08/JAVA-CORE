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
import { EllipsisVertical, Plus, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

const List = () => {

  const router = useRouter();

  const componentClick = (name: string) => {
    router.push(`/read-machine-list/${name}`)
  }

  const { data: session } = useSession();

  const {
    data: areaData,
    isLoading: areaLoading,
    error: areaError,
  } = useGetMachineListQuery();
  const [
    fetchEquipmentGroups,
    { data: equipmentGroupData, error: groupError, isFetching: equipmentGroupLoading },
  ] = useLazyGetEquipmentGroupsQuery();
  
  const [
    fetchEquipmentNames,
    { data: equipmentNameData, error: nameError, isFetching: equipmentNamesLoading },
  ] = useLazyGetEquipmentNamesQuery();
  
  const [
    fetchComponents,
    { data: componentData, error: componentError, isFetching: componentsLoading },
  ] = useLazyGetComponentsQuery();

  const loading = areaLoading || equipmentGroupLoading || equipmentNamesLoading || componentsLoading

  const [deleteMachine] = useSoftDeleteMachineListMutation();
  const [deleteEquipmentGroup] = useSoftDeleteEquipmentGroupsMutation();
  const [deleteEquipmentName] = useSoftDeleteEquipmentNamesMutation();
  const [deleteComponent] = useSoftDeleteComponentsMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentArea, setCurrentArea] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEquipmentGroup, setCurrentEquipmentGroup] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEquipmentName, setCurrentEquipmentName] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  if (areaError || groupError || nameError || componentError) {
    return <div className="text-red-600">Error loading data.</div>;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAreaClick = async (area: any) => {
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
    setBreadcrumb([area.name]);
    await fetchEquipmentGroups(area.id);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEquipmentGroupClick = async (equipmentGroup: any) => {
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
    setBreadcrumb([breadcrumb[0], equipmentGroup.name]);
    await fetchEquipmentNames(equipmentGroup.id);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        await deleteComponent(selectedItems).unwrap();
      } else if (currentEquipmentGroup) {
        await deleteEquipmentName(selectedItems).unwrap();
      } else if (currentArea) {
        await deleteEquipmentGroup(selectedItems).unwrap();
      } else {
        await deleteMachine(selectedItems).unwrap();
      }
  
      setSelectedItems([]);
      setIsDeleting(false);
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
      <ul className="">
        <div className="flex justify-between items-center my-9">
          <h1 className="text-lg items-center text-center text-gray-800 font-semibold">
            {level === 0
              ? "Select an area"
              : level === 1
              ? "Select a group"
              : level === 2
              ? "Select a name"
              : "Components"}
          </h1>
          <div className={`flex space-x-2 ${session?.user.role !== 'admin' && 'hidden'}`}>
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
              className="bg-main hover:bg-follow"
              disabled={loading}
            >
              Add <Plus />
            </Button>
            {isDeleting && selectedItems.length > 0 && (
              <Button
              disabled={loading}
                onClick={() => setIsConfirmDialogOpen(true)}
                className="bg-main hover:bg-follow"
              >
                Delete Selected
              </Button>
            )}
            <Button
              onClick={() => 
                {setIsDeleting((prev) => !prev)
                setSelectedItems([])}}
              className="text-main hover:text-main"
              variant={"outline"}
              disabled={loading}
            >
              {isDeleting ? (
                <>Cancel</>
              ) : (
                <>
                  Delete <Trash className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
        {loading ? 
            <div className="w-full h-full overflow-hidden">
              {[...Array(13)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[53px] border-t animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
            </div>
         : (
          <>{
            items.length === 0 ? (
              <div className="flex flex-col items-center my-20">
                <p className="text-gray-300 text-3xl font-bold">No items available.</p>
              </div>
            )
            : items.map((item,index) => (
              <li
                key={item.id}
                className={`p-2 border-t hover:bg-slate-100 cursor-pointer justify-between flex items-center ${
                  index === items.length - 1 ? "border-b" : ""
                } ${selectedItems.includes(item.id) ? "bg-slate-100" : ""}`}
              ><div
              className="flex gap-3 w-full"
              onClick={() => {
                if(breadcrumb.length === 3) {
                  componentClick(item.id)
                }
                if (isDeleting) {
                  handleSelectItem(item.id);
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  level === 0
                    ? handleAreaClick(item)
                    : level === 1
                    ? handleEquipmentGroupClick(item)
                    : level === 2
                    ? handleEquipmentNameClick(item)
                    : null;
                }
              }}>
                <div className="flex gap-2 items-center">
                  {isDeleting && (
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectItem(item.id);
                      }}
                      className={`${isDeleting ? 'mx-2' : ''} border-main data-[state=checked]:bg-main data-[state=checked]:text-white`}
                    />
                  )}
                  <span className={`${isDeleting ? 'px-2' : ''} py-1 rounded`}>{item.name}</span>
                </div>
                </div>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className={`text-zinc-500 z-20 ${session?.user.role !== 'admin' && 'hidden'}`}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </>
        )}
      </ul>
    );
  };

  return (
    <div className="mt-5">
      <div className="font-base flex">
      <React.Fragment>
                <span
                  className={`cursor-pointer text-gray-600 hover:underline mr-1 ${breadcrumb.length > 0 ? '' : 'font-semibold text-gray-800'}`}
                  onClick={() => handleBreadcrumbClick(0)}
                >
                  Machines
                </span>
                  <span className="text-sm text-gray-600 mx-2">{breadcrumb.length > 0 ? '>' : ''}</span>
              </React.Fragment>
        {breadcrumb.length > 0 && (
          <nav className="flex gap-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span
                  className={`cursor-pointer text-gray-600 hover:underline ${
                    index === breadcrumb.length - 1 ? 'font-semibold text-gray-800' : ''
                  }`}
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {item}
                </span>
                {index < breadcrumb.length - 1 && (
                  <span className="text-sm text-gray-600 mx-1"> &gt; </span>
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
