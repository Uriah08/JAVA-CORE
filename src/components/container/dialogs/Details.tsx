"use client";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Plus, Edit, Trash } from "lucide-react";
// import React, { useState } from "react";
import { useGetRouteComponentDetailsQuery } from "@/store/api";

interface SelectedJob {
  user?: {
    id?: string;
    name?: string;
  };
}

interface SelectedComponent {
  component?: {
    id: string;
    name: string;
  };
}

interface DetailsDialogProps {
  selectedComponent: SelectedComponent | null;
  selectedJob: SelectedJob | null;
}

const Details: React.FC<DetailsDialogProps> = ({
  selectedComponent,
  selectedJob,
}) => {
  // const [activeDetail, setActiveDetail] = useState<string | null>(null);
  // const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const componentID = selectedComponent?.component?.id as string;
  const clientId = selectedJob?.user?.id as string;

  const {
    data: routeComponentDetails,
    isLoading: loadingRouteComponentDetails,
    error: routeComponentDetailsError,
  } = useGetRouteComponentDetailsQuery(
    { componentId: componentID, clientId },
    {
      skip: !componentID || !clientId, // Skip query if either is missing
    }
  );

  if (routeComponentDetailsError) {
    return <div className="text-main">Error loading data.</div>;
  }

  const tableData = routeComponentDetails?.data || [];

  // const handleDeleteClick = () => {
  //   if (activeDetail === "delete") {
  //     setActiveDetail(null);
  //     setCheckedItems({});
  //   } else {
  //     setActiveDetail("delete");
  //     setCheckedItems(
  //       Object.fromEntries(tableData.map((_, index) => [index, false]))
  //     );
  //   }
  // };

  // const toggleCheckbox = (index: number) => {
  //   setCheckedItems((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  return (
    <DialogContent className="border-main rounded-lg p-0 overflow-hidden space-y-0">
      <div>
        <div className="bg-main text-white p-4">
          <DialogTitle className="text-lg">Details</DialogTitle>
          {/* <div className="flex justify-end items-center">
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveDetail("add")}
                variant={activeDetail === "add" ? "secondary" : "outline"}
                className="flex gap-1 items-center border-none text-main hover:bg-red-300 hover:text-main"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </Button>
              <Button
                onClick={() => setActiveDetail("edit")}
                variant={activeDetail === "edit" ? "secondary" : "outline"}
                className="flex gap-1 items-center border-none text-main hover:bg-red-300 hover:text-main"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
              <Button
                onClick={handleDeleteClick}
                variant={activeDetail === "delete" ? "destructive" : "outline"}
                className="flex gap-1 items-center border-none text-main hover:bg-red-300 hover:text-main"
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div> */}
        </div>

        <table className="w-full table-auto m-0">
          <tbody>
            {loadingRouteComponentDetails ? (
              Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="border-red-400 border-b">
                  <th className="p-3 text-left bg-red-300 font-normal w-auto">
                    <Skeleton className="w-24 h-5 animate-pulse bg-zinc-200" />
                  </th>
                  <td className="p-3 w-auto min-w-[200px]">
                    <Skeleton className="w-32 h-5 animate-pulse bg-zinc-200" />
                  </td>
                </tr>
              ))
            ) : tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index} className="border-red-400 border-b">
                  <th className="p-3 text-left bg-red-300 font-normal w-auto">
                    {row.header}
                  </th>
                  <td className="p-3 w-auto min-w-[200px]">{row.value}</td>
                  {/* {activeDetail === "delete" ? (
          <td className="p-3 text-center">
            <Checkbox
              checked={checkedItems[index] || false}
              onCheckedChange={() => toggleCheckbox(index)}
            />
          </td>
        ) : (
          <td className="p-3"></td>
        )} */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-3 text-center text-main">
                  No details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DialogContent>
  );
};

export default Details;
