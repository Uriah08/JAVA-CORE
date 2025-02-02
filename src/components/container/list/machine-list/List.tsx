"use client";

import React, { useState } from "react";

type Component = string;

type EquipmentName = {
  id: number;
  name: string;
  components: Component[];
};

type EquipmentGroup = {
  id: number;
  name: string;
  equipmentNames: EquipmentName[];
};

type Area = {
  id: number;
  name: string;
  equipmentGroups: EquipmentGroup[];
};

const areas: Area[] = [
  {
    id: 1,
    name: "Area 1",
    equipmentGroups: [
      {
        id: 2,
        name: "Equipment Group 1",
        equipmentNames: [
          {
            id: 3,
            name: "Equipment Name 1",
            components: ["Component 1", "Component 2", "Component 3"],
          },
          {
            id: 4,
            name: "Equipment Name 2",
            components: ["Component 1", "Component 2", "Component 3"],
          },
          {
            id: 5,
            name: "Equipment Name 3",
            components: ["Component 1", "Component 2", "Component 3"],
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Area 2",
    equipmentGroups: [
      {
        id: 15,
        name: "Equipment Group 1",
        equipmentNames: [
          {
            id: 16,
            name: "Equipment Name 1",
            components: ["Component 1", "Component 2", "Component 3"],
          },
          {
            id: 17,
            name: "Equipment Name 2",
            components: ["Component 1", "Component 2", "Component 3"],
          },
          {
            id: 18,
            name: "Equipment Name 3",
            components: ["Component 1", "Component 2", "Component 3"],
          },
        ],
      },
    ],
  },
];

const List = () => {
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [currentEquipmentGroup, setCurrentEquipmentGroup] =
    useState<EquipmentGroup | null>(null);
  const [currentEquipmentName, setCurrentEquipmentName] =
    useState<EquipmentName | null>(null);

  // Handle clicking on an area
  const handleAreaClick = (area: Area) => {
    setCurrentArea(area);
    setCurrentEquipmentGroup(null);
    setCurrentEquipmentName(null);
  };

  // Handle clicking on an equipment group
  const handleEquipmentGroupClick = (equipmentGroup: EquipmentGroup) => {
    setCurrentEquipmentGroup(equipmentGroup);
    setCurrentEquipmentName(null);
  };

  // Handle clicking on an equipment name
  const handleEquipmentNameClick = (equipmentName: EquipmentName) => {
    setCurrentEquipmentName(equipmentName);
  };

  // Handle clicking on the breadcrumb
  const handleBreadcrumbClick = (
    level: "area" | "equipmentGroup" | "equipmentName"
  ) => {
    if (level === "area") {
      setCurrentArea(null);
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
    } else if (level === "equipmentGroup") {
      setCurrentEquipmentGroup(null);
      setCurrentEquipmentName(null);
    } else if (level === "equipmentName") {
      setCurrentEquipmentName(null);
    }
  };

  // breadcrumb
  const breadcrumb = [];
  if (currentArea) {
    breadcrumb.push(
      <span
        key="area"
        className="cursor-pointer text-gray-600 hover:underline text-sm"
        onClick={() => handleBreadcrumbClick("area")}
      >
        {currentArea.name}
      </span>
    );
  }
  if (currentEquipmentGroup) {
    breadcrumb.push(
      <span
        key="equipmentGroup"
        className="cursor-pointer text-gray-600 hover:underline text-sm"
        onClick={() => handleBreadcrumbClick("equipmentGroup")}
      >
        {` > ${currentEquipmentGroup.name}`}
      </span>
    );
  }
  if (currentEquipmentName) {
    breadcrumb.push(
      <span
        key="equipmentName"
        className="cursor-pointer text-gray-600 hover:underline text-sm"
        onClick={() => handleBreadcrumbClick("equipmentName")}
      >
        {` > ${currentEquipmentName.name}`}
      </span>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-4 text-sm   font-semibold">
        {breadcrumb.length > 0 ? breadcrumb : "Select an area"}
      </div>

      <div className="space-y-2">
        {!currentArea && (
          <ul className="space-y-2">
            {areas.map((area) => (
              <li
                key={area.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleAreaClick(area)}
              >
                {area.name}
              </li>
            ))}
          </ul>
        )}

        {currentArea && !currentEquipmentGroup && (
          <ul className="space-y-2">
            {currentArea.equipmentGroups.map((equipmentGroup) => (
              <li
                key={equipmentGroup.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleEquipmentGroupClick(equipmentGroup)}
              >
                {equipmentGroup.name}
              </li>
            ))}
          </ul>
        )}

        {currentEquipmentGroup && !currentEquipmentName && (
          <ul className="space-y-2">
            {currentEquipmentGroup.equipmentNames.map((equipmentName) => (
              <li
                key={equipmentName.id}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => handleEquipmentNameClick(equipmentName)}
              >
                {equipmentName.name}
              </li>
            ))}
          </ul>
        )}

        {currentEquipmentName && (
          <ul className="space-y-2">
            {currentEquipmentName.components.map((component, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg">
                {component}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;
