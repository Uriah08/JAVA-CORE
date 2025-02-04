"use client";

import React from "react";

type NestedData = {
  id: number;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: string[];
};

type DroppedListProps = {
  droppedItems: NestedData[];
  onRemoveItem: (id: number) => void;
};

const DroppedList = ({ droppedItems, onRemoveItem }: DroppedListProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Dropped Items</h2>
      <div className="space-y-2">
        {droppedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 border border-gray-300 rounded"
          >
            <span>{item.name}</span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroppedList;
