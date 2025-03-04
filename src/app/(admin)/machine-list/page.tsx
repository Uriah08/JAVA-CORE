import List from "@/components/container/list/machine-list/List";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full p-3 sm:p-5 flex xl:flex-row flex-col gap-3 sm:gap-5">
      <div className="w-full xl:w-2/3 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold">Machine list</h1>
        <List />
      </div>
      <div className="w-full xl:w-1/3 xl:sticky xl:top-5 h-full flex flex-col gap-5">
        <div className="bg-white h-2/3 w-full rounded-xl shadow-lg p-5">
          <h1 className="text-lg sm:text-2xl font-bold">Record Count</h1>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Area</h1>
              <h1 className="text-4xl font-bold text-white">7</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Equipment Group</h1>
              <h1 className="text-4xl font-bold text-white">7</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Equipment Name</h1>
              <h1 className="text-4xl font-bold text-white">7</h1>
            </div>
            <div className="flex flex-col gap-3 bg-main p-3 rounded-lg">
              <h1 className="text-lg font-semibold text-white">Components</h1>
              <h1 className="text-4xl font-bold text-white">7</h1>
            </div>
          </div>
        </div>
        <div className="bg-white h-2/3 w-full rounded-xl shadow-lg p-5">
          <h1 className="text-lg sm:text-2xl font-bold">Recent Routes</h1>
          
        </div>
      </div>
    </div>
  );
};

export default page;
