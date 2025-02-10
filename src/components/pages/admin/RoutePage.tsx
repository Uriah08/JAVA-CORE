"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateRoute from "@/components/container/form/CreateRoute";

const Routepage = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <CreateRoute />
      </DndProvider>
    </div>
  );
};

export default Routepage;
