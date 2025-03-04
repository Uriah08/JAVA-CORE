import CreateRoute from "@/components/container/form/CreateRoute";
import React from "react";

const page = () => {
  return (
    <div className="w-full p-3 sm:p-5 flex">
      <div className="w-full h-full p-5 bg-white rounded-xl ">
        <h1 className="text-xl sm:text-2xl font-bold">Create route</h1>
        <CreateRoute />
      </div>
    </div>
  );
};

export default page;
