"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useUpdateMachineListMutation,
  useUpdateEquipmentGroupMutation,
  useUpdateEquipmentNameMutation,
  useUpdateComponentMutation,
} from "@/store/api";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  id: string;
};

const UpdatingDialog: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  title,
  id,
}) => {
  const [itemName, setItemName] = useState("");

  const [updateArea] = useUpdateMachineListMutation();
  const [updateGroupName] = useUpdateEquipmentGroupMutation();
  const [updateEquipmentName] = useUpdateEquipmentNameMutation();
  const [updateComponent] = useUpdateComponentMutation();

  const handleSubmit = async () => {
    try {
      if (title === "Update Area Name") {
        await updateArea({ name: itemName, id }).unwrap();
      } else if (title === "Update Group Name") {
        await updateGroupName({ name: itemName, id }).unwrap();
      } else if (title === "Update Equipment Name") {
        await updateEquipmentName({ name: itemName, id }).unwrap();
      } else if (title === "Update Component Name") {
        await updateComponent({ name: itemName, id }).unwrap();
      }

      console.log(handleSubmit);
      setItemName("");
      onClose();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter new name"
        />
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-main">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatingDialog;
