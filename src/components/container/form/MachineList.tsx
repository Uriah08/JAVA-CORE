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

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  title: string;
};

const MachineList: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
}) => {
  const [itemName, setItemName] = useState("");

  const handleSubmit = () => {
    onSubmit(itemName);
    setItemName("");
    onClose();
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
