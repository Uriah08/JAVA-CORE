import React from "react";
import { Button } from "@/components/ui/button";

type NestedData = {
  id: number;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: string[];
};

interface DroppedListProps {
  droppedItems: NestedData[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveItem: (itemId: number) => void;
}

const DroppedList: React.FC<DroppedListProps> = ({
  droppedItems,
  onDrop,
  onDragOver,
  onRemoveItem,
}) => {
  const renderDroppedItems = (items: NestedData[], level = 0) => {
    return items.map((item, index) => (
      <div
        key={item.id}
        style={{ marginLeft: `${level * 20}px` }}
        className="mb-2"
      >
        <div className="flex items-center gap-2">
          <span>{item.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveItem(item.id)}
          >
            Remove
          </Button>
        </div>
        {item.equipmentGroups &&
          renderDroppedItems(item.equipmentGroups, level + 1)}
        {item.equipmentNames &&
          renderDroppedItems(item.equipmentNames, level + 1)}
        {item.components &&
          item.components.map((component, idx) => (
            <div
              key={idx}
              style={{ marginLeft: `${(level + 1) * 20}px` }}
              className="mb-1"
            >
              {component}
            </div>
          ))}
      </div>
    ));
  };

  return (
    <div onDrop={onDrop} onDragOver={onDragOver}>
      <div className="mt-5 border border-gray-300 rounded-lg p-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          {renderDroppedItems(droppedItems)}
        </div>
      </div>
    </div>
  );
};

export default DroppedList;
