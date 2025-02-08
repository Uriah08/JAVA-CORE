"use client";

import React, { useState } from "react";

type Component = {
  name: string;
  id: string;
  isDelete: boolean;
  equipmentNameId: string | null;
};

type NestedData = {
  id: string;
  name: string;
  equipmentGroups?: NestedData[];
  equipmentNames?: NestedData[];
  components?: Component[];
};

type NestedListProps = {
  data: NestedData;
  level?: number;
};

const NestedList = ({ data, level = 0 }: NestedListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`pl-${level * 4}`}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
        onClick={toggleOpen}
        draggable
      >
        <span className="mr-2">{isOpen ? "-" : "+"}</span>
        <span>{data.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {data.equipmentGroups &&
            data.equipmentGroups.map((group) => (
              <NestedList key={group.id} data={group} level={level + 1} />
            ))}
          {data.equipmentNames &&
            data.equipmentNames.map((equipment) => (
              <NestedList
                key={equipment.id}
                data={equipment}
                level={level + 1}
              />
            ))}
          {data.components &&
            data.components.map((component) => (
              <div key={component.id} className="ml-4" draggable>
                {component.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NestedList;
