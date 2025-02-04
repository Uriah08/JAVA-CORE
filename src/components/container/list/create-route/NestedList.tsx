"use client";

import React, { useState } from "react";

type NestedData = {
  id: number;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: string[];
};

const NestedList = ({
  data,
  level = 0,
  onDragStart,
}: {
  data: NestedData;
  level?: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, data: NestedData) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`pl-${level * 4}`}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
        onClick={toggleOpen}
        draggable
        onDragStart={(e) => onDragStart(e, data)}
      >
        <span className="mr-2">{isOpen ? "-" : "+"}</span>
        <span>{data.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {data.equipmentGroups &&
            data.equipmentGroups.map((group) => (
              <NestedList
                key={group.id}
                data={group}
                level={level + 1}
                onDragStart={onDragStart}
              />
            ))}
          {data.equipmentNames &&
            data.equipmentNames.map((equipment) => (
              <NestedList
                key={equipment.id}
                data={equipment}
                level={level + 1}
                onDragStart={onDragStart}
              />
            ))}
          {data.components &&
            data.components.map((component, index) => (
              <div
                key={index}
                className="ml-4"
                draggable
                onDragStart={(e) =>
                  onDragStart(e, { id: index, name: component })
                }
              >
                {component}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NestedList;
