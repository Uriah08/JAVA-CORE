"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import AddDetailsDialog from "../../dialogs/client/AddDeatilsDialog";
import { toast } from "@/hooks/use-toast";
import { useGetRouteComponentDetailsQuery } from "@/store/api";

interface SelectedComponent {
  id: string;
}

interface ComponentDetailsProps {
  //   routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openAddDetails: boolean;
  setOpenAddDetails: Dispatch<SetStateAction<boolean>>;
}

const ComponentDetailsSection: React.FC<ComponentDetailsProps> = ({
  //   routeComponentsLoading,
  selectedComponent,
  openAddDetails,
  setOpenAddDetails,
}) => {
  const shouldRefetch = React.useRef(true);

  React.useEffect(() => {
    shouldRefetch.current = true;
  }, [selectedComponent]);

  const { data, error, isLoading } = useGetRouteComponentDetailsQuery(
    selectedComponent?.id || "",
    {
      skip: !selectedComponent,
      refetchOnMountOrArgChange: shouldRefetch.current,
    }
  );

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
      {isLoading ? (
        <p className="p-4">Loading...</p>
      ) : error ? (
        <p className="p-4 text-red-500">Failed to load details.</p>
      ) : (
        <table className="w-full table-auto">
          <tbody>
            {(data?.routeComponentDetails ?? []).length > 0 ? (
              data?.routeComponentDetails!.map((detail) => (
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
