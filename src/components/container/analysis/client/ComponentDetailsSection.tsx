"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import AddDetailsDialog from "../../dialogs/client/AddDeatilsDialog";
import { toast } from "@/hooks/use-toast";
import { useGetRouteComponentDetailsQuery } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

interface SelectedComponent {
  id: string;
}

interface ComponentDetailsProps {
  isLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openAddDetails: boolean;
  setOpenAddDetails: Dispatch<SetStateAction<boolean>>;
}

const ComponentDetailsSection: React.FC<ComponentDetailsProps> = ({
  isLoading,
  selectedComponent,
  openAddDetails,
  setOpenAddDetails,
}) => {
  const shouldRefetch = React.useRef(true);

  React.useEffect(() => {
    shouldRefetch.current = true;
  }, [selectedComponent]);

  const {
    data,
    error,
    isFetching: queryLoading,
  } = useGetRouteComponentDetailsQuery(selectedComponent?.id || "", {
    skip: !selectedComponent,
    refetchOnMountOrArgChange: shouldRefetch.current,
  });

  const showLoading = isLoading || queryLoading;

  const componentDetails = selectedComponent
    ? data?.routeComponentDetails || []
    : [];

  React.useEffect(() => {
    shouldRefetch.current = false;
  }, [data]);

  const handleOpen = () => {
    if (!selectedComponent) {
      toast({
        title: "Select Component First!",
        description: "No component selected.",
      });
      return;
    }
    setOpenAddDetails(true);
  };

  return (
    <div className="border border-main rounded-lg overflow-hidden">
      <div className="bg-main text-white flex justify-between items-center px-4 py-2">
        <h1 className="text-lg font-medium">Details</h1>
        <Dialog open={openAddDetails} onOpenChange={setOpenAddDetails}>
          <Button
            type="button"
            onClick={handleOpen}
            variant={"outline"}
            className="text-main bg-white border-none hover:bg-follow hover:text-white"
          >
            <Plus size={20} className="mr-2" />
            <span>Add Details</span>
          </Button>
          {openAddDetails && (
            <AddDetailsDialog
              selectedComponentId={selectedComponent}
              onClose={() => setOpenAddDetails(false)}
            />
          )}
        </Dialog>
      </div>

      {/* Loading & Error Handling */}
      {showLoading ? (
        <table className="w-full table-auto">
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b border-main">
                <th className="p-2 text-left bg-red-300 font-normal w-1/2">
                  <Skeleton className="w-24 h-5 animate-pulse bg-zinc-200" />
                </th>
                <td className="p-2 w-1/2">
                  <Skeleton className="w-32 h-5 animate-pulse bg-zinc-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p className="p-4 text-red-500">Failed to load details.</p>
      ) : (
        <table className="w-full table-auto">
          <tbody>
            {componentDetails.length > 0 ? (
              componentDetails.map((detail) => (
                <tr key={detail.id} className="border-b border-main">
                  <th className="p-2 text-left bg-red-300 font-normal w-1/2">
                    {detail.header}
                  </th>
                  <td className="p-2 w-1/2">{detail.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComponentDetailsSection;
