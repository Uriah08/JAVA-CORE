"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DndContext, useDraggable, closestCenter } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Item {
  id: string | number;
  name: string;
}

interface ItemListProps {
  items: Item[];
  loading: boolean;
  onItemClick: (item: Item) => void;
  selectedItems: (string | number)[];
  isDraggable: boolean;
}

const DraggableItem: React.FC<{ item: Item }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 border-t hover:bg-slate-100 cursor-grab justify-between flex items-center"
    >
      {item.name}
    </li>
  );
};

const ItemList: React.FC<ItemListProps> = ({
  items,
  loading,
  onItemClick,
  selectedItems,
  isDraggable,
}) => {
  return (
    <DndContext collisionDetection={closestCenter}>
      <ul className="w-full">
        {loading ? (
          <div className="w-full h-full overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[53px] border-t animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center my-20">
            <p className="text-gray-300 text-3xl font-bold">
              No items available.
            </p>
          </div>
        ) : (
          items.map((item) =>
            isDraggable ? (
              <DraggableItem key={item.id} item={item} />
            ) : (
              <li
                key={item.id}
                className={`p-2 border-t hover:bg-slate-100 cursor-pointer justify-between flex items-center ${
                  selectedItems.includes(item.id) ? "bg-slate-100" : ""
                }`}
                onClick={() => onItemClick(item)}
              >
                {item.name}
              </li>
            )
          )
        )}
      </ul>
    </DndContext>
  );
};

export default ItemList;
