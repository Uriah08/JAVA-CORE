"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";

interface Component {
  id: string;
  name: string;
}

interface Equipment {
  id: string;
  name: string;
  components?: Component[];
}

interface EquipmentSelectorProps {
  field: ControllerRenderProps<
    {
      clientId: string;
      routeName: string;
      areaId: string;
      equipmentNames: [
        { id: string; components?: string[] },
        ...{ id: string; components?: string[] }[]
      ];
    },
    "equipmentNames"
  >;
  selectedEquipment: Equipment[];
  setSelectedEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  field,
  selectedEquipment,
  setSelectedEquipment,
}) => {
  const handleRemoveEquipment = (id: string) => {
    setSelectedEquipment((prev) => prev.filter((e) => e.id !== id));
  };

  useEffect(() => {
    const equipmentNames =
      selectedEquipment.length > 0
        ? (selectedEquipment.map((equipment) => ({
            id: equipment.id,
            components: equipment.components?.map((comp) => comp.id) || [],
          })) as [
            { id: string; components?: string[] },
            ...{ id: string; components?: string[] }[]
          ])
        : [];

    if (JSON.stringify(field.value) !== JSON.stringify(equipmentNames)) {
      field.onChange(equipmentNames);
    }
  }, [selectedEquipment, field]);

  return (
    <div className="ml-10">
      {selectedEquipment.length > 0 ? (
        <>
          <div className="font-semibold text-lg py-5">Selected Equipment:</div>
          {selectedEquipment.map((equipment) => (
            <div
              key={equipment.id}
              className="border border-gray-300 rounded-md p-2 mb-2"
            >
              <div className="flex justify-between items-center border-b border-gray-400">
                <span className="font-semibold text-gray-600">
                  {equipment.name}
                </span>
                <Button
                  type="button"
                  onClick={() => handleRemoveEquipment(equipment.id)}
                  className="ml-2 text-red-500 bg-transparent border-none shadow-none hover:bg-transparent hover:underline"
                >
                  Remove
                </Button>
              </div>
              {equipment.components && equipment.components.length > 0 && (
                <ul className="ml-16 mt-1">
                  {equipment.components.map((comp) => (
                    <li key={comp.id} className="text-gray-500">
                      {comp.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center h-72 text-gray-500 text-xl">
          Select Equipment
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;
