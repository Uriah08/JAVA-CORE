"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnalystNoteDialog from "../../dialogs/client/AnalystNoteDialog";
import { toast } from "@/hooks/use-toast";

interface SelectedComponent {
  id: string;
}

interface AnalystNoteProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
  openAnalystNote: boolean;
  setOpenAnalystNote: Dispatch<SetStateAction<boolean>>;
}
const AnalystNoteSection: React.FC<AnalystNoteProps> = ({
  routeComponentsLoading,
  selectedComponent,
  openAnalystNote,
  setOpenAnalystNote,
}) => {
  console.log("selected: ", selectedComponent);

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
        {routeComponentsLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <Input readOnly placeholder="Analys Name" className="mt-2 text-sm" />
        )}
        <div className="flex justify-between items-center mt-5">
          <h1 className="font-semibold">Analyst Previous Note</h1>
          <h1 className="text-xs text-white bg-main px-3 py-1 rounded-md cursor-pointer hover:opacity-80 transition">
            Jan 1, 2025
          </h1>
        </div>

        {routeComponentsLoading ? (
          <Skeleton
            className="w-full h-[25px] animate-pulse bg-zinc-200 rounded-md"
            style={{ animationDelay: `0.2s` }}
          />
        ) : (
          <div className="border rounded-lg p-3 mt-2 max-h-[130px] overflow-auto">
            <p className="text-sm text-zinc-600 indent-10">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores est laboriosam temporibus aliquam tempore itaque nihil
              atque, ducimus quibusdam placeat illum, maiores eveniet pariatur
              quia, ex aut tenetur dignissimos! Sequi? Asperiores est laboriosam
              temporibus aliquam tempore itaque nihil atque, ducimus quibusdam
              placeat illum, maiores eveniet pariatur quia, ex aut tenetur
              dignissimos! Sequi? Asperiores est laboriosam temporibus aliquam
              tempore itaque nihil atque, ducimus quibusdam placeat illum,
              maiores eveniet pariatur quia, ex aut tenetur dignissimos! Sequi?
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
