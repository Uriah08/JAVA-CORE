// Machinelist.tsx dialog
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
  useCreateMachineListMutation,
  useCreateEquipmentGroupMutation,
  useCreateEquipmentNameMutation,
  useCreateComponentMutation,
} from "@/store/api";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  areaId?: string; // Optional for equipment groups
  groupId?: string; // Optional for equipment names
  equipmentNameId?: string; // Optional for components
};

const MachineList: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  title,
  areaId,
  groupId,
  equipmentNameId,
}) => {
  const [itemName, setItemName] = useState("");

  // Hooks for mutations
  const [createArea] = useCreateMachineListMutation();
  const [createEquipmentGroup] = useCreateEquipmentGroupMutation();
  const [createEquipmentName] = useCreateEquipmentNameMutation();
  const [createComponent] = useCreateComponentMutation();

  const handleSubmit = async () => {
    try {
      if (title === "Add New Area") {
        await createArea({ name: itemName }).unwrap();
      } else if (title === "Add New Group") {
        await createEquipmentGroup({ name: itemName, areaId }).unwrap();
      } else if (title === "Add New Name") {
        await createEquipmentName({ name: itemName, groupId }).unwrap();
      } else if (title === "Add New Component") {
        await createComponent({ name: itemName, equipmentNameId }).unwrap();
      }
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
          placeholder="Enter name"
        />
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-main">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MachineList;
