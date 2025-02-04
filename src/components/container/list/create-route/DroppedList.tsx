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
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    parentId?: number,
    type?: "equipmentGroup" | "equipmentName" | "component"
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveItem: (
    itemId: number,
    parentId?: number,
    type?: "component" | "equipmentGroup" | "equipmentName"
  ) => void;
}

const DroppedList: React.FC<DroppedListProps> = ({
  droppedItems,
  onDrop,
  onDragOver,
  onRemoveItem,
}) => {
  const renderDroppedItems = (
    items: NestedData[],
    level = 0,
    parentId?: number
  ) => {
    return items.map((item) => (
      <div
        key={item.id}
        className="mb-2"
        onDrop={(e) => {
          if (item.equipmentGroups) {
            onDrop(e, item.id, "equipmentGroup");
          } else if (item.equipmentNames) {
            onDrop(e, item.id, "equipmentName");
          } else {
            onDrop(e, item.id, "component");
          }
        }}
        onDragOver={onDragOver}
      >
        <div className="flex items-center gap-2 border border-gray-200 p-2">
          <span className="font-semibold">{item.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveItem(item.id, parentId)}
          >
            Remove
          </Button>
        </div>
        <div style={{ marginLeft: `${(level + 1) * 20}px` }}>
          {item.equipmentGroups &&
            renderDroppedItems(item.equipmentGroups, level + 1, item.id)}
          {item.equipmentNames &&
            renderDroppedItems(item.equipmentNames, level + 1, item.id)}
          {item.components &&
            item.components.map((component, idx) => (
              <div
                key={idx}
                className=" flex items-center p-2 border border-gray-200"
              >
                <span>{component}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveItem(idx, item.id, "component")}
                >
                  Remove
                </Button>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div onDrop={(e) => onDrop(e)} onDragOver={onDragOver}>
      <div className="mt-5 border border-gray-300 rounded-lg p-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          {renderDroppedItems(droppedItems)}
        </div>
      </div>
    </div>
  );
};

export default DroppedList;
