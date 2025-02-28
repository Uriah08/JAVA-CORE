// import { Plus, Edit, Trash } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Details from "../dialogs/Details";
import { toast } from "@/hooks/use-toast";

interface SelectedComponent {
  id: string;
  name: string;
  routeComponentID: string;
  action?: string | null;
  note?: string | null;
}

interface EquipmentDetailsSectionProps {
  selectedComponent: SelectedComponent | null;
}

const EquipmentDetailsSection: React.FC<EquipmentDetailsSectionProps> = ({
  selectedComponent,
}) => {
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleOpen = () => {
    if (!selectedComponent) {
      toast({
        title: "Select Component First!",
        description: "No component selected.",
      });
      return;
    }
    setOpenDetails(true);
  };
  return (
    <div className="flex flex-col gap-3 w-full md:w-1/2">
      <h1 className="text-sm font-medium">Equipment Mechanical Details</h1>
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <Button
          onClick={handleOpen}
          type="button"
          className="w-auto font-normal text-sm cursor-text bg-main text-white hover:bg-follow hover:text-white"
          variant={"outline"}
        >
          View Mechanical Details
        </Button>
        {openDetails && <Details selectedComponent={selectedComponent} />}
      </Dialog>
    </div>
  );
};

export default EquipmentDetailsSection;
