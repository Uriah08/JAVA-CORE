"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnalystNoteDialog from "../../dialogs/client/AnalystNoteDialog";
import { toast } from "@/hooks/use-toast";
import { useGetRouteComponentAnalystNoteQuery } from "@/store/api";

interface SelectedComponent {
  id: string;
}

interface AnalystNoteProps {
  // isLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openAnalystNote: boolean;
  setOpenAnalystNote: Dispatch<SetStateAction<boolean>>;
}
const AnalystNoteSection: React.FC<AnalystNoteProps> = ({
  // isLoading,
  selectedComponent,
  openAnalystNote,
  setOpenAnalystNote,
}) => {
  const shouldRefetch = React.useRef(true);

  React.useEffect(() => {
    shouldRefetch.current = true;
  }, [selectedComponent]);

  const {
    data,
    isFetching: queryLoading,
    refetch,
  } = useGetRouteComponentAnalystNoteQuery(selectedComponent?.id ?? "", {
    skip: !selectedComponent,
  });

  React.useEffect(() => {
    if (selectedComponent && shouldRefetch.current) {
      refetch().then(() => {
        shouldRefetch.current = false;
      });
    }
  }, [selectedComponent, refetch]);

  const analystNotes = selectedComponent ? data?.routeComponentNote || [] : [];

  const latestNote = analystNotes.length > 0 ? analystNotes[0] : null;
  // const analyst = data?.analyst || [];
  const latestDate = latestNote
    ? new Date(latestNote.createdAt).toLocaleDateString()
    : "No date available";

  const handleOpen = () => {
    if (!selectedComponent) {
      toast({
        title: "Select Component First!",
        description: "No component selected.",
      });
      return;
    }
    setOpenAnalystNote(true);
  };
  return (
    <div className="flex flex-col gap-3 mt-3 border border-main rounded-lg overflow-hidden">
      <h1 className="text-lg font-semibold bg-main text-white px-4 py-2">
        Analyst Note
      </h1>
      <div className="p-3 flex flex-col h-full">
        <h1 className="font-semibold">Analyst Name</h1>
        {queryLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input
            readOnly
            placeholder="Analyst Name"
            className="mt-2 text-sm"
            value={latestNote?.analyst || "No available analyst"}
          />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">Analyst Previous Note</h1>
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
            <p className="text-sm text-zinc-600 indent-10">
              {latestNote?.note || "No Note yet"}
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-3 items-center">
          <Dialog open={openAnalystNote} onOpenChange={setOpenAnalystNote}>
            <Button
              onClick={handleOpen}
              type="button"
              className="w-full font-normal text-sm justify-start cursor-text"
              variant={"outline"}
            >
              Write a Note...
            </Button>
            {openAnalystNote && (
              <AnalystNoteDialog
                selectedComponentId={selectedComponent}
                onClose={() => setOpenAnalystNote(false)}
              />
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AnalystNoteSection;
