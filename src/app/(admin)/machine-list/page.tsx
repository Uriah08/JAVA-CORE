import { BarCharts } from "@/components/container/charts/machineListCharts/bar-charts";
import List from "@/components/container/list/machine-list/List";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen p-5 flex md:flex-row flex-col pr-8 gap-5">
      <div className="w-2/3 min-h-[90vh] p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">Machine list</h1>
        <List />
      </div>
      <div className="w-full md:w-1/3 md:sticky md:top-5 h-full flex flex-col gap-5">
        <div className="bg-white h-2/3 w-full rounded-xl shadow-lg">
          <h1 className="text-main text-lg font-bold p-5">Record Count</h1>
          <BarCharts />
        </div>
        <div className="bg-main h-1/3 w-full rounded-xl shadow-lg">
          <h1 className="text-white text-lg font-bold p-5">Route</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
