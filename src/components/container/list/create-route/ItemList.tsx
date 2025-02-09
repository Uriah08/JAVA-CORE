import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Item {
  id: string | number;
  name: string;
}

interface ItemListProps {
  items: Item[];
  loading: boolean;
  onItemClick: (item: Item) => void;
  selectedItems: (string | number)[];
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  loading,
  onItemClick,
  selectedItems,
}) => {
  return (
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
        items.map((item, index) => (
          <li
            key={item.id}
            className={`p-2 border-t hover:bg-slate-100 cursor-pointer justify-between flex items-center ${
              index === items.length - 1 ? "border-b" : ""
            } ${selectedItems.includes(item.id) ? "bg-slate-100" : ""}`}
            onClick={() => onItemClick(item)}
          >
            {item.name}
          </li>
        ))
      )}
    </ul>
  );
};

export default ItemList;
