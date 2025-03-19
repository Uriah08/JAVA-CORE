"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ClientActionDialog from "../../dialogs/client/ClientActionDialog";
import { toast } from "@/hooks/use-toast";
import { useGetRouteComponentActionQuery } from "@/store/api";

interface SelectedComponent {
  id: string;
}

interface ClientActionProps {
  // isLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openClientAction: boolean;
  setOpenClientAction: Dispatch<SetStateAction<boolean>>;
}

const ClientActionSection: React.FC<ClientActionProps> = ({
  // isLoading,
  selectedComponent,
  openClientAction,
  setOpenClientAction,
}) => {
  const shouldRefetch = React.useRef(true);

  React.useEffect(() => {
    shouldRefetch.current = true;
  }, [selectedComponent]);

  const {
    data,
    isFetching: queryLoading,
    refetch,
  } = useGetRouteComponentActionQuery(selectedComponent?.id ?? "", {
    skip: !selectedComponent,
  });

  React.useEffect(() => {
    if (selectedComponent && shouldRefetch.current) {
      refetch().then(() => {
        shouldRefetch.current = false;
      });
    }
  }, [selectedComponent, refetch]);

  const actionData = selectedComponent ? data?.routeComponentAction || [] : [];
  const woNumber = selectedComponent ? data?.woNumbers || [] : [];

  const latestAction = actionData.length > 0 ? actionData[0] : null;
  const latestDate = latestAction
    ? new Date(latestAction.createdAt).toLocaleDateString()
    : "No date available";

  const handleOpen = () => {
    if (!selectedComponent) {
      toast({
        title: "Select Component First!",
        description: "No component selected.",
      });
      return;
    }
    setOpenClientAction(true);
  };

  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Client&apos;s Action and WO Number
      </h1>
      <div className=" p-3 flex flex-col h-full">
        <h1 className="font-semibold">WO Number</h1>
        {queryLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder={"WoNumber"}
            className="mt-2 text-sm"
            value={latestAction?.woNumber || "WO Number"}
          />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">Previous Action</h1>
          {queryLoading ? (
            <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
              ...
            </h1>
          ) : (
            <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
              {latestDate || "No Selected Component"}
            </h1>
          )}
        </div>
        {queryLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-5">
              {latestAction?.action || "No action yet"}
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-3 items-center">
          <Dialog open={openClientAction} onOpenChange={setOpenClientAction}>
            <Button
              onClick={handleOpen}
              type="button"
              className="w-full font-normal text-sm justify-start cursor-text"
              variant={"outline"}
            >
              Write an Action...
            </Button>
            {openClientAction && (
              <ClientActionDialog
                selectedComponentId={selectedComponent}
                jobs={woNumber}
                onClose={() => setOpenClientAction(false)}
              />
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ClientActionSection;
