"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteListProps {
  items: { id: string; name: string }[];
  onDelete: (selectedIds: string[]) => void;
}

const DeleteList: React.FC<DeleteListProps> = ({ items, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleDeleteMode = () => {
    setIsDeleting((prev) => !prev);
    setSelectedItems([]);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const handleConfirmDelete = () => {
    onDelete(selectedItems);
    setIsDeleting(false);
    setSelectedItems([]);
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleToggleDeleteMode} className="bg-red-600">
          {isDeleting ? (
            <>
              Cancel <X className="ml-2" />
            </>
          ) : (
            <>
              Delete <Trash className="ml-2" />
            </>
          )}
        </Button>
      </div>

      {isDeleting && (
        <div className="mt-4">
          <Checkbox
            checked={selectedItems.length === items.length}
            onCheckedChange={handleSelectAll}
            className="mb-2"
          >
            Select All
          </Checkbox>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
              >
                <span>{item.name}</span>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                />
              </li>
            ))}
          </ul>

          {selectedItems.length > 0 && (
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-red-600"
            >
              Delete Selected
            </Button>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedItems.length} items?</p>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-main hover:bg-follow"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteList;
